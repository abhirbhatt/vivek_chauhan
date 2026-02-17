import { useRef, useEffect, useState, VideoHTMLAttributes, forwardRef, useImperativeHandle } from 'react';

interface SmartVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
    mobileSrc?: string;
    // If true, the component will try to play the video when it enters the viewport
    playOnIntersect?: boolean;
}

const SmartVideo = forwardRef<HTMLVideoElement, SmartVideoProps>(({
    src,
    mobileSrc,
    className,
    playOnIntersect = false,
    ...props
}, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentSrc, setCurrentSrc] = useState(src);
    const [isAttemptingPlay, setIsAttemptingPlay] = useState(false);

    // Expose the video element to the parent ref
    useImperativeHandle(ref, () => videoRef.current!);

    // Handle source switching based on screen size
    useEffect(() => {
        const handleSource = () => {
            if (mobileSrc && window.innerWidth < 768) {
                if (currentSrc !== mobileSrc) setCurrentSrc(mobileSrc);
            } else {
                if (currentSrc !== src) setCurrentSrc(src);
            }
        };

        handleSource();
        window.addEventListener('resize', handleSource);
        return () => window.removeEventListener('resize', handleSource);
    }, [src, mobileSrc, currentSrc]);

    // Smart Autoplay Logic
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const attemptPlay = async () => {
            if (isAttemptingPlay) return;
            setIsAttemptingPlay(true);

            try {
                // Ensure properties needed for mobile autoplay are set
                video.muted = true;
                // Also set explicit attributes for some mobile browsers
                video.setAttribute('muted', '');
                video.setAttribute('playsinline', '');

                const playPromise = video.play();
                if (playPromise !== undefined) {
                    await playPromise;
                }
            } catch (error) {
                console.warn("Autoplay blocked or failed:", error);

                const playOnInteraction = () => {
                    video.play().catch(() => { });
                    document.removeEventListener('touchstart', playOnInteraction);
                    document.removeEventListener('click', playOnInteraction);
                };

                document.addEventListener('touchstart', playOnInteraction, { once: true });
                document.addEventListener('click', playOnInteraction, { once: true });
            } finally {
                setIsAttemptingPlay(false);
            }
        };

        // Use IntersectionObserver if playOnIntersect is enabled
        let observer: IntersectionObserver | null = null;
        if (playOnIntersect) {
            observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    attemptPlay();
                } else {
                    video.pause();
                }
            }, { threshold: 0.1 });
            observer.observe(video);
        } else if (props.autoPlay !== false) {
            attemptPlay();
        }

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [currentSrc, playOnIntersect, props.autoPlay]);

    return (
        <video
            ref={videoRef}
            src={currentSrc}
            className={className}
            muted
            playsInline
            {...props}
        />
    );
});

SmartVideo.displayName = 'SmartVideo';

export default SmartVideo;
