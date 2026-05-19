import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Clock, Bike, Plane } from 'lucide-react';
import { Restaurant } from '../../lib/api';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index?: number;
  key?: string | number;
}

export default function RestaurantCard({ restaurant, index = 0 }: RestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link 
        to={`/restaurant/${restaurant.id}`}
        className="group block relative bg-app-card rounded-[20px] overflow-hidden border border-app-border transition-all hover:bg-app-card/60 hover:border-primary/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.05)]"
      >
        <div className="relative aspect-[16/11] overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="w-full h-full object-cover grayscale-[0.2] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
          />
          
          {/* Overlay Grid Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          
          {/* Badges - Technical Style */}
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            {(restaurant.deliveryType === 'Drone' || restaurant.deliveryType === 'Both') && (
              <div className="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10 shadow-2xl">
                <Plane className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase">Airborne</span>
              </div>
            )}
            {(restaurant.deliveryType === 'Bike' || restaurant.deliveryType === 'Both') && (
              <div className="bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/10 shadow-2xl">
                <Bike className="w-3.5 h-3.5 text-primary" />
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase">Surface</span>
              </div>
            )}
          </div>
          
          <div className="absolute top-6 right-6 bg-primary text-white border border-primary/50 px-4 py-2 rounded-[20px] flex items-center gap-2 shadow-2xl font-display font-black italic tracking-tighter">
            <Star className="w-4 h-4 fill-white" />
            {restaurant.rating}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-white">
                   <div className="p-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30">
                      <Clock className="w-4 h-4 text-primary" />
                   </div>
                   <div>
                      <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/40 mb-0.5">Est. Arrival</p>
                      <p className="text-sm font-bold tracking-tight">{restaurant.deliveryTime}</p>
                   </div>
                </div>
                <div className="h-6 w-[1px] bg-white/10" />
                <div className="text-right">
                   <p className="text-[8px] font-mono uppercase tracking-[0.2em] text-white/40 mb-0.5">Fleet Status</p>
                   <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Available</p>
                </div>
             </div>
          </div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-display font-black tracking-tighter text-app-text uppercase italic mb-4 group-hover:text-primary transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {restaurant.categories.map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                 <div className="w-1 h-1 rounded-full bg-primary" />
                 <span className="text-[10px] font-mono font-bold text-app-text/30 uppercase tracking-[0.1em]">{cat}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Subtle Bottom Bar */}
        <div className="h-1 w-full bg-white/5 group-hover:bg-primary/20 transition-all origin-left scale-x-0 group-hover:scale-x-100 duration-500" />
      </Link>
    </motion.div>
  );
}
