'use client';

import { useEffect, useRef } from 'react';
import { useCartStore } from '@/lib/store';
import { formatMXN } from '@/lib/utils';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import gsap from 'gsap';

export default function Cart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, subtotal } = useCartStore();
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' });
      gsap.to(panelRef.current, { x: 0, duration: 0.4, ease: 'power3.out' });
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' });
      gsap.to(panelRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[150] bg-background/60 backdrop-blur-sm opacity-0 pointer-events-none"
        onClick={closeCart}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="fixed top-0 right-0 bottom-0 z-[151] w-full max-w-md bg-surface border-l border-gold/10 flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gold/10">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} className="text-gold" />
            <h3 className="font-display text-2xl tracking-wider text-foreground">CARRITO</h3>
          </div>
          <button onClick={closeCart} className="text-foreground/60 hover:text-gold transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-foreground/20 mb-4" />
              <p className="text-foreground/40 font-body">Tu carrito está vacío</p>
              <p className="text-foreground/30 font-body text-sm mt-1">
                Agrega eventos o servicios para comenzar
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="glass rounded-lg p-4 flex items-start gap-4"
              >
                <div className="flex-1">
                  <span className="text-xs font-body text-electric uppercase tracking-widest">
                    {item.type === 'event' ? 'Evento' : 'Servicio'}
                  </span>
                  <h4 className="font-display text-lg text-foreground tracking-wider mt-1">
                    {item.title}
                  </h4>
                  <p className="text-gold font-display text-xl mt-1">
                    {formatMXN(item.price)}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 flex items-center justify-center border border-foreground/20 text-foreground/60 hover:border-gold hover:text-gold transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-body text-sm text-foreground w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 flex items-center justify-center border border-foreground/20 text-foreground/60 hover:border-gold hover:text-gold transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-foreground/30 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gold/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-body text-foreground/60">Subtotal</span>
              <span className="font-display text-2xl text-gold">{formatMXN(subtotal())}</span>
            </div>

            <button className="w-full py-4 bg-gold text-background font-display text-lg tracking-widest hover:bg-gold-light transition-colors">
              PROCEDER AL PAGO
            </button>

            <button
              onClick={clearCart}
              className="w-full py-2 text-foreground/40 font-body text-sm hover:text-red-400 transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </div>
    </>
  );
}
