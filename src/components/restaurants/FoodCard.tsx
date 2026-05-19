import { motion } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { FoodItem } from '../../data/restaurants';
import { Plus, Minus, Info } from 'lucide-react';
import { useState } from 'react';

interface FoodCardProps {
  item: FoodItem;
  key?: string | number;
}

export default function FoodCard({ item }: FoodCardProps) {
  const { addToCart, cart, updateQuantity } = useCart();
  const cartItem = cart.find(i => i.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-app-card group relative p-5 rounded-[20px] border border-app-border flex gap-6 hover:bg-app-card/60 hover:border-primary/20 transition-all overflow-hidden"
    >
      {/* Corner Status Indication */}
      <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/20 rotate-45" />

      <div className="w-24 h-24 md:w-36 md:h-36 flex-shrink-0 rounded-[20px] overflow-hidden bg-app-bg border border-app-border relative shadow-inner">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>
      
      <div className="flex-1 flex flex-col justify-between py-1 text-app-text min-w-0">
        <div>
          <div className="flex justify-between items-start">
            <div className="min-w-0">
              <p className="text-[8px] font-mono font-black uppercase text-primary tracking-[0.2em] mb-1">Asset_{item.id.slice(0, 4)}</p>
              <h4 className="text-lg md:text-xl font-display font-black tracking-tight truncate uppercase italic">{item.name}</h4>
            </div>
          </div>
          <p className="text-[11px] md:text-xs text-app-text/30 line-clamp-2 mt-2 font-medium leading-relaxed italic pr-4">{item.description}</p>
        </div>
        
        <div className="flex justify-between items-end mt-4">
          <div className="flex flex-col">
             <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-app-text/20 mb-1">Credit Units</span>
             <span className="text-2xl font-display font-black text-app-text italic tracking-tighter">
               {item.price.toFixed(3)} <span className="text-[10px] text-primary">OMR</span>
             </span>
          </div>
          
          <div className="relative">
            {quantity === 0 ? (
              <button 
                onClick={() => addToCart(item)}
                className="bg-app-bg hover:bg-primary border border-app-border hover:border-primary text-app-text hover:text-white p-4 rounded-[20px] transition-all shadow-xl group/btn"
              >
                <Plus className="w-5 h-5 relative z-10" />
              </button>
            ) : (
              <div className="flex items-center gap-4 bg-primary text-white p-1 rounded-[20px] shadow-xl shadow-primary/20 border border-primary/50">
                <button onClick={() => updateQuantity(item.id, -1)} className="p-3 hover:bg-white/10 rounded-[20px] transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-display font-black text-lg italic min-w-[1.5ch] text-center">{quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="p-3 hover:bg-white/10 rounded-[20px] transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative Hardware Elements */}
      <div className="absolute top-4 right-4 flex gap-1">
         <div className="w-1 h-1 rounded-full bg-app-text/10" />
         <div className="w-1 h-1 rounded-full bg-app-text/10" />
         <div className="w-1 h-1 rounded-full bg-app-text/10" />
      </div>
    </motion.div>
  );
}
