'use client';

import { useState } from 'react';
import { Instagram, Facebook, Linkedin, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      <footer className="bg-surface border-t border-gold/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Logo + description */}
            <div>
              <h3 className="font-display text-3xl tracking-wider">
                <span className="text-gradient-gold">ÉLITE</span>{' '}
                <span className="text-foreground">SPORT</span>
              </h3>
              <p className="mt-4 text-foreground/40 font-body text-sm leading-relaxed">
                Organizador premium de eventos deportivos de alto rendimiento en México.
                Llevamos la competencia al siguiente nivel.
              </p>
            </div>

            {/* Nav links */}
            <div>
              <h4 className="font-display text-lg tracking-wider text-gold mb-4">NAVEGACIÓN</h4>
              <ul className="space-y-2">
                {['Eventos', 'Servicios', 'Paquetes', 'Galería', 'Contacto'].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace('í', 'i')}`}
                      className="text-foreground/50 font-body text-sm hover:text-gold transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg tracking-wider text-gold mb-4">CONTACTO</h4>
              <ul className="space-y-2 text-foreground/50 font-body text-sm">
                <li>info@elitesport.mx</li>
                <li>+52 (55) 1234-5678</li>
                <li>Ciudad de México, México</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-display text-lg tracking-wider text-gold mb-4">NEWSLETTER</h4>
              <p className="text-foreground/40 font-body text-sm mb-4">
                Recibe noticias sobre próximos eventos y ofertas exclusivas.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-surface-light border border-foreground/10 rounded px-3 py-2 text-foreground font-body text-sm outline-none focus:border-gold/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-gold text-background hover:bg-gold-light transition-colors rounded"
                >
                  <Send size={16} />
                </button>
              </form>
              {subscribed && (
                <p className="text-electric text-xs font-body mt-2">¡Suscripción exitosa!</p>
              )}
            </div>
          </div>

          {/* Social + Copyright */}
          <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-foreground/30 font-body text-xs">
              © 2026 ÉLITE SPORT. Todos los derechos reservados.
            </p>

            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-foreground/10 rounded text-foreground/50 hover:border-gold hover:text-gold transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
              {/* TikTok custom icon */}
              <a
                href="#"
                aria-label="TikTok"
                className="w-9 h-9 flex items-center justify-center border border-foreground/10 rounded text-foreground/50 hover:border-gold hover:text-gold transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.64a8.33 8.33 0 004.83 1.55v-3.5a4.84 4.84 0 01-1.07 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/5215512345678"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center whatsapp-pulse shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} className="text-white" />
      </a>
    </>
  );
}
