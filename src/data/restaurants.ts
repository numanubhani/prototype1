export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  deliveryType: 'Bike' | 'Drone' | 'Both';
  categories: string[];
  image: string;
  description: string;
  menu: FoodItem[];
}

export const RESTAURANTS: Restaurant[] = [
  {
    id: 'turkish-house',
    name: 'Turkish House Oman',
    rating: 4.8,
    deliveryTime: '20-30 min',
    deliveryType: 'Both',
    categories: ['Turkish', 'Grill', 'Seafood'],
    image: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=800',
    description: 'Authentic Turkish flavors in the heart of Muscat.',
    menu: [
      { id: 'th1', name: 'Mixed Grill', description: 'Assorted lamb and chicken kebabs served with rice.', price: 6.5, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400', category: 'Grills' },
      { id: 'th2', name: 'Hummus', description: 'Creamy chickpea dip with olive oil and fresh pita.', price: 1.8, image: 'https://images.unsplash.com/photo-1577906030558-841fbd6d7692?auto=format&fit=crop&q=80&w=400', category: 'Appetizers' },
      { id: 'th3', name: 'Lavas Bread', description: 'Famous Turkish puffed bread fresh from the oven.', price: 0.5, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&q=80&w=400', category: 'Sides' },
    ]
  },
  {
    id: 'bait-al-luban',
    name: 'Bait Al Luban',
    rating: 4.9,
    deliveryTime: '35-45 min',
    deliveryType: 'Drone',
    categories: ['Omani', 'Traditional', 'Seafood'],
    image: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?auto=format&fit=crop&q=80&w=800',
    description: 'Experience true Omani hospitality and heritage cuisine.',
    menu: [
      { id: 'bal1', name: 'Omani Shuwa', description: 'Traditional slow-cooked marinated lamb, Omani style.', price: 8.5, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=400', category: 'Main Course' },
      { id: 'bal2', name: 'Paplou', description: 'Zesty Omani seafood soup with lemon and garlic.', price: 3.2, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400', category: 'Soups' },
    ]
  },
  {
    id: 'rozna',
    name: 'Rozna Restaurant',
    rating: 4.7,
    deliveryTime: '25-35 min',
    deliveryType: 'Bike',
    categories: ['Arabic', 'Local', 'Mezza'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    description: 'A cultural architectural gem serving fine Arabic cuisine.',
    menu: [
      { id: 'rz1', name: 'Harees', description: 'Savory pearl wheat and meat porridge.', price: 4.5, image: 'https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?auto=format&fit=crop&q=80&w=400', category: 'Traditional' },
    ]
  },
  {
    id: 'automatic',
    name: 'Automatic Restaurant',
    rating: 4.5,
    deliveryTime: '15-25 min',
    deliveryType: 'Bike',
    categories: ['Lebanese', 'Fast Food', 'Healthy'],
    image: 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=800',
    description: 'Quick service, amazing Lebanese flavors.',
    menu: [
      { id: 'at1', name: 'Mixed Shawarma Platter', description: 'Chicken and beef shawarma with garlic sauce.', price: 3.8, image: 'https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&q=80&w=400', category: 'Platters' },
      { id: 'at2', name: 'Falafel Sandwich', description: 'Freshly fried falafel with tahini and pickles.', price: 0.8, image: 'https://images.unsplash.com/photo-1593001874117-c99c800e3eb7?auto=format&fit=crop&q=80&w=400', category: 'Sandwiches' },
    ]
  },
  {
    id: 'begums',
    name: 'Begum’s Restaurant',
    rating: 4.6,
    deliveryTime: '30-40 min',
    deliveryType: 'Drone',
    categories: ['Indian', 'Mughlai', 'Biryani'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800',
    description: 'Regal Indian flavors and the house of finest biryanis.',
    menu: [
      { id: 'bg1', name: 'Chicken Dum Biryani', description: 'Aromatic basmati rice cooked with tender chicken.', price: 4.2, image: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?auto=format&fit=crop&q=80&w=400', category: 'Rice' },
      { id: 'bg2', name: 'Butter Chicken', description: 'Creamy tomato-based gravy with grilled chicken.', price: 3.5, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&q=80&w=400', category: 'Curry' },
    ]
  },
  {
    id: 'slider-station',
    name: 'Slider Station Oman',
    rating: 4.8,
    deliveryTime: '20-30 min',
    deliveryType: 'Drone',
    categories: ['Burgers', 'Fusion', 'Modern'],
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
    description: 'The world’s first conveyor belt slider concept.',
    menu: [
      { id: 'ss1', name: 'Dangerous Slider', description: 'Double beef patty with spicy sauce and pickles.', price: 2.5, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400', category: 'Sliders' },
      { id: 'ss2', name: 'Truffle Fries', description: 'Crispy fries with parmesan and truffle oil.', price: 1.8, image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&q=80&w=400', category: 'Starters' },
    ]
  }
];
