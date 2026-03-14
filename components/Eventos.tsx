'use client';

import { useRef, useEffect, useState } from 'react';
import { events } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { formatMXN, formatDate } from '@/lib/utils';
import { SportType } from '@/types';
import { MapPin, Calendar, Users, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const filters: { label: string; value: SportType | 'todos' }[] = [
  { label: 'Todos', value: 'todos' },
  { label: 'Carreras', value: 'carrera' },
  { label: 'Ciclismo', value: 'ciclismo' },
  { label: 'Natación', value: 'natacion' },
  { label: 'Crossfit', value: 'crossfit' },
];

const sportBadgeColor: Record<string, string> = {
  carrera: 'bg-red-500/20 text-red-400 border-red-500/30',
  ciclismo: 'bg-green-500/20 text-green-400 border-green-500/30',
  natacion: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  crossfit: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  triatlon: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

function EventCard({ event, onSelect }: { event: typeof events[0]; onSelect: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -8;
    const rotateY = (x - centerX) / centerX * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleTiltLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleTilt}
      onMouseLeave={handleTiltLeave}
      className="flex-shrink-0 w-[340px] md:w-[400px] glass neon-border-gold rounded-lg overflow-hidden transition-transform duration-100"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-body uppercase tracking-wider rounded border ${sportBadgeColor[event.sport]}`}>
          {event.sport}
        </span>
      </div>

      <div className="p-5" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="font-display text-2xl text-foreground tracking-wider">{event.title}</h3>

        <div className="mt-3 flex flex-col gap-2 text-sm text-foreground/60 font-body">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-gold" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gold" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={14} className="text-gold" />
            <span>{event.capacity.toLocaleString()} atletas</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-2xl text-gold">{formatMXN(event.price)}</span>
          <button
            onClick={onSelect}
            className="px-4 py-2 bg-gold/10 border border-gold/30 text-gold font-body text-sm tracking-wider hover:bg-gold/20 transition-colors"
          >
            Reservar lugar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Eventos() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<SportType | 'todos'>('todos');
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  const filteredEvents = activeFilter === 'todos'
    ? events
    : events.filter((e) => e.sport === activeFilter);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - window.innerWidth + 200;

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${scrollWidth}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(track, { x: -scrollWidth * self.progress });
      },
    });

    return () => { st.kill(); };
  }, [filteredEvents]);

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.set(titleRef.current.children, { y: 60, opacity: 0 });
    gsap.to(titleRef.current.children, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
        once: true,
      },
    });
  }, []);

  const handleBook = (event: typeof events[0]) => {
    addItem({
      id: event.id,
      type: 'event',
      title: event.title,
      price: event.price,
    });
    setSelectedEvent(null);
  };

  return (
    <>
      <section id="eventos" ref={sectionRef} className="relative min-h-screen pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={titleRef} className="mb-12">
            <span className="text-electric text-sm font-body tracking-[0.3em] uppercase">Próximos eventos</span>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider mt-2">
              <span className="text-gradient-gold">EVENTOS</span>
            </h2>

            {/* Filter tabs */}
            <div className="flex flex-wrap gap-3 mt-8">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActiveFilter(f.value)}
                  className={`px-4 py-2 text-sm font-body tracking-wider uppercase transition-all ${
                    activeFilter === f.value
                      ? 'bg-gold text-background'
                      : 'border border-foreground/20 text-foreground/60 hover:border-gold/50 hover:text-gold'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal scrolling cards */}
        <div ref={trackRef} className="flex gap-6 pl-4 sm:pl-8 lg:pl-16 py-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onSelect={() => setSelectedEvent(event)} />
          ))}
        </div>
      </section>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass neon-border-gold rounded-lg max-w-lg w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 text-foreground/60 hover:text-gold transition-colors"
              >
                <X size={20} />
              </button>

              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-48 object-cover rounded mb-4"
              />

              <h3 className="font-display text-3xl text-gradient-gold tracking-wider">
                {selectedEvent.title}
              </h3>

              <p className="mt-3 text-foreground/60 font-body text-sm leading-relaxed">
                {selectedEvent.description}
              </p>

              <div className="mt-4 flex flex-col gap-2 text-sm text-foreground/60 font-body">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-gold" />
                  <span>{formatDate(selectedEvent.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gold" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-gold" />
                  <span>Capacidad: {selectedEvent.capacity.toLocaleString()} atletas</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="font-display text-3xl text-gold">{formatMXN(selectedEvent.price)}</span>
                <button
                  onClick={() => handleBook(selectedEvent)}
                  className="px-6 py-3 bg-gold text-background font-display tracking-widest text-lg hover:bg-gold-light transition-colors"
                >
                  RESERVAR
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
