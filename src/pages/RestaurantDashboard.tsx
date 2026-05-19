import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  Menu as MenuIcon, 
  Plus, 
  Settings,
  Flame,
  ArrowUpRight,
  Plane,
  Bike,
  CheckCircle2,
  X,
  Upload,
  Image as ImageIcon,
  Save,
  Trash2
} from 'lucide-react';

export default function RestaurantDashboard() {
  const [showSettings, setShowSettings] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400'
  });

  const activeOrders = [
    { id: '#DX-702', customer: 'Ahmed Al-B.', items: 'Mixed Grill, Salad', type: 'Drone', status: 'Cooking' },
    { id: '#DX-705', customer: 'Sarah M.', items: 'Hummus, Pita', type: 'Bike', status: 'Ready' },
    { id: '#DX-710', customer: 'Zaid K.', items: 'Mansaf Platter', type: 'Drone', status: 'Pending' },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItemToMenu = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new item:', newItem);
    setShowAddMenu(false);
    // In a real app, this would be an API call
    setNewItem({
      name: '',
      price: '',
      description: '',
      category: 'Main Course',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 bg-app-bg"
    >
      <div className="max-w-7xl mx-auto">
        {/* Dash Cover Image Preview */}
        <div className="relative h-64 md:h-80 w-full rounded-[20px] overflow-hidden mb-12 border border-app-border group">
           <img src={coverImage} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
           <div className="absolute bottom-8 left-10">
              <p className="text-[10px] font-mono font-black uppercase text-white/60 tracking-[0.4em] mb-2">Live_Status_Visual</p>
              <h2 className="text-3xl font-display font-black text-white italic uppercase tracking-tighter">Kitchen Brand Cover</h2>
           </div>
        </div>

        {/* Dashboard Header - Enhanced Hierarchy */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <span className="bg-primary text-white px-4 py-1 rounded-full text-[9px] font-mono font-black uppercase tracking-[0.3em] shadow-lg shadow-primary/20">Alpha_Node_Online</span>
               <div className="h-4 w-px bg-app-text/10" />
               <span className="text-app-text/20 text-[9px] font-mono font-black uppercase tracking-widest leading-none italic">Secured by Muscat Unified Fleet Control</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black text-app-text italic uppercase tracking-tighter leading-[0.85]">Kitchen <br /> <span className="text-primary italic">Controller_v4</span></h1>
          </div>
          
          <div className="flex gap-6 w-full md:w-auto">
             <button 
              onClick={() => setShowSettings(true)}
              className="flex-1 md:flex-none p-6 bg-app-card text-app-text rounded-[20px] border border-app-border hover:border-primary/50 transition-all shadow-xl"
             >
                <Settings className="w-8 h-8" />
             </button>
             <button 
              onClick={() => setShowAddMenu(true)}
              className="flex-[2] md:flex-none bg-primary text-white px-12 py-6 rounded-[20px] font-display font-black uppercase tracking-tighter text-xl italic flex items-center justify-center gap-4 shadow-2xl shadow-primary/30 hover:bg-primary-dark transition-all group"
             >
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" /> 
                <span className="translate-y-px">Append_Menu</span>
             </button>
          </div>
        </div>

        {/* Quick Stats Grid - Improved Rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
           {[
             { label: 'Cycle Revenue', value: '1,420.50', trend: '+12.4%', icon: BarChart3, unit: 'OMR' },
             { label: 'Active Missions', value: '12', trend: 'Optimal', icon: ShoppingBag, unit: 'UNITS' },
             { label: 'Response Latency', value: '14', trend: '-2m', icon: Clock, unit: 'MIN' },
             { label: 'Flight Status', value: 'ACTIVE', trend: 'SAFE', icon: Plane, unit: 'CAA' }
           ].map((stat, i) => (
             <div key={i} className="bg-app-card rounded-[20px] p-10 border border-app-border flex flex-col justify-between hover:bg-app-card/80 transition-all group relative overflow-hidden shadow-sm">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/5 rounded-full blur-[80px] group-hover:bg-primary/10 transition-all" />
                <div className="flex justify-between items-start mb-12 relative z-10">
                   <div className="p-4 rounded-[20px] bg-app-bg border border-app-border text-primary shadow-inner rotate-[-3deg] group-hover:rotate-0 transition-transform">
                      <stat.icon className="w-8 h-8" />
                   </div>
                   <span className="bg-primary/10 text-primary text-[9px] font-mono font-black px-3 py-1.5 rounded-full tracking-[0.2em]">{stat.trend}</span>
                </div>
                <div className="relative z-10">
                   <p className="text-app-text/20 text-[9px] font-mono font-black uppercase tracking-[0.3em] mb-2 leading-none italic">{stat.label}</p>
                   <h3 className="text-5xl font-display font-black text-app-text italic tracking-tighter mb-1">{stat.value}</h3>
                   <p className="text-[10px] font-mono font-bold text-primary/40 uppercase tracking-widest">{stat.unit}_RECORDED</p>
                </div>
             </div>
           ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           {/* Incoming Orders Feed */}
           <div className="lg:col-span-2 space-y-10">
              <div className="flex justify-between items-center mb-2">
                 <h2 className="text-2xl font-display font-black text-app-text uppercase italic tracking-tighter">Mission <span className="text-primary text-app-text/40">Log</span></h2>
                 <div className="h-[1px] flex-1 mx-8 bg-app-border hidden md:block" />
                 <div className="flex gap-2">
                    <button className="px-5 py-2 bg-primary text-white rounded-full text-[10px] font-black italic uppercase tracking-widest">Active</button>
                    <button className="px-5 py-2 bg-app-card text-app-text/40 rounded-full text-[10px] font-black italic uppercase tracking-widest">Queue</button>
                 </div>
              </div>

              <div className="space-y-6">
                 {activeOrders.map((order) => (
                    <div key={order.id} className="bg-app-card rounded-[3rem] p-8 border border-app-border flex flex-col md:flex-row justify-between items-center gap-8 group hover:border-primary/50 transition-all relative overflow-hidden shadow-sm">
                       <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-all pointer-events-none" />
                       <div className="flex items-center gap-8 relative z-10">
                          <div className={`w-20 h-20 rounded-[20px] flex items-center justify-center shadow-2xl ${order.type === 'Drone' ? 'bg-primary/20 text-primary animate-pulse' : 'bg-app-card border border-app-border text-app-text/60'}`}>
                             {order.type === 'Drone' ? <Plane className="w-10 h-10" /> : <Bike className="w-10 h-10" />}
                          </div>
                          <div>
                             <div className="flex items-center gap-4 mb-2">
                                <span className="text-primary font-display font-black text-2xl italic tracking-tighter">{order.id}</span>
                                <div className="h-4 w-[1px] bg-app-border" />
                                <span className="text-app-text font-bold uppercase tracking-widest text-xs">{order.customer}</span>
                             </div>
                             <p className="text-app-text/40 text-xs italic font-medium">{order.items}</p>
                          </div>
                       </div>
                       
                       <div className="flex items-center gap-8 relative z-10 w-full md:w-auto">
                          <div className="text-right flex-1 md:flex-none">
                             <p className="text-[10px] text-app-text/30 font-black uppercase tracking-widest mb-2">Operational Status</p>
                             <div className="flex items-center gap-3">
                                <span className={`w-2 h-2 rounded-full ${order.status === 'Ready' ? 'bg-green-500 animate-pulse' : 'bg-orange-500 animate-pulse'}`} />
                                <span className="text-app-text font-display font-black uppercase italic text-lg tracking-tighter">{order.status}</span>
                             </div>
                          </div>
                          <button className="bg-app-card hover:bg-primary text-app-text hover:text-white p-5 rounded-[20px] border border-app-border transition-all shadow-xl group/btn overflow-hidden relative">
                             <div className="absolute inset-0 bg-primary-dark translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                             <ArrowUpRight className="w-6 h-6 relative z-10" />
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
              <button className="w-full py-6 border border-dashed border-app-border rounded-[20px] text-app-text/20 font-black uppercase tracking-[0.3em] italic text-xs hover:bg-app-card transition-all mt-6">
                 Load Historical Data
              </button>
           </div>

           {/* Kitchen Performance Sidebar */}
           <div className="space-y-8">
              <div className="bg-app-card rounded-[20px] border border-app-border p-10 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px]" />
                 <h3 className="text-xl font-display font-black text-app-text uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                    <Flame className="text-primary w-5 h-5" /> Top Sellers
                 </h3>
                 <div className="space-y-6">
                    {[
                      { name: 'Mixed Grill', count: 124, trend: '+20%' },
                      { name: 'Omani Lamb Rice', count: 98, trend: '+5%' },
                      { name: 'Turkish Salad', count: 86, trend: '+12%' },
                      { name: 'Hummus Special', count: 54, trend: '-2%' }
                    ].map((food, i) => (
                      <div key={i} className="flex justify-between items-center group">
                         <div className="flex items-center gap-4">
                            <span className="text-app-text/20 font-black italic">{i+1}</span>
                            <p className="text-app-text font-bold group-hover:text-primary transition-colors">{food.name}</p>
                         </div>
                         <div className="text-right">
                            <p className="text-app-text font-display font-black italic text-sm">{food.count}</p>
                            <p className={`text-[8px] font-black ${food.trend.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{food.trend}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-primary/5 rounded-[20px] border border-primary/20 p-10 group hover:bg-primary/10 transition-all">
                 <h3 className="text-xl font-display font-black text-app-text uppercase italic tracking-tighter mb-4 text-center">Flight <span className="text-primary">Safety</span></h3>
                 <div className="flex flex-col items-center gap-6">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center relative">
                       <CheckCircle2 className="w-12 h-12 text-primary" />
                       <div className="absolute -inset-2 border-2 border-dashed border-primary/30 rounded-full animate-spin-slow" />
                    </div>
                    <p className="text-app-text/40 text-xs italic text-center leading-relaxed">Your kitchen is currently cleared for <span className="text-primary font-bold">Category 1 Drone Deliveries</span> by Civil Aviation Authority.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Settings Modal (Cover Upload) */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-app-bg border border-app-border w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 md:p-14 max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <button 
                onClick={() => setShowSettings(false)}
                className="absolute top-10 right-10 p-4 bg-app-card rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-app-border"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-12">
                <span className="text-[10px] font-mono font-black uppercase text-primary tracking-[0.4em] mb-2 block">System_Config</span>
                <h2 className="text-4xl font-display font-black text-app-text uppercase italic tracking-tighter leading-none">Kitchen Branding</h2>
              </div>

              <div className="space-y-10">
                <div>
                   <p className="text-[10px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] mb-4">Current_Static_Asset</p>
                   <div className="relative aspect-video rounded-[20px] overflow-hidden border border-app-border">
                      <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                         <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-white text-black px-8 py-4 rounded-full font-display font-black uppercase italic tracking-tighter text-sm flex items-center gap-3"
                         >
                            <Upload className="w-4 h-4" /> REWRITE_BUFFER
                         </button>
                      </div>
                   </div>
                   <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleImageUpload} 
                    accept="image/*"
                   />
                </div>

                <div className="p-6 bg-primary/5 rounded-[20px] border border-primary/20 flex items-start gap-5">
                   <ImageIcon className="w-10 h-10 text-primary flex-shrink-0" />
                   <div>
                      <p className="text-sm font-bold text-app-text mb-1 italic">Visual Identity Matters</p>
                      <p className="text-xs text-app-text/40 leading-relaxed">This cover image will be the first protocol accessed by users when viewing your restaurant vectors. Use high-resolution scans only.</p>
                   </div>
                </div>

                <div className="flex gap-4">
                   <button 
                    onClick={() => setShowSettings(false)}
                    className="flex-1 py-6 bg-app-card text-app-text rounded-[20px] font-display font-black uppercase italic tracking-tighter"
                   >
                     CLOSE_LOG
                   </button>
                   <button 
                    onClick={() => setShowSettings(false)}
                    className="flex-1 py-6 bg-primary text-white rounded-[20px] font-display font-black uppercase italic tracking-tighter shadow-lg shadow-primary/20 flex items-center justify-center gap-3"
                   >
                     <Save className="w-5 h-5" /> SYNC_CHANGES
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Append Menu Modal (Add Item) */}
      <AnimatePresence>
        {showAddMenu && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddMenu(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-app-bg border border-app-border w-full max-w-2xl rounded-[3rem] shadow-2xl p-10 md:p-14 max-h-[90vh] overflow-y-auto scrollbar-hide"
            >
              <button 
                onClick={() => setShowAddMenu(false)}
                className="absolute top-10 right-10 p-4 bg-app-card rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-app-border"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-10">
                <span className="text-[10px] font-mono font-black uppercase text-primary tracking-[0.4em] mb-2 block">Menu_Logic_Inflow</span>
                <h2 className="text-4xl font-display font-black text-app-text uppercase italic tracking-tighter leading-none">New Asset_Entry</h2>
              </div>

              <form onSubmit={addItemToMenu} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Display_Name</label>
                    <input 
                      required 
                      className="w-full bg-app-card border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all font-display font-medium text-lg italic tracking-tight" 
                      placeholder="e.g. Sultan's Platter" 
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Credit_Units (OMR)</label>
                    <input 
                      type="number"
                      step="0.001"
                      required 
                      className="w-full bg-app-card border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all font-display font-medium text-lg italic tracking-tight" 
                      placeholder="0.000"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Description_Buffer</label>
                  <textarea 
                    rows={3}
                    className="w-full bg-app-card border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all font-display font-medium text-lg italic tracking-tight resize-none" 
                    placeholder="Describe the asset contents..."
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Sector_Category</label>
                    <select 
                      className="w-full bg-app-card border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all font-display font-medium text-lg italic tracking-tight appearance-none"
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    >
                       <option>Main Course</option>
                       <option>Starters</option>
                       <option>Desserts</option>
                       <option>Grill</option>
                       <option>Traditional</option>
                    </select>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] font-mono font-black uppercase text-app-text/30 tracking-[0.2em] ml-2">Imagery_Link</label>
                    <div className="relative">
                       <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-app-text/20" />
                       <input 
                        className="w-full bg-app-card border border-app-border rounded-[20px] py-5 pl-14 pr-6 focus:border-primary/50 outline-none text-app-text/40 transition-all font-mono text-[10px] tracking-widest" 
                        placeholder="UNSPLASH_URL_PROTOCOL..."
                        value={newItem.image}
                        onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                   <button 
                    type="button"
                    onClick={() => setShowAddMenu(false)}
                    className="flex-1 py-6 border border-app-border text-app-text/40 hover:text-app-text transition-all rounded-[20px] font-display font-black uppercase italic tracking-tighter"
                   >
                     ABORT_ENTRY
                   </button>
                   <button 
                    type="submit"
                    className="flex-[2] py-6 bg-primary text-white rounded-[20px] font-display font-black uppercase italic tracking-tighter shadow-xl shadow-primary/20 flex items-center justify-center gap-4 transition-all"
                   >
                     VALIDATE_AND_APPEND <ArrowUpRight className="w-6 h-6" />
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
