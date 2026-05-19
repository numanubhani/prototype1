import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { RESTAURANTS } from '../data/restaurants';
import { Star, Clock, Bike, Plane, ArrowLeft, ShoppingCart, Info, Search } from 'lucide-react';
import { useState } from 'react';
import FoodCard from '../components/restaurants/FoodCard';
import { useCart } from '../context/CartContext';

export default function RestaurantDetails() {
  const { id } = useParams();
  const restaurant = RESTAURANTS.find(r => r.id === id);
  const { itemCount, totalPrice } = useCart();
  const [activeTab, setActiveTab] = useState('All');

  if (!restaurant) return <div>Restaurant not found</div>;

  const menuCategories = ['All', ...new Set(restaurant.menu.map(item => item.category))];
  const filteredMenu = activeTab === 'All' 
    ? restaurant.menu 
    : restaurant.menu.filter(item => item.category === activeTab);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero Section */}
      <div className="relative h-[400px] md:h-[500px]">
        <img 
          src={restaurant.image} 
          alt={restaurant.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
        
        <div className="absolute top-8 left-8">
           <Link to="/restaurants" className="flex items-center gap-2 bg-black/40 backdrop-blur-xl text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-dark transition-all border border-white/10">
             <ArrowLeft className="w-5 h-5" />
             BACK
           </Link>
        </div>

        <div className="absolute bottom-12 left-0 right-0 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                {restaurant.categories.map(cat => (
                  <span key={cat} className="bg-primary px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">{cat}</span>
                ))}
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter uppercase italic">{restaurant.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80 font-medium">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-primary text-primary" />
                  <span className="text-white font-bold">{restaurant.rating}</span>
                  <span>(200+ reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <button className="flex items-center gap-2 underline underline-offset-4 decoration-primary">
                  <Info className="w-5 h-5" />
                  Info & Safety
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
               {restaurant.deliveryType === 'Drone' || restaurant.deliveryType === 'Both' ? (
                 <div className="bg-primary text-white p-4 rounded-[2rem] flex flex-col items-center gap-2 shadow-xl">
                   <Plane className="w-8 h-8" />
                   <span className="text-[10px] font-black uppercase">Drone Ready</span>
                 </div>
               ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Navigation */}
      <div className="sticky top-[72px] z-30 glass border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-hide gap-12 text-white">
          <div className="flex items-center gap-8 whitespace-nowrap">
             {menuCategories.map(cat => (
               <button 
                 key={cat}
                 onClick={() => setActiveTab(cat)}
                 className={`text-lg font-bold pb-1 transition-all relative ${activeTab === cat ? 'text-primary' : 'text-white/40 hover:text-white'}`}
               >
                 {cat}
                 {activeTab === cat && <motion.div layoutId="activeCat" className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />}
               </button>
             ))}
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 min-w-[200px]">
            <Search className="w-4 h-4 text-white/20" />
            <input type="text" placeholder="Search menu..." className="bg-transparent text-sm w-full outline-none text-white placeholder:text-white/20" />
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="py-20 px-6 bg-dark">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredMenu.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Final Animated Sticky CTA for Mobile/Desktop */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-6">
        <Link to="/cart">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary text-white rounded-[1.5rem] p-4 shadow-2xl flex items-center justify-between group overflow-hidden relative shadow-primary/20"
          >
            <div className="absolute inset-0 bg-primary-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            
            <div className="relative z-10 flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-xl group-hover:bg-white/10 transition-colors">
                <ShoppingCart className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black uppercase opacity-70 tracking-widest leading-none mb-1">GO TO CART</p>
                <p className="text-lg font-display font-black tracking-tighter leading-none">{itemCount} ITEMS</p>
              </div>
            </div>

            <div className="relative z-10 text-right">
              <p className="text-[9px] font-black uppercase opacity-70 tracking-widest leading-none mb-1">TOTAL</p>
              <p className="text-xl font-display font-black leading-none">{totalPrice.toFixed(3)} OMR</p>
            </div>
          </motion.button>
        </Link>
      </div>

    </motion.div>
  );
}
