import { motion } from 'motion/react';
import HeroSection from '../components/home/HeroSection';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import { RESTAURANTS } from '../data/restaurants';
import { Bike, Plane, ShoppingBag, Utensils, Zap, Star } from 'lucide-react';
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

      {/* Categories */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div className="space-y-4">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Categories</span>
              <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white uppercase italic">Explore by <span className="text-primary italic">cuisine</span></h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((cat, i) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/5 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center border border-white/5 hover:border-primary/20 hover:bg-white/10 hover:shadow-xl transition-all h-full">
                  <span className="text-3xl md:text-4xl mb-3 md:mb-4 group-hover:scale-125 transition-transform duration-500">{cat.icon}</span>
                  <p className="font-bold text-base md:text-lg text-white">{cat.name}</p>
                  <p className="text-white/30 text-xs md:text-sm">{cat.count}+ places</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Section: Delivery Options */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/10 blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <span className="text-primary font-bold tracking-widest uppercase">The Future is Here</span>
            <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-tight text-white">
              One order. <br />
              <span className="text-primary italic">Two Ways</span> to reach you.
            </h2>
            <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">
              DroneExpress is Oman's pioneer in futuristic logistics. We offer standard bike deliveries for heavy loads and high-speed drone deliveries for your quickest cravings.
            </p>
            
            <div className="space-y-6 pt-4">
              <div className="flex gap-6 p-6 bg-white/5 rounded-[2rem] border border-white/10 hover:border-primary/50 transition-colors glow-orange">
                <div className="bg-primary p-4 rounded-2xl flex-shrink-0 h-fit">
                  <Plane className="text-white w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-2 text-white">Drone Delivery</h4>
                  <p className="text-white/40">Autonomous flight, zero traffic, delivered in under 15 mins. Perfect for individual meals and coffee.</p>
                </div>
              </div>
              
              <div className="flex gap-6 p-6 bg-white/5 rounded-[2rem] border border-white/10 hover:border-primary/50 transition-colors">
                <div className="bg-white/10 p-4 rounded-2xl flex-shrink-0 h-fit">
                  <Bike className="text-white w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-2 text-white">Bike Courier</h4>
                  <p className="text-white/40">Reliable, professional couriers for larger family platters and group orders across Muscat.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 rounded-[3rem] overflow-hidden border-4 border-white/10 aspect-square shadow-2xl shadow-primary/20"
            >
               <img 
                src="https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800" 
                alt="Delivery Drone" 
                className="w-full h-full object-cover opacity-80"
              />
            </motion.div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary rounded-full flex items-center justify-center p-8 text-white font-bold text-center leading-tight rotate-12 z-20 shadow-xl shadow-primary/40">
              <p>SPEED <br /> DEFINED</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Restaurants */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="space-y-4">
              <span className="text-primary font-bold tracking-widest uppercase text-sm">Oman's Favorites</span>
              <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter text-white uppercase italic">Popular <span className="text-primary">right now</span></h2>
            </div>
            <Link to="/restaurants" className="flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all uppercase tracking-widest text-sm">
              View All Restaurants <ShoppingBag className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredRestaurants.map((restaurant, i) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
             <h2 className="text-4xl font-display font-black mb-4 text-white uppercase italic tracking-tighter">What Muscat is <span className="text-primary">saying</span></h2>
             <p className="text-white/30">Join thousands of happy customers in Oman.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ahmed Al-Balushi", text: "The drone delivery is absolute magic. Watching it land in my garden with my hot shawarma is the highlight of my day!", rating: 5 },
              { name: "Fatima Al-Riyami", text: "Fastest delivery service I've ever used in Oman. The app is clean and very easy to navigate.", rating: 5 },
              { name: "Sulaiman Juma", text: "Top-notch partner restaurants. I love that I can get authentic Omani food delivered with futuristic tech.", rating: 5 },
            ].map((t, i) => (
              <div key={i} className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-all">
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
                </div>
                <p className="text-lg italic text-white/70 mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full" />
                  <p className="font-bold text-white">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App CTA Section */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-24 overflow-hidden relative shadow-[0_0_60px_rgba(249,115,22,0.2)]">
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
                 <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-zinc-900 transition-all border border-white/10">
                   <div className="w-6 h-6 border-2 border-white rounded-md" />
                   App Store
                 </button>
                 <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-zinc-900 transition-all border border-white/10">
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
                 className="bg-black rounded-t-[3rem] h-[500px] border-x-8 border-t-8 border-white/5 p-4 -mb-24 shadow-2xl overflow-hidden"
              >
                  <div className="bg-[#050505] rounded-[2rem] h-full p-6 flex flex-col gap-6 border border-white/10">
                     <div className="h-2 w-12 bg-white/10 rounded-full self-center" />
                     <div className="h-40 bg-white/5 rounded-2xl animate-pulse" />
                     <div className="space-y-3 px-2">
                       <div className="h-2 w-full bg-white/10 rounded-full" />
                       <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                     </div>
                     <div className="mt-auto bg-primary h-12 rounded-xl flex items-center justify-center font-black italic text-xs tracking-widest text-white shadow-lg shadow-primary/20">
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
