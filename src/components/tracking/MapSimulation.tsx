import { motion } from 'motion/react';
import { Plane, Bike, MapPin, User } from 'lucide-react';

interface MapSimulationProps {
  deliveryType: 'Bike' | 'Drone';
}

export default function MapSimulation({ deliveryType }: MapSimulationProps) {
  return (
    <div className="h-full w-full bg-black relative overflow-hidden">
      {/* City Grid Background */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Traffic Pulsing Paths */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 750" preserveAspectRatio="xMidYMid slice">
        {/* Main Roadway 1 */}
        <motion.path
          d="M0 350 L1000 350"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          fill="none"
        />
        <motion.circle
          r="3"
          fill="#f97316"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            cx: ["0%", "100%"],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          cy="350"
        />

        {/* Main Roadway 2 */}
        <motion.path
          d="M500 0 L500 750"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          fill="none"
        />
        <motion.circle
          r="3"
          fill="#f97316"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            cy: ["0%", "100%"],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
          cx="500"
        />

        {/* Delivery Path */}
        <motion.path
          id="deliveryPath"
          d="M200 200 L400 300 L600 250 L800 500 L700 550"
          stroke="#f97316"
          strokeWidth="4"
          fill="none"
          strokeDasharray="12 12"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="opacity-40"
        />
        
        {/* Animated Particles on Path */}
        <motion.circle
          r="6"
          fill="#f97316"
          className="shadow-[0_0_20px_#f97316]"
        >
          <animateMotion
            dur="6s"
            repeatCount="indefinite"
            path="M200 200 L400 300 L600 250 L800 500 L700 550"
          />
        </motion.circle>
      </svg>

      {/* Origin Point: Restaurant */}
      <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="bg-white/10 backdrop-blur-md p-2 md:p-3 rounded-2xl border border-white/20 mb-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[8px] md:text-[10px] font-black text-primary">TH</div>
        </div>
        <span className="text-[7px] md:text-[9px] font-bold text-white/40 uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded whitespace-nowrap">Turkish House</span>
      </div>

      {/* Destination Point: User */}
      <div className="absolute top-[75%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <div className="relative">
          <div className="absolute -inset-3 md:-inset-4 bg-primary/20 rounded-full animate-ping" />
          <div className="relative bg-primary text-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl shadow-primary/40">
            <MapPin className="w-6 h-6 md:w-8 md:h-8" />
          </div>
        </div>
        <span className="text-[8px] md:text-[10px] font-display font-black text-white uppercase italic tracking-tighter mt-2 md:mt-3 bg-black/60 px-2 md:px-3 py-1 rounded-full border border-white/10 shadow-2xl">HOME</span>
      </div>

      {/* Active Courier Indicator */}
      <motion.div
        className="absolute z-30"
        initial={{ left: "20%", top: "20%" }}
        animate={{ 
          left: ["20%", "40%", "60%", "80%", "70%"],
          top: ["20%", "30%", "25%", "50%", "55%"],
          scale: [0.8, 1.1, 0.9, 1.1, 1],
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear",
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
      >
        <div className="bg-black/60 backdrop-blur-xl p-3 md:p-4 rounded-2xl md:rounded-3xl border border-primary/30 flex flex-col items-center shadow-2xl glow-orange">
          {deliveryType === 'Drone' ? (
            <Plane className="text-primary w-8 h-8 md:w-10 md:h-10 animate-pulse" />
          ) : (
            <Bike className="text-primary w-8 h-8 md:w-10 md:h-10" />
          )}
          <div className="mt-2 text-[7px] md:text-[8px] font-black text-white px-2 py-0.5 bg-primary rounded-full uppercase tracking-tighter whitespace-nowrap">DX-702</div>
          
          {/* Signal Indicator */}
          <div className="absolute -top-1 -right-1 flex gap-0.5">
            {[1,2,3].map(i => (
              <motion.div 
                key={i}
                animate={{ height: [3, 8, 3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-0.5 bg-primary rounded-full"
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* HUD Overlay Elements */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row justify-between items-end gap-3 pointer-events-none">
        <div className="bg-black/80 backdrop-blur-xl p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10 flex gap-4 md:gap-6 items-center w-full sm:w-auto overflow-x-auto">
          <div className="space-y-0.5 md:space-y-1">
             <p className="text-[8px] md:text-[9px] text-white/30 font-bold uppercase tracking-widest whitespace-nowrap">Altitude</p>
             <p className="text-xs md:text-sm font-display font-black text-white italic whitespace-nowrap">{deliveryType === 'Drone' ? '45m' : 'Sea Level'}</p>
          </div>
          <div className="h-4 md:h-6 w-[1px] bg-white/10 flex-shrink-0" />
          <div className="space-y-0.5 md:space-y-1">
             <p className="text-[8px] md:text-[9px] text-white/30 font-bold uppercase tracking-widest whitespace-nowrap">Velocity</p>
             <p className="text-xs md:text-sm font-display font-black text-white italic whitespace-nowrap">{deliveryType === 'Drone' ? '42 km/h' : '15 km/h'}</p>
          </div>
          <div className="h-4 md:h-6 w-[1px] bg-white/10 flex-shrink-0" />
          <div className="space-y-0.5 md:space-y-1 text-primary">
             <p className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest opacity-60 whitespace-nowrap">Batt / Fuel</p>
             <p className="text-xs md:text-sm font-display font-black italic whitespace-nowrap">84%</p>
          </div>
        </div>

        <div className="bg-primary/20 backdrop-blur-xl p-3 md:p-4 rounded-xl md:rounded-2xl border border-primary/30 flex items-center gap-2 md:gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-ping" />
          <p className="text-[8px] md:text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">Telemetry Active</p>
        </div>
      </div>

      {/* Navigation Scanning Ray */}
      <motion.div 
        animate={{ left: ["-20%", "120%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 bottom-0 w-[60px] md:w-[100px] bg-gradient-to-r from-transparent via-primary/5 to-transparent skew-x-12 pointer-events-none"
      />
    </div>
  );
}
