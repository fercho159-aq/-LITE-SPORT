'use client';

import { useRef, useEffect, useState } from 'react';
import { packages } from '@/lib/data';
import { formatMXN } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { Check, X as XIcon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Paquetes() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [annual, setAnnual] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.set(titleRef.current.children, { y: 60, opacity: 0 });
    gsap.to(titleRef.current.children, {
      y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true },
    });
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    gsap.set(cardsRef.current.querySelectorAll('.pkg-card'), { y: 80, opacity: 0 });
    gsap.to(cardsRef.current.querySelectorAll('.pkg-card'), {
      y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
    });
  }, []);

  // Animated counter for prices
  useEffect(() => {
    const priceEls = document.querySelectorAll('.price-counter');
    priceEls.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0');
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          el.textContent = formatMXN(Math.round(obj.val));
        },
      });
    });
  }, [annual]);

  return (
    <section id="paquetes" ref={sectionRef} className="py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center">
          <span className="text-electric text-sm font-body tracking-[0.3em] uppercase">Planes</span>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider mt-2">
            <span className="text-gradient-gold">PAQUETES</span>
          </h2>
          <p className="mt-4 text-foreground/50 font-body max-w-xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades competitivas.
          </p>

          {/* Toggle */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className={`font-body text-sm ${!annual ? 'text-gold' : 'text-foreground/50'}`}>Mensual</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-14 h-7 rounded-full bg-surface-light border border-gold/20 transition-colors"
            >
              <div
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-gold transition-transform duration-300 ${
                  annual ? 'translate-x-7' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className={`font-body text-sm ${annual ? 'text-gold' : 'text-foreground/50'}`}>
              Anual <span className="text-electric text-xs">(-20%)</span>
            </span>
          </div>
        </div>

        <div ref={cardsRef} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg) => {
            const price = annual ? pkg.annualPrice / 12 : pkg.monthlyPrice;
            return (
              <div
                key={pkg.id}
                className={`pkg-card glass rounded-lg p-8 relative overflow-hidden transition-all ${
                  pkg.popular
                    ? 'border-2 border-gold animate-pulse-glow md:scale-105 md:-translate-y-2'
                    : 'neon-border-gold'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gold text-background px-4 py-1 font-display text-sm tracking-widest">
                    MÁS POPULAR
                  </div>
                )}

                <h3 className="font-display text-3xl tracking-wider text-foreground">{pkg.name}</h3>

                <div className="mt-4">
                  <span
                    className="price-counter font-display text-4xl text-gold"
                    data-target={Math.round(price)}
                  >
                    {formatMXN(Math.round(price))}
                  </span>
                  <span className="text-foreground/40 text-sm font-body">/mes</span>
                  {annual && (
                    <p className="text-electric text-xs font-body mt-1">
                      {formatMXN(pkg.annualPrice)} facturado anualmente
                    </p>
                  )}
                </div>

                <ul className="mt-6 space-y-3">
                  {pkg.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-body">
                      {f.included ? (
                        <Check size={16} className="text-gold mt-0.5 flex-shrink-0" />
                      ) : (
                        <XIcon size={16} className="text-foreground/20 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={f.included ? 'text-foreground/70' : 'text-foreground/30'}>
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    addItem({
                      id: pkg.id,
                      type: 'service',
                      title: `Plan ${pkg.name}`,
                      price: Math.round(price),
                    })
                  }
                  className={`mt-8 w-full py-3 font-display text-lg tracking-widest transition-colors ${
                    pkg.popular
                      ? 'bg-gold text-background hover:bg-gold-light'
                      : 'border border-gold/30 text-gold hover:bg-gold/10'
                  }`}
                >
                  {pkg.cta.toUpperCase()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
