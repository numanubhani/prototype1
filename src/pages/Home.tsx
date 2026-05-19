import { motion } from 'motion/react';
import HeroSection from '../components/home/HeroSection';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import FoodCard from '../components/restaurants/FoodCard';
import { RESTAURANTS } from '../data/restaurants';
import { Bike, Plane, ShoppingBag, Utensils, Zap, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const featuredRestaurants = RESTAURANTS.slice(0, 3);
  
  const categories = [
    { name: 'Omani', icon: '🇴🇲', count: 12 },
    { name: 'Burgers', icon: '🍔', count: 24 },
    { name: 'Seafood', icon: '🐟', count: 8 },
    { name: 'Grills', icon: '🍢', count: 15 },
    { name: 'Pizza', icon: '🍕', count: 18 },
    { name: 'Cafes', icon: '☕', count: 32 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <HeroSection />

      {/* Categories Horizontal Scroll */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8 md:mb-12">
            <div className="space-y-2">
              <span className="text-primary font-bold tracking-widest uppercase text-[10px]">What are you craving?</span>
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-app-text uppercase italic">Explore by <span className="text-primary italic">cuisine</span></h2>
            </div>
          </div>
          
          <div className="flex overflow-x-auto pb-8 gap-4 md:gap-6 custom-scrollbar -mx-6 px-6">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                to={`/category/${cat.name}`}
                className="flex-shrink-0"
              >
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-app-card rounded-[20px] p-6 md:p-8 flex flex-col items-center justify-center border border-app-border hover:border-primary/20 hover:bg-app-card transition-all w-[140px] md:w-[180px]">
                    <span className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">{cat.icon}</span>
                    <p className="font-bold text-base md:text-lg text-app-text">{cat.name}</p>
                    <p className="text-app-text/30 text-[10px] md:text-xs uppercase tracking-widest">{cat.count}+ places</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Restaurants Moved Up */}
      <section className="py-12 md:py-24 px-6 bg-app-text/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div className="space-y-2">
              <span className="text-primary font-bold tracking-widest uppercase text-[10px]">Oman's Favorites</span>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-app-text uppercase italic">Popular <span className="text-primary">right now</span></h2>
            </div>
            <Link to="/restaurants" className="flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all uppercase tracking-widest text-[10px]">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {featuredRestaurants.map((restaurant, i) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Dishes Section */}
      <section className="py-12 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-2">
              <span className="text-primary font-bold tracking-widest uppercase text-[10px]">Top Picks</span>
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-app-text uppercase italic">Trending <span className="text-primary">Dishes</span></h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESTAURANTS.flatMap(r => r.menu.slice(0, 1)).slice(0, 4).map((item, i) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-display font-black mb-4 text-app-text uppercase italic tracking-tighter">What Muscat is <span className="text-primary">saying</span></h2>
             <p className="text-app-text/30">Join thousands of happy customers in Oman.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ahmed Al-Balushi", text: "The drone delivery is absolute magic. Watching it land in my garden with my hot shawarma is the highlight of my day!", rating: 5 },
              { name: "Fatima Al-Riyami", text: "Fastest delivery service I've ever used in Oman. The app is clean and very easy to navigate.", rating: 5 },
              { name: "Sulaiman Juma", text: "Top-notch partner restaurants. I love that I can get authentic Omani food delivered with futuristic tech.", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-app-card p-10 rounded-[20px] border border-app-border hover:bg-app-card/50 transition-all">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
                </div>
                <p className="text-lg italic text-app-text/70 mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-app-text/10 rounded-full" />
                  <p className="font-bold text-app-text">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App CTA Section */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-[20px] md:rounded-[20px] p-8 md:p-24 overflow-hidden relative shadow-[0_0_60px_rgba(249,115,22,0.2)]">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
             <Plane size={600} className="text-white" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-8">
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tight italic">
                Get the <br /> DroneExpress App
              </h2>
              <p className="text-white/80 text-xl font-light">
                Track your drone in real-time AR, exclusive Omani restaurant deals, and lightning fast checkout.
              </p>
              <div className="flex flex-wrap gap-4">
                 <button className="bg-black text-white px-8 py-4 rounded-[20px] font-bold flex items-center gap-3 hover:bg-zinc-900 transition-all border border-white/10">
                   <div className="w-6 h-6 border-2 border-white rounded-md" />
                   App Store
                 </button>
                 <button className="bg-black text-white px-8 py-4 rounded-[20px] font-bold flex items-center gap-3 hover:bg-zinc-900 transition-all border border-white/10">
                   <div className="w-6 h-6 border-2 border-white rounded-full" />
                   Google Play
                 </button>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <motion.div 
                 initial={{ y: 100 }}
                 whileInView={{ y: 0 }}
                 viewport={{ once: true }}
                 className="bg-black rounded-t-[20px] h-[500px] border-x-8 border-t-8 border-white/5 p-4 -mb-24 shadow-2xl overflow-hidden"
              >
                  <div className="bg-[#050505] rounded-[20px] h-full p-6 flex flex-col gap-6 border border-white/10">
                     <div className="h-2 w-12 bg-white/10 rounded-full self-center" />
                     <div className="h-40 bg-white/5 rounded-[20px] animate-pulse" />
                     <div className="space-y-3 px-2">
                       <div className="h-2 w-full bg-white/10 rounded-full" />
                       <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                     </div>
                     <div className="mt-auto bg-primary h-12 rounded-[20px] flex items-center justify-center font-black italic text-xs tracking-widest text-white shadow-lg shadow-primary/20">
                        DRONE_EXPRESS
                     </div>
                  </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  );
}
