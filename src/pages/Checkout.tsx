import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, User, Mail, CreditCard, ChevronRight, Package, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      navigate('/tracking');
    }, 2000);
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
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen pt-32 pb-20 px-6 bg-app-bg"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:row-span-1 lg:flex-row justify-between items-start md:items-end gap-8 mb-16">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-black uppercase text-primary tracking-[0.3em] font-display italic">Transaction_Phase_04</span>
                <div className="h-4 w-px bg-app-text/10" />
                <span className="text-app-text/20 text-[10px] font-mono font-black uppercase tracking-widest">Protocol: Secure_Checkout</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-black text-app-text italic uppercase tracking-tighter leading-[0.85]">Mission <br /> <span className="text-primary italic">Initialization</span></h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-12">
              <section className="bg-app-card rounded-[20px] border border-app-border p-10 md:p-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
                
                <h3 className="text-2xl font-display font-black text-app-text uppercase italic tracking-tighter mb-12 flex items-center gap-4">
                  <User className="text-primary w-6 h-6" /> Recipient_Identity
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Full_Name</label>
                    <div className="relative group">
                      <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text/20 group-focus-within:text-primary transition-colors" />
                      <input 
                        required 
                        className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 pl-14 pr-6 focus:border-primary/50 outline-none text-app-text transition-all font-display font-bold text-lg italic tracking-tight" 
                        placeholder="Ahmed Al-Balushi" 
                        defaultValue="Ahmed Al-Balushi"
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Secure_Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-app-text/20 group-focus-within:text-primary transition-colors" />
                      <input 
                        type="email" 
                        required 
                        className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 pl-14 pr-6 focus:border-primary/50 outline-none text-app-text transition-all font-display font-bold text-lg italic tracking-tight" 
                        placeholder="ahmed@example.com"
                        defaultValue="ahmed.albalushi@oman.om"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-app-card rounded-[20px] border border-app-border p-10 md:p-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
                
                <h3 className="text-2xl font-display font-black text-app-text uppercase italic tracking-tighter mb-12 flex items-center gap-4">
                  <MapPin className="text-primary w-6 h-6" /> Target_Coordinates
                </h3>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Primary_Vector_Address</label>
                    <div className="relative group">
                      <MapPin className="absolute left-6 top-5 w-4 h-4 text-app-text/20 group-focus-within:text-primary transition-colors" />
                      <textarea 
                        required 
                        rows={3}
                        className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 pl-14 pr-6 focus:border-primary/50 outline-none text-app-text transition-all font-display font-bold text-lg italic tracking-tight resize-none" 
                        placeholder="Enter full delivery coordinates (Street, Building, Floor)..."
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">City_Sector</label>
                      <input 
                        required 
                        className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all font-display font-bold text-lg italic tracking-tight" 
                        placeholder="Muscat"
                        defaultValue="Muscat"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Delivery_Node</label>
                      <input 
                        required 
                        className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all font-display font-bold text-lg italic tracking-tight" 
                        placeholder="Al Mouj"
                        defaultValue="Al Mouj"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-col md:flex-row items-center gap-8 px-6">
                <div className="flex items-center gap-4">
                   <ShieldCheck className="text-primary w-8 h-8" />
                   <div>
                      <p className="text-[10px] font-mono font-black uppercase tracking-widest text-app-text">Encrypted_Payload</p>
                      <p className="text-[9px] font-mono font-bold text-app-text/20 uppercase tracking-widest leading-none">Verified by Muscat Security Ops</p>
                   </div>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto ml-auto bg-primary text-white px-20 py-8 rounded-[20px] font-display font-black uppercase italic tracking-tighter text-3xl shadow-[0_0_50px_rgba(249,115,22,0.3)] hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? 'INITIALIZING...' : 'CONFIRM_MISSION'}
                  <ChevronRight className="inline-block ml-4 w-10 h-10 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar - Mission Brief */}
          <div className="space-y-12">
            <div className="bg-app-card rounded-[20px] border border-app-border p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px]" />
              <h3 className="text-xl font-display font-black text-app-text uppercase italic tracking-tighter mb-10 pb-6 border-b border-app-border">Mission_Brief</h3>
              
              <div className="space-y-8 mb-10 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-app-bg border border-app-border rounded-[20px] flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                      </div>
                      <div>
                         <p className="text-[8px] font-mono font-black uppercase text-primary tracking-[0.2em] mb-1">Asset_{item.id.slice(0,4)}</p>
                         <p className="text-sm font-display font-black text-app-text italic uppercase leading-none">{item.name}</p>
                         <p className="text-[10px] font-mono font-bold text-app-text/30 mt-2">QTY_0{item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-display font-black text-app-text italic">{(item.price * item.quantity).toFixed(3)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-10 border-t border-app-border">
                <div className="flex justify-between items-center text-app-text/40">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest">Base_Payload</p>
                  <p className="font-display font-black italic">{total().toFixed(3)}</p>
                </div>
                <div className="flex justify-between items-center text-app-text/40">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest">Logistics_Unit</p>
                  <p className="font-display font-black italic text-primary">0.500</p>
                </div>
                <div className="flex justify-between items-center pt-6 mt-4 border-t border-app-border">
                  <p className="text-[10px] font-mono font-black uppercase tracking-widest text-app-text">Total_Units</p>
                  <div className="text-right">
                    <p className="text-4xl font-display font-black text-app-text italic tracking-tighter">{(total() + 0.5).toFixed(3)} <span className="text-xs text-primary">OMR</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-app-bg border border-app-border border-dashed rounded-[20px] p-8 text-center">
               <CreditCard className="w-10 h-10 text-app-text/10 mx-auto mb-4" />
               <p className="text-[10px] font-mono font-black uppercase text-app-text/20 tracking-widest mb-2 font-display italic">Payment_Auth: Wallet_Deduction</p>
               <p className="text-[10px] font-bold text-primary font-display italic">Current Units: 42.500 OMR</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
