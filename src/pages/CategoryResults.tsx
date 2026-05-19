import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import FoodCard from '../components/restaurants/FoodCard';
import { ArrowLeft, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { restaurantsApi, Restaurant, FoodItem } from '../lib/api';

export default function CategoryResults() {
  const { categoryId } = useParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    restaurantsApi.list({ category: categoryId }).then(setRestaurants).catch(console.error);
  }, [categoryId]);

  const results = useMemo(() => {
    const items: { item: FoodItem; restaurantName: string; restaurantId: string }[] = [];
    restaurants.forEach((restaurant) => {
      restaurant.menu.forEach((item) => {
        if (
          item.category.toLowerCase().includes(categoryId?.toLowerCase() || '') ||
          restaurant.categories.some((cat) => cat.toLowerCase() === categoryId?.toLowerCase())
        ) {
          items.push({ item, restaurantName: restaurant.name, restaurantId: restaurant.id });
        }
      });
    });
    return items;
  }, [categoryId, restaurants]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-6 bg-app-bg min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-6">
            <Link to="/" className="p-3 bg-app-card rounded-[20px] hover:bg-app-card/80 transition-all border border-app-border">
              <ArrowLeft className="w-6 h-6 text-primary" />
            </Link>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase text-app-text/30 tracking-[0.2em]">Cuisine Category</p>
              <h1 className="text-4xl md:text-5xl font-display font-black text-app-text uppercase italic tracking-tighter">
                {categoryId} <span className="text-primary italic">Fusion</span>
              </h1>
            </div>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {results.map((res, i) => (
              <motion.div
                key={`${res.restaurantId}-${res.item.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <FoodCard item={res.item} restaurantId={res.restaurantId} />
                <div className="mt-2 flex justify-between items-center px-4">
                  <p className="text-[10px] font-bold text-app-text/30 uppercase tracking-widest">Available at</p>
                  <Link to={`/restaurant/${res.restaurantId}`} className="text-[10px] font-black text-primary uppercase italic hover:underline">
                    {res.restaurantName}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-app-card rounded-[20px] border border-dashed border-app-border">
            <h2 className="text-2xl font-display font-black text-app-text/20 uppercase italic">No items found in this sector.</h2>
            <Link to="/" className="mt-6 inline-block text-primary font-bold hover:underline">Back to Hangar</Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
