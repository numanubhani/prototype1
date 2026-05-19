import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { MapPin, User, Mail, CreditCard, ChevronRight, Package, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ordersApi } from '../lib/api';

export default function Checkout() {
  const { cart, totalPrice, clearCart, deliveryType, restaurantId } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    recipient_name: user?.name || '',
    recipient_email: user?.email || '',
    address_line: '',
    address_city: 'Muscat',
    address_node: 'Al Mouj',
  });

  const deliveryFee = deliveryType === 'Drone' ? 1.5 : 0.5;
  const grandTotal = totalPrice + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!restaurantId) {
      setError('No restaurant selected for this order.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const items = cart.map((item) => {
        const foodItemId = Number(item.id);
        if (!Number.isInteger(foodItemId) || foodItemId <= 0) {
          throw new Error(
            'Your cart has outdated items. Please clear the cart and add items again from the menu.',
          );
        }
        return { food_item_id: foodItemId, quantity: item.quantity };
      });

      const order = await ordersApi.create({
        restaurant_id: restaurantId,
        items,
        delivery_type: deliveryType,
        recipient_name: form.recipient_name,
        recipient_email: form.recipient_email,
        address_line: form.address_line,
        address_city: form.address_city,
        address_node: form.address_node,
        payment_method: 'wallet',
      }) as { id: string };
      clearCart();
      const orderId = (order as { id?: string; order_number?: string }).id
        ?? (order as { order_number?: string }).order_number;
      if (orderId) localStorage.setItem('last_order', orderId);
      navigate('/tracking');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Order failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 px-6">
        <div className="text-center">
          <Package className="w-20 h-20 text-app-text/10 mx-auto mb-6" />
          <h2 className="text-3xl font-display font-black text-app-text italic uppercase tracking-tighter mb-4">Cart Empty</h2>
          <button
            onClick={() => navigate('/')}
            className="text-primary font-mono font-black uppercase tracking-widest text-[10px] hover:underline"
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-32 pb-20 px-6 bg-app-bg">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="space-y-4">
            <span className="text-[10px] font-mono font-black uppercase text-primary tracking-[0.3em]">Transaction_Phase_04</span>
            <h1 className="text-5xl md:text-7xl font-display font-black text-app-text italic uppercase tracking-tighter leading-[0.85]">
              Mission <br /> <span className="text-primary italic">Initialization</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-12">
              <section className="bg-app-card rounded-[20px] border border-app-border p-10 md:p-16 shadow-2xl">
                <h3 className="text-2xl font-display font-black text-app-text uppercase italic tracking-tighter mb-12 flex items-center gap-4">
                  <User className="text-primary w-6 h-6" /> Recipient_Identity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Full_Name</label>
                    <input
                      required
                      value={form.recipient_name}
                      onChange={(e) => setForm({ ...form, recipient_name: e.target.value })}
                      className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text font-display font-bold text-lg italic"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Email</label>
                    <input
                      type="email"
                      required
                      value={form.recipient_email}
                      onChange={(e) => setForm({ ...form, recipient_email: e.target.value })}
                      className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text font-display font-bold text-lg italic"
                    />
                  </div>
                </div>
              </section>

              <section className="bg-app-card rounded-[20px] border border-app-border p-10 md:p-16 shadow-2xl">
                <h3 className="text-2xl font-display font-black text-app-text uppercase italic tracking-tighter mb-12 flex items-center gap-4">
                  <MapPin className="text-primary w-6 h-6" /> Target_Coordinates
                </h3>
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Address</label>
                    <textarea
                      required
                      rows={3}
                      value={form.address_line}
                      onChange={(e) => setForm({ ...form, address_line: e.target.value })}
                      className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text resize-none"
                      placeholder="Street, Building, Floor"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">City</label>
                      <input
                        required
                        value={form.address_city}
                        onChange={(e) => setForm({ ...form, address_city: e.target.value })}
                        className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Delivery Node</label>
                      <input
                        required
                        value={form.address_node}
                        onChange={(e) => setForm({ ...form, address_node: e.target.value })}
                        className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {error && <p className="text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto ml-auto bg-primary text-white px-20 py-8 rounded-[20px] font-display font-black uppercase italic tracking-tighter text-3xl shadow-xl hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center justify-center gap-4"
              >
                {isSubmitting ? 'INITIALIZING...' : 'CONFIRM_MISSION'}
                <ChevronRight className="w-10 h-10" />
              </button>
            </form>
          </div>

          <div className="space-y-12">
            <div className="bg-app-card rounded-[20px] border border-app-border p-10">
              <h3 className="text-xl font-display font-black text-app-text uppercase italic mb-10 pb-6 border-b border-app-border">Mission_Brief</h3>
              <div className="space-y-8 mb-10">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-sm font-display font-black text-app-text italic uppercase">{item.name}</p>
                      <p className="text-[10px] text-app-text/30">QTY {item.quantity}</p>
                    </div>
                    <p className="font-display font-black italic">{(item.price * item.quantity).toFixed(3)}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4 pt-10 border-t border-app-border">
                <div className="flex justify-between text-app-text/40">
                  <p className="text-[10px] font-mono uppercase">Subtotal</p>
                  <p className="font-display font-black italic">{totalPrice.toFixed(3)}</p>
                </div>
                <div className="flex justify-between text-app-text/40">
                  <p className="text-[10px] font-mono uppercase">Logistics ({deliveryType})</p>
                  <p className="font-display font-black italic text-primary">{deliveryFee.toFixed(3)}</p>
                </div>
                <div className="flex justify-between pt-6 border-t border-app-border">
                  <p className="font-mono font-black uppercase text-sm">Total</p>
                  <p className="text-4xl font-display font-black italic">{grandTotal.toFixed(3)} <span className="text-xs text-primary">OMR</span></p>
                </div>
              </div>
            </div>
            <div className="bg-app-bg border border-dashed border-app-border rounded-[20px] p-8 text-center">
              <CreditCard className="w-10 h-10 text-app-text/10 mx-auto mb-4" />
              <p className="text-[10px] font-mono uppercase text-app-text/20">Wallet_Deduction</p>
              <p className="text-[10px] font-bold text-primary mt-2">
                Balance: {user?.wallet_balance ?? '—'} OMR
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
