import { motion } from 'motion/react';
import { Search, MapPin, Send, Plane, Bike } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden px-6 lg:px-12">
      {/* Background elements - Updated for Immersive UI */}
      <div className="absolute top-[-5%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[160px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[140px] rounded-full pointer-events-none opacity-40" />
      
      {/* Editorial Grid Lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-app-text/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-app-text/10 to-transparent" />
      <div className="absolute inset-y-0 left-1/4 w-px bg-app-text/[0.03] hidden lg:block" />
      <div className="absolute inset-y-0 right-1/4 w-px bg-app-text/[0.03] hidden lg:block" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl w-full text-center relative z-10"
      >
        <div className="inline-flex items-center gap-3 bg-app-card border border-app-border text-primary px-5 py-2.5 rounded-full mb-12 shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-primary/5 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
           <Plane className="w-4 h-4 relative z-10 animate-bounce" />
           <span className="text-[10px] font-mono font-black uppercase tracking-[0.3em] relative z-10">Network_Status // Live_Beta</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-display font-black tracking-tighter leading-[0.8] mb-12 text-app-text uppercase italic">
          <span className="block translate-x-[-0.05em]">DELIVERING</span>
          <span className="text-primary block translate-x-[0.05em]">THE FUTURE</span>
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-20">
           <p className="text-base md:text-xl text-app-text/40 max-w-lg text-center md:text-left font-medium leading-relaxed">
             Oman's first autonomous delivery infrastructure. <br className="hidden md:block" />
             Connecting the capital with high-velocity drone corridors.
           </p>
           <div className="h-px w-12 bg-app-text/10 hidden md:block" />
           <div className="flex items-center gap-6">
              <div className="text-center">
                 <p className="text-3xl font-display font-black text-app-text italic mb-1">0.14s</p>
                 <p className="text-[9px] font-mono uppercase tracking-widest text-app-text/20">Latency</p>
              </div>
              <div className="text-center">
                 <p className="text-3xl font-display font-black text-app-text italic mb-1">99.9%</p>
                 <p className="text-[9px] font-mono uppercase tracking-widest text-app-text/20">Precision</p>
              </div>
           </div>
        </div>

        {/* Search Console - Technical Redesign */}
        <div className="max-w-3xl mx-auto relative group">
           <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-transparent blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
           <div className="relative glass p-3 rounded-[20px] flex flex-col md:flex-row items-center gap-3 shadow-2xl">
             <div className="flex-1 w-full relative px-8 flex items-center gap-4 h-16 md:h-20 bg-app-bg border border-app-border rounded-[20px] group-focus-within:border-primary/50 transition-all">
               <MapPin className="text-primary w-6 h-6 flex-shrink-0" />
               <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="text-[8px] font-mono font-black uppercase text-app-text/20 tracking-widest mb-1 leading-none">Destination_Vector</span>
                  <input 
                    type="text" 
                    placeholder="ENTER LOCATION IN MUSCAT..." 
                    className="w-full bg-transparent outline-none font-display font-bold text-lg md:text-xl text-app-text placeholder:text-app-text/10 tracking-tight"
                  />
               </div>
             </div>
             <button className="w-full md:w-auto bg-primary text-white h-16 md:h-20 px-12 rounded-[20px] flex items-center justify-center gap-4 font-display font-black tracking-tighter text-xl md:text-2xl hover:bg-primary-dark transition-all group/btn shadow-xl shadow-primary/20 relative overflow-hidden">
               <span className="relative z-10">INITIALIZE</span>
               <Send className="w-6 h-6 relative z-10 group-hover/btn:translate-x-2 transition-transform" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
             </button>
           </div>
        </div>
      </motion.div>

      {/* Background Text Rail */}
      <div className="absolute bottom-12 left-12 hidden xl:block">
         <p className="text-[10px] font-mono font-black uppercase tracking-[0.6em] text-app-text/10 vertical-rl transform rotate-180">
           CIVIL AVIATION AUTHORITY CLEARANCE APPROVED // OMAN 2040 VISION
         </p>
      </div>
    </section>
  );
}
