import { useRef, useEffect } from 'react';

export default function Marquee({ children, speed = 32 }) {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;
    // Duplicate content for seamless loop
    const track = trackRef.current;
    if (!track.dataset.cloned) {
      const clone = track.innerHTML;
      track.insertAdjacentHTML('beforeend', clone);
      track.dataset.cloned = '1';
    }
  }, []);

  return (
    <div className="marquee">
      <div
        ref={trackRef}
        className="marquee-track"
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
}
