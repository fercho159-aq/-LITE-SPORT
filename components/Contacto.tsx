'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

function Trophy() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef}>
        {/* Base */}
        <mesh position={[0, -1.2, 0]}>
          <cylinderGeometry args={[0.8, 1, 0.3, 32]} />
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.4} metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.15, 0.3, 1, 16]} />
          <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={0.4} metalness={0.7} roughness={0.2} />
        </mesh>
        {/* Cup */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.6, 0.3, 1.2, 32, 1, true]} />
          <meshStandardMaterial
            color="#D4AF37"
            emissive="#D4AF37"
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Star on top */}
        <mesh position={[0, 1.4, 0]} rotation={[0, 0, Math.PI / 10]}>
          <octahedronGeometry args={[0.25, 0]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.8}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function TrophyScene() {
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#D4AF37" />
      <pointLight position={[-5, -3, 3]} intensity={1.5} color="#00D4FF" />
      <pointLight position={[0, 3, 3]} intensity={1} color="#FFFFFF" />
      <Trophy />
    </>
  );
}

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  tipoEvento?: string;
}

export default function Contacto() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoEvento: '',
    numAtletas: '',
    serviciosAdicionales: [] as string[],
    mensaje: '',
  });

  useEffect(() => {
    if (!titleRef.current) return;
    gsap.set(titleRef.current.children, { y: 60, opacity: 0 });
    gsap.to(titleRef.current.children, {
      y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.current, start: 'top 80%', once: true },
    });
  }, []);

  const validate = useCallback((): boolean => {
    const e: FormErrors = {};
    if (!form.nombre.trim()) e.nombre = 'Nombre requerido';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido';
    if (!form.telefono.trim() || !/^\+?[\d\s()-]{10,}$/.test(form.telefono)) e.telefono = 'Teléfono inválido';
    if (!form.tipoEvento) e.tipoEvento = 'Selecciona un tipo de evento';
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setSending(false);
    setSent(true);

    // Confetti!
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#00D4FF', '#E8D48B', '#66E5FF'],
    });
  };

  const handleChange = (field: string, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  };

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      serviciosAdicionales: prev.serviciosAdicionales.includes(service)
        ? prev.serviciosAdicionales.filter((s) => s !== service)
        : [...prev.serviciosAdicionales, service],
    }));
  };

  const additionalServices = [
    'Masaje Deportivo',
    'Nutrición',
    'Fisioterapia',
    'Evaluación Biomecánica',
  ];

  const inputClass = (field: keyof FormErrors) =>
    `w-full bg-surface-light border ${
      errors[field] ? 'border-red-500' : 'border-foreground/10 focus:border-gold/50'
    } rounded px-4 py-3 text-foreground font-body text-sm outline-none transition-colors`;

  return (
    <section id="contacto" ref={sectionRef} className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-12">
          <span className="text-electric text-sm font-body tracking-[0.3em] uppercase">Contacto</span>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider mt-2">
            <span className="text-gradient-gold">ÚNETE</span>{' '}
            <span className="text-foreground/80">A LA ÉLITE</span>
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {sent ? (
            <div className="glass neon-border-gold rounded-lg p-8 text-center">
              <div className="font-display text-4xl text-gradient-gold tracking-wider mb-4">
                ¡MENSAJE ENVIADO!
              </div>
              <p className="text-foreground/60 font-body">
                Nos pondremos en contacto contigo pronto. Gracias por tu interés en ÉLITE SPORT.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({
                    nombre: '', email: '', telefono: '', tipoEvento: '',
                    numAtletas: '', serviciosAdicionales: [], mensaje: '',
                  });
                }}
                className="mt-6 px-6 py-3 bg-gold text-background font-display tracking-widest hover:bg-gold-light transition-colors"
              >
                ENVIAR OTRO
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="glass neon-border-gold rounded-lg p-8 space-y-5">
              <div>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  value={form.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  className={inputClass('nombre')}
                />
                {errors.nombre && <p className="text-red-400 text-xs mt-1 font-body">{errors.nombre}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={inputClass('email')}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 font-body">{errors.email}</p>}
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={form.telefono}
                    onChange={(e) => handleChange('telefono', e.target.value)}
                    className={inputClass('telefono')}
                  />
                  {errors.telefono && <p className="text-red-400 text-xs mt-1 font-body">{errors.telefono}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <select
                    value={form.tipoEvento}
                    onChange={(e) => handleChange('tipoEvento', e.target.value)}
                    className={inputClass('tipoEvento')}
                  >
                    <option value="">Tipo de evento</option>
                    <option value="maraton">Maratón</option>
                    <option value="triatlon">Triatlón</option>
                    <option value="ciclismo">Ciclismo</option>
                    <option value="natacion">Natación</option>
                    <option value="crossfit">Crossfit</option>
                    <option value="corporativo">Evento Corporativo</option>
                  </select>
                  {errors.tipoEvento && <p className="text-red-400 text-xs mt-1 font-body">{errors.tipoEvento}</p>}
                </div>
                <input
                  type="number"
                  placeholder="Número de atletas"
                  value={form.numAtletas}
                  onChange={(e) => handleChange('numAtletas', e.target.value)}
                  className="w-full bg-surface-light border border-foreground/10 focus:border-gold/50 rounded px-4 py-3 text-foreground font-body text-sm outline-none transition-colors"
                />
              </div>

              {/* Checkboxes */}
              <div>
                <p className="text-foreground/50 font-body text-sm mb-2">Servicios adicionales</p>
                <div className="grid grid-cols-2 gap-2">
                  {additionalServices.map((s) => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer group">
                      <div
                        className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${
                          form.serviciosAdicionales.includes(s)
                            ? 'bg-gold border-gold'
                            : 'border-foreground/20 group-hover:border-gold/50'
                        }`}
                        onClick={() => toggleService(s)}
                      >
                        {form.serviciosAdicionales.includes(s) && (
                          <svg viewBox="0 0 12 12" className="w-3 h-3 text-background">
                            <path d="M2 6l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        )}
                      </div>
                      <span className="text-foreground/60 font-body text-sm">{s}</span>
                    </label>
                  ))}
                </div>
              </div>

              <textarea
                placeholder="Mensaje (opcional)"
                rows={4}
                value={form.mensaje}
                onChange={(e) => handleChange('mensaje', e.target.value)}
                className="w-full bg-surface-light border border-foreground/10 focus:border-gold/50 rounded px-4 py-3 text-foreground font-body text-sm outline-none transition-colors resize-none"
              />

              <button
                type="submit"
                disabled={sending}
                className="w-full py-4 bg-gold text-background font-display text-xl tracking-widest hover:bg-gold-light transition-colors disabled:opacity-60 relative overflow-hidden"
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    ENVIANDO...
                  </span>
                ) : (
                  'ENVIAR MENSAJE'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
