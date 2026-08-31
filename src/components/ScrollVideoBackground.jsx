import { useRef, useEffect } from 'react';
import { useScroll } from 'framer-motion';

export default function ScrollVideoBackground({ videoSrc }) {
  const videoRef = useRef(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pause the video initially so we can scrub it manually
    const handleLoadedMetadata = () => {
      video.pause();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    
    // Pixel-by-pixel scrubbing based on scroll
    const unsubscribe = scrollYProgress.on('change', (progress) => {
      if (video && video.duration && !isNaN(video.duration)) {
        requestAnimationFrame(() => {
          const targetTime = video.duration * progress;
          if (Math.abs(video.currentTime - targetTime) > 0.05) {
             video.currentTime = targetTime;
          }
        });
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -10,
      overflow: 'hidden',
      pointerEvents: 'none',
      backgroundColor: '#fbfbfd'
    }}>
      {/* ── White minimalistic glass overlay ── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(251, 251, 253, 0.82)',
        backdropFilter: 'blur(3px)',
        zIndex: 1
      }}></div>

      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      />
    </div>
  );
}
