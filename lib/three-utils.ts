'use client';

import * as THREE from 'three';

export function createParticlePositions(count: number, spread: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
  }
  return positions;
}

export function createParticleSizes(count: number, min: number, max: number): Float32Array {
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    sizes[i] = Math.random() * (max - min) + min;
  }
  return sizes;
}

export const goldMaterial = new THREE.MeshStandardMaterial({
  color: '#D4AF37',
  metalness: 0.8,
  roughness: 0.2,
  wireframe: true,
});

export const electricMaterial = new THREE.MeshStandardMaterial({
  color: '#00D4FF',
  metalness: 0.6,
  roughness: 0.3,
  emissive: '#00D4FF',
  emissiveIntensity: 0.2,
});
