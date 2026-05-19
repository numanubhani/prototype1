import { motion } from 'motion/react';
import { Plane, Bike, Check, Clock, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MapSimulation from '../components/tracking/MapSimulation';

export default function Tracking() {
  const { deliveryType } = useCart();
  const [step, setStep] = useState(1);

  // Simple simulation of steps
  useEffect(() => {
    const timer = setInterval(() => {
      setStep(prev => prev < 4 ? prev + 1 : prev);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    { id: 1, title: 'Order Confirmed', description: 'Turkish House is preparing your meal', time: '12:30 PM' },
    { id: 2, title: 'Preparing Food', description: 'Chef is working on your magic', time: '12:35 PM' },
    { id: 3, title: 'Drone Picked Up', description: 'DX-702 Drone has secured your order', time: '12:45 PM' },
    { id: 4, title: 'On the Way', description: 'Estimated arrival in 5 minutes', time: '12:50 PM' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-6 bg-dark min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 rounded-[3rem] shadow-2xl overflow-hidden border border-white/5">
           {/* Tracking Map Simulation */}
           <div className="h-[450px] relative">
              <MapSimulation deliveryType={deliveryType} />

               {/* Status Header Overlay - Now floating over Simulation */}
              <div className="absolute top-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                 <div className="bg-black/60 backdrop-blur-xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl">
                    <p className="text-white/40 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] mb-1">Live Telemetry</p>
                    <h2 className="text-lg md:text-2xl text-white font-display font-black italic uppercase tracking-tighter">
                       {step === 4 ? 'FINAL_APPROACH' : 'AIRBORNE_TRANSIT'}
                    </h2>
                 </div>
                 <div className="bg-black/60 backdrop-blur-xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-white/10 shadow-2xl text-right sm:ml-auto">
                    <p className="text-white/40 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] mb-1">Precision ETA</p>
                    <h2 className="text-lg md:text-2xl text-white font-display font-black tracking-tighter">7:42 <span className="text-primary italic">MIN</span></h2>
                 </div>
              </div>
           </div>

           {/* Timeline Section */}
           <div className="p-6 md:p-16">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12 md:mb-16 px-2 md:px-4">
                 <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10">
                       <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200" alt="Courier" className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div>
                       <p className="text-[10px] md:text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Your Delivery Partner</p>
                       <h3 className="text-xl md:text-2xl font-bold text-white">Said Al-Mabsali</h3>
                       <div className="flex items-center gap-2 mt-1">
                          <ShieldCheck className="w-4 h-4 text-primary" />
                          <span className="text-[10px] font-bold text-primary italic uppercase tracking-tighter">CERTIFIED DX PILOT</span>
                       </div>
                    </div>
                 </div>
                 <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none justify-center bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-colors border border-white/5 group flex items-center">
                       <Phone className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                    </button>
                    <button className="flex-[2] md:flex-none bg-primary text-white px-10 py-4 md:py-0 rounded-2xl font-black uppercase tracking-tighter hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                       Chat
                    </button>
                 </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-12 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                 {steps.map((s) => (
                    <div key={s.id} className="relative pl-12">
                       <div className={`absolute left-0 top-1 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${step >= s.id ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' : 'bg-white/5 border border-white/5 text-white/10'}`}>
                          {step > s.id ? <Check className="w-6 h-6" /> : step === s.id ? <Clock className="w-5 h-5 animate-spin-slow" /> : <div className="w-2 h-2 bg-current rounded-full" />}
                       </div>
                       <div className="flex justify-between items-start">
                          <div>
                             <h4 className={`text-xl font-bold transition-all uppercase italic tracking-tighter ${step >= s.id ? 'text-white' : 'text-white/20'}`}>{s.title}</h4>
                             <p className={`text-sm mt-1 transition-all ${step >= s.id ? 'text-white/40' : 'text-white/10'}`}>{s.description}</p>
                          </div>
                          <span className={`text-sm font-bold font-display ${step >= s.id ? 'text-white/30' : 'text-white/10'}`}>{s.time}</span>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="mt-16 p-10 bg-white/[0.02] rounded-[3rem] border border-white/5 text-center relative overflow-hidden group">
                 <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 blur-[80px] group-hover:bg-primary/20 transition-all" />
                 <div className="relative z-10">
                    <p className="text-primary font-black text-xl mb-2 uppercase italic tracking-tighter">Live AR View Available</p>
                    <p className="text-white/30 text-sm leading-relaxed max-w-md mx-auto italic">Open the DroneExpress App on your phone to see the drone approaching in Augmented Reality.</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-12 flex justify-between items-center px-10">
           <Link to="/restaurants" className="font-bold text-white/20 hover:text-primary transition-colors uppercase tracking-widest text-[10px]">Order Something Else</Link>
           <button className="font-bold text-primary italic uppercase tracking-widest text-[10px]">Need Help?</button>
        </div>
      </div>
    </motion.div>
  );
}
