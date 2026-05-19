import { motion } from 'motion/react';
import { RESTAURANTS } from '../data/restaurants';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import { Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function Restaurants() {
  const [search, setSearch] = useState('');
  
  const filtered = RESTAURANTS.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.categories.some(c => c.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight mb-4 text-white uppercase italic">Discover <span className="text-primary">Muscat</span></h1>
          <p className="text-white/40 text-lg font-light">Order from the best restaurants in Oman with futuristic delivery.</p>
        </header>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-16">
          <div className="flex-1 relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for restaurants or cuisines..."
              className="w-full bg-white/5 border border-white/5 rounded-[2rem] py-5 pl-14 pr-6 focus:outline-none focus:border-primary/50 transition-all shadow-sm text-white placeholder:text-white/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 px-8 py-5 rounded-[2rem] font-bold text-white hover:bg-white/10 transition-all shadow-sm">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            FILTER
          </button>
          <div className="hidden md:flex items-center gap-3 bg-primary/10 text-primary px-8 py-5 rounded-[2rem] font-bold border border-primary/20">
            <MapPin className="w-5 h-5" />
            MUSCAT, OM
          </div>
        </div>

        {/* Restaurant Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((r, i) => (
              <RestaurantCard key={r.id} restaurant={r} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white/5 rounded-[4rem] border border-white/5">
            <p className="text-2xl font-display font-black text-white/20 uppercase tracking-widest">No restaurants found</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
