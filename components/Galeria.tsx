'use client';

import { useRef, useEffect, useState } from 'react';
import { galleryImages } from '@/lib/data';
import { X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Galeria() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.set(titleRef.current.children, { y: 60, opacity: 0 });
    gsap.to(titleRef.current.children, {
      y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true },
    });
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    gsap.set(gridRef.current.querySelectorAll('.gallery-item'), { y: 60, opacity: 0 });
    gsap.to(gridRef.current.querySelectorAll('.gallery-item'), {
      y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
    });
  }, []);

  return (
    <>
      <section id="galeria" ref={sectionRef} className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={titleRef} className="mb-12">
            <span className="text-electric text-sm font-body tracking-[0.3em] uppercase">Galería</span>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider mt-2">
              <span className="text-gradient-gold">MOMENTOS</span>{' '}
              <span className="text-foreground/80">ÉLITE</span>
            </h2>
          </div>

          <div ref={gridRef} className="masonry-grid">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="gallery-item relative overflow-hidden rounded-lg group cursor-pointer"
                onClick={() => setLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.category}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="font-display text-xl text-gold tracking-widest">{img.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 text-foreground/60 hover:text-gold transition-colors z-10"
            >
              <X size={32} />
            </button>

            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].category}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <span className="font-display text-xl text-gold tracking-widest">
                {galleryImages[lightbox].category}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
