'use client';

import { useRef, useEffect } from 'react';
import { stats } from '@/lib/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const counters = sectionRef.current.querySelectorAll('.stat-value');
    counters.forEach((el, i) => {
      const target = stats[i].value;
      const suffix = stats[i].suffix;
      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
          once: true,
        },
        onUpdate: () => {
          (el as HTMLElement).textContent = Math.round(obj.val).toLocaleString() + suffix;
        },
      });
    });

    gsap.set(sectionRef.current.querySelectorAll('.stat-item'), { y: 40, opacity: 0 });
    gsap.to(sectionRef.current.querySelectorAll('.stat-item'), {
      y: 0,
      opacity: 1,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 border-y border-gold/10 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="stat-value font-display text-4xl md:text-5xl lg:text-6xl text-gold">
                0
              </div>
              <p className="mt-2 text-foreground/50 font-body text-sm md:text-base tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
