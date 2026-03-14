'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

function Particles({ count = 4000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  const [positions, originalPositions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const origPos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;
      sz[i] = Math.random() * 2 + 0.5;
    }
    return [pos, origPos, sz];
  }, [count]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    const mouseX = mouseRef.current.x * viewport.width * 0.5;
    const mouseY = mouseRef.current.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const dx = positions[ix] - mouseX;
      const dy = positions[ix + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 2) {
        const force = (2 - dist) * 0.02;
        positions[ix] += dx * force;
        positions[ix + 1] += dy * force;
      } else {
        positions[ix] += (originalPositions[ix] - positions[ix]) * 0.02;
        positions[ix + 1] += (originalPositions[ix + 1] - positions[ix + 1]) * 0.02;
      }
      positions[ix + 2] += (originalPositions[ix + 2] - positions[ix + 2]) * 0.02;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#D4AF37"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CenterShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[3, -0.5, -2]}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.1}
          wireframe
          transparent
          opacity={0.25}
          emissive="#D4AF37"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#D4AF37" />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00D4FF" />
      <Particles />
      <CenterShape />
    </>
  );
}

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 3.2 });

    if (headlineRef.current) {
      const text = headlineRef.current.innerText;
      headlineRef.current.innerHTML = text
        .split('')
        .map((char) => `<span class="inline-block opacity-0 translate-y-[60px]">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      tl.to(headlineRef.current.querySelectorAll('span'), {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
      });
    }

    tl.from(subRef.current, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.3');
    tl.from(ctaRef.current, { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.4');
  }, []);

  const handleMagnetic = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 2]} style={{ pointerEvents: 'auto' }}>
          <Scene />
        </Canvas>
      </div>

      {/* Scanline overlay */}
      <div className="scanline-overlay absolute inset-0 z-10" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/50 via-background/30 to-background pointer-events-none" />
      {/* Center vignette for text readability */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(8,10,15,0.6) 0%, transparent 70%)' }} />

      {/* Content */}
      <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <h1
          ref={headlineRef}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider leading-none"
          style={{ color: '#D4AF37', textShadow: '0 0 40px rgba(212,175,55,0.3), 0 0 80px rgba(212,175,55,0.1)' }}
        >
          ÉLITE SPORT
        </h1>

        <p
          ref={subRef}
          className="mt-6 text-lg md:text-xl text-foreground/80 font-body max-w-2xl leading-relaxed"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
        >
          Eventos deportivos de alto rendimiento para atletas que exigen excelencia.
          Experimenta la competencia al máximo nivel.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4 pointer-events-auto">
          <button
            onMouseMove={handleMagnetic}
            onMouseLeave={handleMagneticLeave}
            onClick={() => document.querySelector('#eventos')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn px-8 py-4 bg-gold text-background font-display text-lg tracking-widest hover:bg-gold-light transition-colors"
          >
            VER EVENTOS
          </button>
          <button
            onMouseMove={handleMagnetic}
            onMouseLeave={handleMagneticLeave}
            onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="magnetic-btn px-8 py-4 border border-gold/40 text-gold font-display text-lg tracking-widest hover:bg-gold/10 transition-colors"
          >
            CONTACTAR
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-xs text-foreground/40 font-body tracking-widest uppercase">Scroll</span>
        <ChevronDown className="text-gold/60 scroll-bounce" size={24} />
      </div>
    </section>
  );
}
