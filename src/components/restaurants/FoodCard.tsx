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
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white/5 p-4 rounded-[2rem] border border-white/5 flex gap-4 md:gap-6 hover:bg-white/10 transition-all"
    >
      <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-white/5">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-70" />
      </div>
      
      <div className="flex-1 flex flex-col justify-between py-1 text-white min-w-0">
        <div>
          <div className="flex justify-between items-start">
            <h4 className="text-base md:text-lg font-bold truncate">{item.name}</h4>
            <button className="text-white/20 hover:text-primary transition-colors flex-shrink-0 ml-2">
              <Info className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs md:text-sm text-white/40 line-clamp-2 mt-1 font-light leading-relaxed">{item.description}</p>
        </div>
        
        <div className="flex justify-between items-center mt-3 md:mt-4">
          <span className="text-xl font-display font-black text-white">
            {item.price.toFixed(3)} <span className="text-[10px] uppercase font-bold text-white/30">OMR</span>
          </span>
          
          {quantity === 0 ? (
            <button 
              onClick={() => addToCart(item)}
              className="bg-white/10 hover:bg-primary text-white p-2 rounded-xl transition-all border border-white/5"
            >
              <Plus className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-primary text-white px-3 py-1.5 rounded-xl shadow-lg shadow-primary/20">
              <button onClick={() => updateQuantity(item.id, -1)} className="hover:scale-110 transition-transform">
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold min-w-[1ch] text-center">{quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)} className="hover:scale-110 transition-transform">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
