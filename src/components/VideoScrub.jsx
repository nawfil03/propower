import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import useReducedMotion from '../hooks/useReducedMotion';

// Scrubs a video's playback position to scroll progress within its own section
// (scoped — not a full-page fixed background). Falls back to a static poster frame
// under prefers-reduced-motion.
export default function VideoScrub({ src, eyebrow, title, body }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    if (reduced) return;
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => video.pause();
    video.addEventListener('loadedmetadata', onLoaded);

    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (video.duration && !Number.isNaN(video.duration)) {
        const targetTime = video.duration * progress;
        if (Math.abs(video.currentTime - targetTime) > 0.05) {
          video.currentTime = targetTime;
        }
      }
    });

    return () => {
      video.removeEventListener('loadedmetadata', onLoaded);
      unsubscribe();
    };
  }, [reduced, scrollYProgress]);

  return (
    <section ref={containerRef} className="video-scrub-section" style={reduced ? { height: '80vh' } : undefined}>
      <div className="video-scrub-sticky" style={reduced ? { position: 'relative' } : undefined}>
        <video ref={videoRef} src={src} muted playsInline preload="auto" autoPlay={reduced} loop={reduced} />
        <div className="video-scrub-overlay" />
        <div className="video-scrub-content">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      </div>
    </section>
  );
}
