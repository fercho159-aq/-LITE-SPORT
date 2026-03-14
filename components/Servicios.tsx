'use client';

import { useRef, useEffect, useState } from 'react';
import { services } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { formatMXN } from '@/lib/utils';
import { Service } from '@/types';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const iconPaths: Record<string, JSX.Element> = {
  massage: (
    <svg viewBox="0 0 64 64" className="w-12 h-12">
      <path d="M32 8c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 28c0-6 5-8 12-8s12 2 12 8v6H20v-6z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 40h32M20 46h24M24 52h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  recovery: (
    <svg viewBox="0 0 64 64" className="w-12 h-12">
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M32 18v14l8 8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 12l-4-4M42 12l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  plan: (
    <svg viewBox="0 0 64 64" className="w-12 h-12">
      <rect x="12" y="8" width="40" height="48" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20h24M20 28h24M20 36h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 44l4 4 8-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  biomechanics: (
    <svg viewBox="0 0 64 64" className="w-12 h-12">
      <circle cx="32" cy="14" r="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M32 19v12M32 31l-10 14M32 31l10 14M22 25h20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22" cy="45" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="42" cy="45" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  nutrition: (
    <svg viewBox="0 0 64 64" className="w-12 h-12">
      <path d="M20 12v20c0 8 5 14 12 14s12-6 12-14V12" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 24h24" stroke="currentColor" strokeWidth="2" />
      <path d="M32 46v10M26 56h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  physio: (
    <svg viewBox="0 0 64 64" className="w-12 h-12">
      <path d="M32 8l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

function ServiceCard({ service, onSelect }: { service: Service; onSelect: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="service-card glass neon-border-gold rounded-lg p-6 relative overflow-hidden group"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-gold/5 to-electric/5" />

      <div className="relative z-10">
        <div className={`text-gold transition-transform duration-500 ${hovered ? 'scale-110' : ''}`}>
          {iconPaths[service.icon]}
        </div>

        <h3 className="font-display text-xl tracking-wider mt-4 text-foreground">
          {service.title}
        </h3>

        <div className={`overflow-hidden transition-all duration-500 ${hovered ? 'max-h-32 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
          <p className="text-foreground/50 font-body text-sm leading-relaxed">
            {service.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="font-display text-2xl text-gold">{formatMXN(service.price)}</span>
            <span className="text-foreground/40 text-xs font-body ml-1">/{service.priceUnit}</span>
          </div>
          <button
            onClick={onSelect}
            className="px-4 py-2 bg-gold/10 border border-gold/30 text-gold font-body text-sm tracking-wider hover:bg-gold/20 transition-colors"
          >
            Agendar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Servicios() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.set(titleRef.current.children, { y: 60, opacity: 0 });
    gsap.to(titleRef.current.children, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true },
    });
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.set(gridRef.current.querySelectorAll('.service-card'), { y: 80, opacity: 0 });
    gsap.to(gridRef.current.querySelectorAll('.service-card'), {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
    });
  }, []);

  const handleBook = (service: Service) => {
    addItem({
      id: service.id,
      type: 'service',
      title: service.title,
      price: service.price,
    });
    setSelectedService(null);
  };

  return (
    <>
      <section id="servicios" ref={sectionRef} className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={titleRef}>
            <span className="text-electric text-sm font-body tracking-[0.3em] uppercase">Alto rendimiento</span>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider mt-2">
              <span className="text-gradient-gold">SERVICIOS</span>{' '}
              <span className="text-foreground/80">PREMIUM</span>
            </h2>
            <p className="mt-4 text-foreground/50 font-body max-w-xl">
              Servicios especializados para atletas que buscan el máximo rendimiento y una recuperación óptima.
            </p>
          </div>

          <div ref={gridRef} className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={() => setSelectedService(service)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass neon-border-gold rounded-lg max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 text-foreground/60 hover:text-gold"
              >
                <X size={20} />
              </button>

              <div className="text-gold mb-4">{iconPaths[selectedService.icon]}</div>
              <h3 className="font-display text-2xl text-gradient-gold tracking-wider">
                {selectedService.title}
              </h3>
              <p className="mt-3 text-foreground/60 font-body text-sm leading-relaxed">
                {selectedService.description}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <span className="font-display text-3xl text-gold">{formatMXN(selectedService.price)}</span>
                  <span className="text-foreground/40 text-sm font-body ml-1">/{selectedService.priceUnit}</span>
                </div>
                <button
                  onClick={() => handleBook(selectedService)}
                  className="px-6 py-3 bg-gold text-background font-display tracking-widest text-lg hover:bg-gold-light transition-colors"
                >
                  AGENDAR
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
