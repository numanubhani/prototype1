import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, Clock, Bike, Plane } from 'lucide-react';
import { Restaurant } from '../../data/restaurants';

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
  key?: string | number;
}

export default function RestaurantCard({ restaurant, index }: RestaurantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link 
        to={`/restaurant/${restaurant.id}`}
        className="group block bg-white/5 rounded-[2rem] overflow-hidden border border-white/5 transition-all hover:bg-white/10 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {restaurant.deliveryType === 'Drone' || restaurant.deliveryType === 'Both' ? (
              <div className="bg-black/60 backdrop-blur-md text-white p-2 rounded-xl flex items-center gap-2 border border-white/10">
                <Plane className="w-4 h-4 text-primary" />
              </div>
            ) : null}
            {restaurant.deliveryType === 'Bike' || restaurant.deliveryType === 'Both' ? (
              <div className="bg-white/10 backdrop-blur-md text-white p-2 rounded-xl flex items-center gap-2 border border-white/10">
                <Bike className="w-4 h-4 text-primary" />
              </div>
            ) : null}
          </div>
          
          <div className="absolute top-4 right-4 bg-black/60 text-white backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/10 font-bold text-sm">
            <Star className="w-4 h-4 fill-primary text-primary" />
            {restaurant.rating}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
             <div className="flex items-center gap-2 text-white/90 font-medium text-sm">
                <Clock className="w-4 h-4 text-primary" />
                {restaurant.deliveryTime}
             </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-display font-black tracking-tighter text-white uppercase italic">{restaurant.name}</h3>
          </div>
          <div className="flex flex-wrap gap-2 opacity-60">
            {restaurant.categories.map((cat) => (
              <span key={cat} className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{cat}</span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
