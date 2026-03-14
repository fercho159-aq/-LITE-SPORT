'use client';

import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Cart from '@/components/Cart';
import SmoothScroll from '@/components/SmoothScroll';
import Stats from '@/components/Stats';
import Testimonios from '@/components/Testimonios';
import Footer from '@/components/Footer';

// Dynamic imports for heavy 3D components
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const Eventos = dynamic(() => import('@/components/Eventos'), { ssr: false });
const Servicios = dynamic(() => import('@/components/Servicios'), { ssr: false });
const Paquetes = dynamic(() => import('@/components/Paquetes'), { ssr: false });
const Galeria = dynamic(() => import('@/components/Galeria'), { ssr: false });
const Contacto = dynamic(() => import('@/components/Contacto'), { ssr: false });

export default function Home() {
  return (
    <>
      <Loader />
      <CustomCursor />
      <Navbar />
      <Cart />
      <SmoothScroll>
        <main>
          <Hero />
          <Eventos />
          <Servicios />
          <Paquetes />
          <Stats />
          <Testimonios />
          <Galeria />
          <Contacto />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
