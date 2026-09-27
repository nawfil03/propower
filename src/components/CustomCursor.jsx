import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const active = useRef(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('has-custom-cursor');

    const onMouseMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (!active.current) {
        active.current = true;
        document.documentElement.classList.add('cursor-active');
      }
    };

    const onMouseLeave = () => {
      active.current = false;
      document.documentElement.classList.remove('cursor-active');
    };

    // Fast event delegation for hover targets without MutationObserver DOM thrashing
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, .card, .pill, .badge, .chip, .sub-item, .has-custom-cursor');
      if (target) {
        document.documentElement.classList.add('cursor-hover');
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, .card, .pill, .badge, .chip, .sub-item, .has-custom-cursor');
      if (target) {
        document.documentElement.classList.remove('cursor-hover');
      }
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      document.documentElement.classList.remove('has-custom-cursor', 'cursor-active', 'cursor-hover');
    };
  }, []);

  return (
    <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
  );
}
