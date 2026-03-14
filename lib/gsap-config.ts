'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function registerGSAP() {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }
}

export function animateIn(
  trigger: string | Element,
  elements: string | Element | NodeListOf<Element>,
  options?: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    start?: string;
  }
) {
  const {
    y = 60,
    duration = 0.8,
    stagger = 0.1,
    start = 'top 85%',
  } = options || {};

  // Set initial state
  gsap.set(elements, { y, opacity: 0 });

  return gsap.to(elements, {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
      once: true,
    },
  });
}

export { gsap, ScrollTrigger };
