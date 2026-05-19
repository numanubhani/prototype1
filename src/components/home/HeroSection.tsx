import { motion } from 'motion/react';
import { Search, MapPin, Send, Plane, Bike } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 overflow-hidden px-4">
      {/* Background elements - Updated for Immersive UI */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full text-center relative z-10"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] mb-8 animate-pulse">
          <Plane className="w-4 h-4" />
          <span>Muscat: Drone Delivery Beta Live</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-9xl font-display font-black tracking-tighter leading-[0.85] mb-8 text-white">
          DELIVERING <br />
          <span className="text-primary italic">THE FUTURE</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-white/40 max-w-2xl mx-auto mb-10 md:mb-12 font-light leading-relaxed px-4">
          The fastest food delivery in Oman. Breaking boundaries with autonomous flight and smart logistics.
        </p>

        {/* Search Bar - Updated for Immersive UI */}
        <div className="max-w-2xl mx-auto glass p-2 rounded-[2rem] sm:rounded-[2.5rem] flex flex-col sm:flex-row items-center gap-2 shadow-2xl glow-orange">
          <div className="flex-1 w-full relative px-6 flex items-center gap-3 h-14 md:h-16 bg-white/5 rounded-[1.5rem] md:rounded-[2rem]">
            <MapPin className="text-primary w-5 h-5 flex-shrink-0" />
            <input 
              type="text" 
              placeholder="Your location in Muscat..." 
              className="w-full bg-transparent outline-none font-medium h-full text-white placeholder:text-white/20 text-sm md:text-base"
            />
          </div>
          <button className="w-full sm:w-auto bg-primary text-white h-14 md:h-16 px-10 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center gap-3 font-black tracking-tighter text-lg md:text-xl hover:bg-primary-dark transition-all group shadow-xl shadow-primary/20">
            EXPLORE
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 md:mt-20 flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          <div className="space-y-1 md:space-y-2">
            <p className="text-3xl md:text-4xl font-display font-black text-white italic">12 MIN</p>
            <p className="text-white/20 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Drone Time</p>
          </div>
          <div className="space-y-1 md:space-y-2">
            <p className="text-3xl md:text-4xl font-display font-black text-white italic">50+</p>
            <p className="text-white/20 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Omani Partners</p>
          </div>
          <div className="space-y-1 md:space-y-2">
            <p className="text-3xl md:text-4xl font-display font-black text-white italic">BETA</p>
            <p className="text-white/20 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em]">Phase 02 Live</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Drone Graphics */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -right-40 hidden xl:block opacity-20 pointer-events-none"
      >
        <Plane size={400} strokeWidth={0.5} className="text-primary" />
      </motion.div>
    </section>
  );
}
