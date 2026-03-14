export interface SportEvent {
  id: string;
  title: string;
  sport: SportType;
  date: string;
  location: string;
  capacity: number;
  price: number;
  image: string;
  description: string;
}

export type SportType = 'carrera' | 'ciclismo' | 'natacion' | 'crossfit' | 'triatlon';

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  priceUnit: string;
  icon: string;
}

export interface Package {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  features: PackageFeature[];
  popular?: boolean;
  cta: string;
}

export interface PackageFeature {
  text: string;
  included: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  sport: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface CartItem {
  id: string;
  type: 'event' | 'service';
  title: string;
  price: number;
  quantity: number;
}

export interface ContactForm {
  nombre: string;
  email: string;
  telefono: string;
  tipoEvento: string;
  numAtletas: string;
  serviciosAdicionales: string[];
  mensaje: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}
