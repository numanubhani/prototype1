import React, { createContext, useContext, useState, useEffect } from 'react';
import { FoodItem } from '../lib/api';

interface CartItem extends FoodItem {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  restaurantId: string | null;
  addToCart: (item: FoodItem, restaurantId: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
  deliveryType: 'Bike' | 'Drone';
  setDeliveryType: (type: 'Bike' | 'Drone') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [deliveryType, setDeliveryType] = useState<'Bike' | 'Drone'>('Bike');

  const addToCart = (item: FoodItem, restId: string) => {
    setRestaurantId(restId);
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const clearCart = () => {
    setCart([]);
    setRestaurantId(null);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, restaurantId, addToCart, removeFromCart, updateQuantity, clearCart, 
      totalPrice, itemCount, deliveryType, setDeliveryType 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
