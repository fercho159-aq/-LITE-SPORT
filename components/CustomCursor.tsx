'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide on touch devices
    if ('ontouchstart' in window) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, ease: 'power2.out' });
    };

    const onEnter = () => {
      gsap.to(ring, { scale: 2, borderColor: 'rgba(212,175,55,0.6)', duration: 0.3 });
      gsap.to(dot, { scale: 0.5, backgroundColor: '#D4AF37', duration: 0.3 });
    };

    const onLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: 'rgba(212,175,55,0.3)', duration: 0.3 });
      gsap.to(dot, { scale: 1, backgroundColor: '#F5F5F5', duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove);

    const clickables = document.querySelectorAll('a, button, [data-cursor-hover]');
    clickables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // Re-observe for dynamic elements
    const observer = new MutationObserver(() => {
      const newClickables = document.querySelectorAll('a, button, [data-cursor-hover]');
      newClickables.forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      clickables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-foreground rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-gold/30 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
    </>
  );
}
