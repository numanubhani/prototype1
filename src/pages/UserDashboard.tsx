import React from 'react';
import { motion } from 'motion/react';
import { 
  ShoppingBag, 
  Clock, 
  MapPin, 
  Settings, 
  LogOut, 
  ChevronRight, 
  CheckCircle2, 
  CircleDashed,
  Star,
  CreditCard,
  Plane
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserDashboard() {
  const previousOrders = [
    { id: 'DX-1092', restaurant: 'Turkish House', status: 'Delivered', date: 'Oct 24, 2023', total: '12.500', items: 3 },
    { id: 'DX-1088', restaurant: 'Muscat Fusion', status: 'Delivered', date: 'Oct 20, 2023', total: '8.400', items: 2 },
    { id: 'DX-1075', restaurant: 'Al Mouj Cafe', status: 'Delivered', date: 'Oct 15, 2023', total: '4.200', items: 1 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 bg-app-bg"
    >
      <div className="max-w-7xl mx-auto">
        {/* Profile Header - Technical Refinement */}
        <div className="bg-app-card rounded-[20px] border border-app-border p-10 md:p-16 mb-16 flex flex-col md:flex-row justify-between items-center gap-12 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[160px] group-hover:bg-primary/10 transition-all duration-1000" />
          
          {/* Decorative Grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:30px_30px]" />

          <div className="flex items-center gap-10 relative z-10">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/30 rounded-[20px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-28 h-28 md:w-44 md:h-44 rounded-[20px] overflow-hidden border-2 border-app-border relative rotate-[-2deg] group-hover:rotate-0 transition-transform">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                 <span className="bg-primary text-white px-4 py-1.5 rounded-full text-[9px] font-mono font-black uppercase tracking-[0.3em] shadow-lg shadow-primary/20">Tier_Alpha</span>
                 <div className="h-4 w-px bg-app-text/10" />
                 <span className="text-app-text/30 text-[9px] font-mono font-black uppercase tracking-[0.2em]">Oman_ID_Ref_8021_DX</span>
              </div>
              <h1 className="text-5xl md:text-[5.5rem] font-display font-black text-app-text italic tracking-tighter uppercase mb-6 leading-[0.85]">Ahmed <br className="hidden md:block" /> <span className="text-primary translate-x-4 block md:inline">Al-Balushi</span></h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-5 py-3 bg-app-bg border border-app-border rounded-[20px]">
                   <ShoppingBag className="w-4 h-4 text-primary" /> 
                   <span className="text-[10px] font-mono font-black uppercase tracking-widest">12 Completed Cycles</span>
                </div>
                <div className="flex items-center gap-3 px-5 py-3 bg-app-bg border border-app-border rounded-[20px] text-primary">
                   <Star className="w-4 h-4 fill-primary" /> 
                   <span className="text-[10px] font-mono font-black uppercase tracking-widest text-app-text">Global_Rating_4.9</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex md:flex-col gap-4 relative z-10 w-full md:w-auto">
            <button className="flex-1 md:flex-none p-6 bg-app-bg rounded-[20px] border border-app-border hover:border-primary/50 transition-all text-app-text group/btn flex items-center justify-center">
              <Settings className="w-8 h-8 group-hover/btn:rotate-90 transition-transform" />
            </button>
            <button className="flex-1 md:flex-none px-12 py-6 bg-app-bg rounded-[20px] border border-app-border hover:bg-red-500 hover:text-white hover:border-red-500 transition-all text-app-text font-mono font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 italic">
              <LogOut className="w-4 h-4" /> Log_Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Active Orders & History */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <div className="flex justify-between items-end mb-10">
                <div>
                   <h2 className="text-3xl font-display font-black text-app-text uppercase italic tracking-tighter">Active <span className="text-primary">Missions</span></h2>
                   <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-app-text/20 mt-1 italic">Real-time assets in transit</p>
                </div>
                <Link to="/tracking" className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.2em] hover:underline flex items-center gap-2">Monitor_Feed <ChevronRight className="w-3 h-3" /></Link>
              </div>
              
              <div className="bg-app-card rounded-[20px] border border-app-border p-10 flex flex-col md:flex-row justify-between items-center gap-10 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
                 <div className="flex items-center gap-8 relative z-10">
                    <div className="w-20 h-20 bg-primary/20 rounded-[20px] border border-primary/20 flex items-center justify-center text-primary animate-pulse">
                       <Plane className="w-10 h-10" />
                    </div>
                    <div>
                       <h4 className="text-2xl font-display font-black text-app-text italic tracking-tight mb-2">Turkish House Delivery</h4>
                       <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                          <p className="text-app-text/40 text-[10px] font-mono font-black uppercase tracking-widest italic">Vector_DX-702 // Status_Airborne</p>
                       </div>
                    </div>
                 </div>
                 <Link to="/tracking" className="w-full md:w-auto bg-primary text-white px-12 py-5 rounded-[20px] font-display font-black uppercase italic tracking-tighter text-xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 text-center">
                    Launch Tracker
                 </Link>
              </div>
            </section>

            <section>
              <div className="mb-10">
                 <h2 className="text-3xl font-display font-black text-app-text uppercase italic tracking-tighter">Archive <span className="text-app-text/20">Protocol</span></h2>
                 <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-app-text/20 mt-1 italic">Historical operational records</p>
              </div>
              <div className="space-y-6">
                {previousOrders.map((order) => (
                   <div key={order.id} className="bg-app-card rounded-[20px] border border-app-border p-8 flex flex-col md:flex-row justify-between items-center gap-8 hover:border-primary/20 transition-all group">
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 bg-app-bg border border-app-border rounded-[20px] flex items-center justify-center relative shadow-inner overflow-hidden">
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                        <CheckCircle2 className="text-primary w-8 h-8 relative z-10" />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono font-black uppercase text-app-text/20 tracking-widest mb-1 leading-none">{order.id} // {order.date}</p>
                        <h4 className="text-xl font-display font-black text-app-text italic uppercase tracking-tight">{order.restaurant}</h4>
                        <p className="text-app-text/30 text-[10px] font-mono font-bold uppercase tracking-widest mt-1">{order.items} Items_Validated</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-12">
                       <div className="text-right">
                          <p className="text-app-text/20 text-[9px] font-mono uppercase tracking-widest mb-1 font-bold">Total_Units</p>
                          <p className="text-2xl font-display font-black text-app-text italic tracking-tighter">{order.total} <span className="text-xs text-primary">OMR</span></p>
                       </div>
                       <button className="p-5 bg-app-bg border border-app-border rounded-[20px] text-app-text/20 group-hover:text-primary group-hover:border-primary/30 transition-all">
                          <ChevronRight className="w-6 h-6" />
                       </button>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-10 py-6 border border-dashed border-app-border rounded-[20px] text-app-text/20 font-mono font-black uppercase tracking-[0.3em] text-[10px] hover:bg-app-card hover:text-app-text/40 transition-all italic">
                Decompress_Full_Log [38 Files]
              </button>
            </section>
          </div>

          {/* Quick Access Sidebar */}
          <div className="space-y-12">
            <div className="bg-app-card rounded-[20px] border border-app-border p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] group-hover:bg-primary/20 transition-all pointer-events-none" />
              <h3 className="text-xl font-display font-black text-app-text uppercase italic tracking-tighter mb-8">Asset <span className="text-primary">Wallet</span></h3>
              <div className="bg-app-bg p-8 rounded-[20px] border border-app-border mb-8 relative overflow-hidden shadow-inner">
                 <div className="absolute top-4 right-4 flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <div className="w-1 h-1 rounded-full bg-app-text/10" />
                 </div>
                 <p className="text-app-text/30 text-[9px] font-mono font-black uppercase tracking-[0.2em] mb-4">Secured_Drone_Credits</p>
                 <h2 className="text-5xl font-display font-black text-app-text italic tracking-tighter mb-10 overflow-hidden text-ellipsis whitespace-nowrap">42.500 <span className="text-primary">OMR</span></h2>
                 <div className="flex justify-between items-center pt-8 border-t border-app-border">
                    <p className="text-app-text/20 text-[9px] font-mono font-bold italic uppercase tracking-widest leading-none">AUTH_REF // **** 8021</p>
                    <CreditCard className="text-app-text/20 w-8 h-8" />
                 </div>
              </div>
              <button className="w-full bg-primary text-white p-5 rounded-[20px] font-mono font-black uppercase tracking-[0.2em] text-[10px] shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all italic">
                 Initialize_Topup
              </button>
            </div>

            <div className="bg-app-card rounded-[20px] border border-app-border p-10 relative overflow-hidden">
               <h3 className="text-xl font-display font-black text-app-text uppercase italic tracking-tighter mb-8 italic">Verified <span className="text-primary">Nodes</span></h3>
               <div className="space-y-5">
                  <div className="flex items-center gap-6 p-5 bg-app-bg rounded-[20px] border border-app-border hover:border-primary/30 transition-all group">
                     <div className="p-4 bg-primary/10 rounded-[20px] group-hover:bg-primary group-hover:text-white transition-all">
                        <MapPin className="text-primary group-hover:text-white w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-app-text font-display font-black text-lg italic tracking-tight leading-none mb-1">HQ_Home</p>
                        <p className="text-app-text/30 text-[9px] font-mono font-bold uppercase tracking-widest">Zone_04 // Al Mouj</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-6 p-5 bg-app-bg rounded-[20px] border border-app-border opacity-50 hover:opacity-100 transition-all group">
                     <div className="p-4 bg-app-card rounded-[20px] group-hover:bg-primary group-hover:text-white transition-all">
                        <ShoppingBag className="text-app-text/40 group-hover:text-white w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-app-text font-display font-black text-lg italic tracking-tight leading-none mb-1">Branch_Work</p>
                        <p className="text-app-text/30 text-[9px] font-mono font-bold uppercase tracking-widest">Zone_01 // Mutrah</p>
                     </div>
                  </div>
               </div>
               <button className="w-full mt-8 py-4 bg-app-bg border border-app-border rounded-[20px] font-mono font-black uppercase text-[9px] tracking-widest text-app-text/30 hover:text-app-text hover:border-app-text transition-all">Add_New_Node +</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
