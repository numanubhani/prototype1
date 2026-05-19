import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, Bike, Plane, ArrowLeft, ShoppingBag, CreditCard, Gift } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, totalPrice, deliveryType, setDeliveryType } = useCart();
  const navigate = useNavigate();
  
  const deliveryFee = deliveryType === 'Drone' ? 1.500 : 0.500;
  const total = totalPrice + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-20 px-6 text-center max-w-2xl mx-auto">
        <div className="bg-app-card p-20 rounded-[20px] mb-8 border border-app-border">
           <ShoppingBag className="w-24 h-24 text-app-text/10 mx-auto mb-6" />
           <h2 className="text-4xl font-display font-black mb-4 text-app-text uppercase italic">Cart is <span className="text-primary text-opacity-30">Empty</span></h2>
           <p className="text-app-text/30 font-light mb-8">Looks like you haven't added any futuristic meals yet.</p>
           <Link to="/restaurants" className="inline-block bg-primary text-white px-10 py-5 rounded-[20px] font-black tracking-tighter text-xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
             BROWSE RESTAURANTS
           </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pt-32 pb-20 px-6 bg-app-bg min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
           <Link to="/restaurants" className="flex items-center gap-2 text-app-text/30 hover:text-primary transition-colors font-bold mb-4 uppercase tracking-[0.2em] text-[10px]">
             <ArrowLeft className="w-4 h-4" />
             BACK TO RESTAURANTS
           </Link>
           <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-app-text italic">YOUR <span className="text-primary">ORDER</span></h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-app-card rounded-[20px] border border-app-border p-6 md:p-8 shadow-sm">
               <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-app-text">Items in Cart</h3>
               <div className="divide-y divide-app-border">
                  {cart.map((item) => (
                    <div key={item.id} className="py-6 flex gap-4 md:gap-6">
                       <div className="w-20 md:w-24 h-20 md:h-24 rounded-[20px] overflow-hidden flex-shrink-0 bg-app-card">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-70" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                             <h4 className="font-bold text-lg md:text-xl text-app-text truncate">{item.name}</h4>
                             <span className="font-display font-black text-app-text whitespace-nowrap ml-2">{ (item.price * item.quantity).toFixed(3) }</span>
                          </div>
                          <p className="text-[10px] text-app-text/30 font-bold uppercase tracking-widest mb-4">{item.category}</p>
                          <div className="flex justify-between items-center">
                             <div className="flex items-center gap-3 md:gap-4 bg-app-card border border-app-border px-3 md:px-4 py-1.5 md:py-2 rounded-[20px]">
                                <button onClick={() => updateQuantity(item.id, -1)} className="text-app-text/40 hover:text-primary transition-colors"><Minus className="w-3.5 h-3.5" /></button>
                                <span className="font-display font-black text-app-text w-4 text-center text-sm md:text-base">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="text-app-text/40 hover:text-primary transition-colors"><Plus className="w-3.5 h-3.5" /></button>
                             </div>
                             <button onClick={() => removeFromCart(item.id)} className="text-app-text/10 hover:text-red-500 transition-colors p-2">
                                <Trash2 className="w-5 h-5" />
                             </button>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Delivery Selection */}
            <div className="bg-app-card rounded-[20px] p-8 md:p-10 border border-app-border relative overflow-hidden shadow-2xl shadow-primary/5">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px]" />
               <div className="relative z-10">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-app-text uppercase italic tracking-tighter">Delivery <span className="text-primary italic">Method</span></h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <button 
                       onClick={() => setDeliveryType('Bike')}
                       className={`flex items-center gap-4 md:gap-6 p-6 md:p-8 rounded-[20px] border transition-all text-left group ${deliveryType === 'Bike' ? 'border-primary bg-primary/5' : 'border-app-border bg-app-bg hover:border-primary/20'}`}
                     >
                        <div className={`p-4 md:p-5 rounded-[20px] shadow-lg transition-colors ${deliveryType === 'Bike' ? 'bg-primary text-white' : 'bg-app-card text-app-text/40'}`}>
                           <Bike className="w-6 md:w-8 h-6 md:h-8" />
                        </div>
                        <div>
                           <p className={`font-bold text-lg md:text-xl ${deliveryType === 'Bike' ? 'text-app-text' : 'text-app-text/60'}`}>Bike Delivery</p>
                           <p className="text-app-text/30 text-[10px] mt-1 uppercase font-bold tracking-widest">25-35 MIN • 0.500 OMR</p>
                        </div>
                     </button>
                     
                     <button 
                       onClick={() => setDeliveryType('Drone')}
                       className={`flex items-center gap-4 md:gap-6 p-6 md:p-8 rounded-[20px] border transition-all text-left relative overflow-hidden group ${deliveryType === 'Drone' ? 'border-primary bg-primary/10 shadow-[0_0_40px_rgba(249,115,22,0.1)]' : 'border-app-border bg-app-bg hover:border-primary/20'}`}
                     >
                        <div className="absolute top-0 right-0 bg-primary text-white text-[8px] md:text-[9px] font-black px-3 md:px-4 py-1 rounded-bl-[20px] uppercase tracking-[0.2em] shadow-lg">FUTURISTIC</div>
                        <div className={`p-4 md:p-5 rounded-[20px] shadow-lg transition-all ${deliveryType === 'Drone' ? 'bg-primary text-white animate-pulse shadow-primary/20' : 'bg-app-card text-app-text/40'}`}>
                           <Plane className="w-6 md:w-8 h-6 md:h-8" />
                        </div>
                        <div>
                           <p className={`font-bold text-lg md:text-xl ${deliveryType === 'Drone' ? 'text-app-text' : 'text-app-text/60'}`}>Drone Express</p>
                           <p className="text-app-text/30 text-[10px] mt-1 uppercase font-bold tracking-widest">12-15 MIN • 1.500 OMR</p>
                        </div>
                     </button>
                  </div>
               </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
             <div className="bg-app-card rounded-[20px] border border-app-border p-8 md:p-10 shadow-2xl lg:sticky lg:top-32">
                <h3 className="text-2xl font-bold mb-8 text-app-text uppercase italic tracking-tighter">Order <span className="text-primary italic">Summary</span></h3>
                
                <div className="space-y-4 mb-10">
                   <div className="flex justify-between text-app-text/40 text-sm">
                      <span className="font-medium uppercase tracking-widest">Subtotal</span>
                      <span className="font-bold text-app-text/60">{totalPrice.toFixed(3)} OMR</span>
                   </div>
                   <div className="flex justify-between text-app-text/40 text-sm">
                      <span className="font-medium uppercase tracking-widest">Delivery Fee</span>
                      <span className="font-bold text-app-text/60">{deliveryFee.toFixed(3)} OMR</span>
                   </div>
                   <div className="flex justify-between text-app-text/40 text-sm">
                      <span className="font-medium uppercase tracking-widest">Service Fee</span>
                      <span className="font-bold text-app-text/60">0.200 OMR</span>
                   </div>
                   <div className="h-[1px] bg-app-border my-4"></div>
                   <div className="flex justify-between items-center py-2">
                      <span className="font-black text-app-text/40 uppercase tracking-[0.2em] text-[10px]">TOTAL TO PAY</span>
                      <span className="font-display font-black text-4xl text-app-text italic">{(total + 0.200).toFixed(3)} OMR</span>
                   </div>
                </div>

                <div className="space-y-4 mb-10">
                   <div className="relative">
                      <Gift className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-app-text/20" />
                      <input 
                        type="text" 
                        placeholder="PROMO CODE" 
                        className="w-full bg-app-bg border border-app-border rounded-2xl py-5 pl-14 pr-4 focus:outline-none focus:border-primary/50 transition-all text-xs font-bold tracking-widest text-app-text placeholder:text-app-text/20"
                      />
                   </div>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-primary text-white p-7 rounded-[20px] font-black text-2xl tracking-tighter flex items-center justify-center gap-4 hover:bg-primary-dark transition-all shadow-2xl shadow-primary/20 group"
                >
                   <CreditCard className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                   CHECKOUT
                </button>

                <p className="text-center text-[9px] text-app-text/20 mt-8 uppercase font-bold tracking-[0.2em] px-4 leading-relaxed italic">
                   Secure payment via DroneExpress Gateway • Sultanate of Oman
                </p>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
