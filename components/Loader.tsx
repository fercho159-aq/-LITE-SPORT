'use client';

import { useEffect, useRef } from 'react';
import { useLoaderStore } from '@/lib/store';
import gsap from 'gsap';

export default function Loader() {
  const { isLoading, setProgress, setLoading } = useLoaderStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) return;

    const tl = gsap.timeline();
    const obj = { val: 0 };

    tl.to(obj, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(obj.val);
        setProgress(v);
        if (counterRef.current) counterRef.current.textContent = `${v}%`;
        if (progressBarRef.current) progressBarRef.current.style.width = `${v}%`;
      },
      onComplete: () => {
        gsap.to(logoRef.current, {
          scale: 1.1,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        });

        gsap.to(containerRef.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.8,
          delay: 0.6,
          ease: 'power4.inOut',
          onComplete: () => setLoading(false),
        });
      },
    });

    return () => { tl.kill(); };
  }, [isLoading, setProgress, setLoading]);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
      style={{ clipPath: 'inset(0 0 0 0)' }}
    >
      <div ref={logoRef} className="mb-12">
        <h1 className="font-display text-6xl md:text-8xl tracking-wider">
          <span className="text-gradient-gold">ÉLITE</span>{' '}
          <span className="text-foreground">SPORT</span>
        </h1>
      </div>

      <div className="w-64 md:w-96 h-[2px] bg-surface-light rounded-full overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-gold to-electric rounded-full"
          style={{ width: '0%' }}
        />
      </div>

      <span
        ref={counterRef}
        className="mt-4 font-display text-2xl text-gold"
      >
        0%
      </span>

      <p className="mt-6 text-sm text-foreground/40 font-body tracking-widest uppercase">
        Preparando experiencia
      </p>
    </div>
  );
}
