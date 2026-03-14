'use client';

import { useRef, useEffect } from 'react';
import { testimonials } from '@/lib/data';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-[320px] md:w-[380px] glass neon-border-gold rounded-lg p-6 mx-3">
      <div className="flex items-center gap-3 mb-4">
        <img
          src={t.avatar}
          alt={t.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
        />
        <div>
          <h4 className="font-display text-lg text-foreground tracking-wider">{t.name}</h4>
          <span className="text-foreground/40 font-body text-xs uppercase tracking-widest">{t.sport}</span>
        </div>
      </div>

      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < t.rating ? 'text-gold fill-gold' : 'text-foreground/20'}
          />
        ))}
      </div>

      <p className="text-foreground/60 font-body text-sm leading-relaxed italic">
        &ldquo;{t.quote}&rdquo;
      </p>
    </div>
  );
}

export default function Testimonios() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.set(titleRef.current.children, { y: 60, opacity: 0 });
    gsap.to(titleRef.current.children, {
      y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true },
    });
  }, []);

  // Pause marquee on hover
  const handleHover = (ref: React.RefObject<HTMLDivElement | null>, pause: boolean) => {
    if (ref.current) {
      ref.current.style.animationPlayState = pause ? 'paused' : 'running';
    }
  };

  const row1Items = testimonials.slice(0, 4);
  const row2Items = testimonials.slice(4);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div ref={titleRef}>
          <span className="text-electric text-sm font-body tracking-[0.3em] uppercase">Testimonios</span>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider mt-2">
            <span className="text-gradient-gold">LO QUE DICEN</span>{' '}
            <span className="text-foreground/80">NUESTROS ATLETAS</span>
          </h2>
        </div>
      </div>

      {/* Row 1 - left */}
      <div
        ref={row1Ref}
        className="flex animate-marquee"
        onMouseEnter={() => handleHover(row1Ref, true)}
        onMouseLeave={() => handleHover(row1Ref, false)}
      >
        {[...row1Items, ...row1Items, ...row1Items, ...row1Items].map((t, i) => (
          <TestimonialCard key={`r1-${i}`} t={t} />
        ))}
      </div>

      <div className="h-6" />

      {/* Row 2 - right */}
      <div
        ref={row2Ref}
        className="flex animate-marquee-reverse"
        onMouseEnter={() => handleHover(row2Ref, true)}
        onMouseLeave={() => handleHover(row2Ref, false)}
      >
        {[...row2Items, ...row2Items, ...row2Items, ...row2Items].map((t, i) => (
          <TestimonialCard key={`r2-${i}`} t={t} />
        ))}
      </div>
    </section>
  );
}
