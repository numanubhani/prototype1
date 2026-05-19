import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Bike, Plane, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';
import FoodCard from '../components/restaurants/FoodCard';
import { useCart } from '../context/CartContext';
import { restaurantsApi, Restaurant } from '../lib/api';

export default function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');
  const { itemCount, totalPrice } = useCart();

  useEffect(() => {
    if (!id) return;
    restaurantsApi
      .get(id)
      .then(setRestaurant)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <motion.div className="pt-32 text-center text-app-text/40">Loading...</motion.div>;
  if (!restaurant) return <div className="pt-32 text-center">Restaurant not found</div>;

  const menuCategories = ['All', ...new Set(restaurant.menu.map((item) => item.category))];
  const filteredMenu =
    activeTab === 'All' ? restaurant.menu : restaurant.menu.filter((item) => item.category === activeTab);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="relative h-[400px] md:h-[500px]">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-app-bg/90 via-app-bg/40 to-transparent" />
        <div className="absolute top-8 left-8">
          <Link to="/restaurants" className="flex items-center gap-2 bg-black/40 backdrop-blur-xl text-white px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all border border-white/10">
            <ArrowLeft className="w-5 h-5" />
            BACK
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-10 pb-20">
        <div className="bg-app-card rounded-[20px] border border-app-border p-8 md:p-12 mb-12 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <h1 className="text-4xl md:text-6xl font-display font-black text-app-text uppercase italic tracking-tighter mb-4">{restaurant.name}</h1>
              <p className="text-app-text/50 mb-6 max-w-xl">{restaurant.description}</p>
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 bg-app-bg px-4 py-2 rounded-full border border-app-border text-sm font-bold">
                  <Star className="w-4 h-4 text-primary fill-primary" /> {restaurant.rating}
                </span>
                <span className="flex items-center gap-2 bg-app-bg px-4 py-2 rounded-full border border-app-border text-sm font-bold">
                  <Clock className="w-4 h-4 text-primary" /> {restaurant.deliveryTime}
                </span>
                <span className="flex items-center gap-2 bg-app-bg px-4 py-2 rounded-full border border-app-border text-sm font-bold">
                  {restaurant.deliveryType === 'Drone' ? <Plane className="w-4 h-4 text-primary" /> : <Bike className="w-4 h-4 text-primary" />}
                  {restaurant.deliveryType}
                </span>
              </div>
            </div>
            {itemCount > 0 && (
              <Link to="/cart" className="self-start flex items-center gap-3 bg-primary text-white px-8 py-5 rounded-[20px] font-black shadow-xl shadow-primary/20">
                <ShoppingCart className="w-6 h-6" />
                {itemCount} items · {totalPrice.toFixed(3)} OMR
              </Link>
            )}
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-6 mb-8">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-3 rounded-full font-bold text-sm whitespace-nowrap transition-all ${
                activeTab === cat ? 'bg-primary text-white' : 'bg-app-card border border-app-border text-app-text/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMenu.map((item) => (
            <FoodCard key={item.id} item={item} restaurantId={restaurant.id} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
