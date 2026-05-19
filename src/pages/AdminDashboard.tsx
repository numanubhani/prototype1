import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Building2, 
  ShieldAlert, 
  Ban, 
  Power, 
  BarChart3, 
  Search, 
  MoreVertical,
  Activity,
  AlertTriangle,
  LayoutDashboard
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'users' | 'restaurants'>('users');

  const users = [
    { id: 'U-001', name: 'Ahmed Al-B.', email: 'ahmed@example.com', orders: 12, status: 'Active', joined: 'Oct 2023' },
    { id: 'U-002', name: 'Sarah M.', email: 'sarah@example.com', orders: 4, status: 'Active', joined: 'Oct 2023' },
    { id: 'U-003', name: 'Hamad R.', email: 'hamad@example.com', orders: 0, status: 'Banned', joined: 'Sept 2023' },
  ];

  const restaurants = [
    { id: 'R-001', name: 'Turkish House', owner: 'Said Al-M.', status: 'Open', revenue: '1,420.50', rating: 4.8 },
    { id: 'R-002', name: 'Al Mouj Cafe', owner: 'Muna S.', status: 'Closed', revenue: '890.20', rating: 4.5 },
    { id: 'R-003', name: 'Sultan Burger', owner: 'Zaid K.', status: 'Open', revenue: '2,100.00', rating: 4.2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 bg-app-bg"
    >
      <div className="max-w-7xl mx-auto">
        {/* Admin Header - Redesigned */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16">
          <div className="space-y-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">
                   <ShieldAlert className="w-8 h-8" />
                </div>
                <div>
                   <p className="text-[10px] font-mono font-black uppercase text-red-500 tracking-[0.3em] font-display italic leading-none mb-1">System_Core // Master_Access</p>
                   <p className="text-[9px] font-mono font-bold text-app-text/20 uppercase tracking-widest">Muscat Command Auth Verified</p>
                </div>
             </div>
             <h1 className="text-5xl md:text-7xl font-display font-black text-app-text italic uppercase tracking-tighter leading-[0.85]">Fleet <br /> <span className="text-primary italic">Controller_v9</span></h1>
          </div>

          <div className="flex bg-app-card p-1.5 rounded-[20px] border border-app-border shadow-xl">
             <button 
               onClick={() => setActiveTab('users')}
               className={`px-10 py-4 rounded-[20px] font-display font-black uppercase tracking-tighter text-sm transition-all flex items-center gap-3 italic ${activeTab === 'users' ? 'bg-primary text-white shadow-lg shadow-primary/20 shadow-primary/20' : 'text-app-text/40 hover:text-app-text'}`}
             >
                <Users className="w-4 h-4" /> Users
             </button>
             <button 
               onClick={() => setActiveTab('restaurants')}
               className={`px-10 py-4 rounded-[20px] font-display font-black uppercase tracking-tighter text-sm transition-all flex items-center gap-3 italic ${activeTab === 'restaurants' ? 'bg-primary text-white shadow-lg shadow-primary/20 shadow-primary/20' : 'text-app-text/40 hover:text-app-text'}`}
             >
                <Building2 className="w-4 h-4" /> Partners
             </button>
          </div>
        </div>

        {/* Global Analytics - Technical Redesign */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
           {[
             { label: 'Neural Link Sessions', value: '428', icon: Activity, detail: 'Active Sync Sessions', color: 'text-primary' },
             { label: 'System Uptime', value: '99.9', icon: LayoutDashboard, detail: 'Operational Efficiency %', color: 'text-primary' },
             { label: 'Vector Conflicts', value: '00', icon: AlertTriangle, detail: 'Resolved Protocols', color: 'text-app-text/10' }
           ].map((stat, i) => (
             <div key={i} className="bg-app-card rounded-[20px] p-10 border border-app-border flex items-center gap-10 hover:bg-app-card/80 transition-all relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-[60px]" />
                <div className="p-6 bg-app-bg border border-app-border rounded-[20px] shadow-inner rotate-[-3deg] group-hover:rotate-0 transition-transform">
                   <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="relative z-10">
                   <p className="text-app-text/20 text-[9px] font-mono font-black uppercase tracking-[0.3em] mb-2 font-display italic leading-none">{stat.label}</p>
                   <h3 className="text-5xl font-display font-black text-app-text italic tracking-tighter mb-1">{stat.value}</h3>
                   <p className="text-[10px] font-mono text-app-text/10 font-bold uppercase tracking-widest">{stat.detail}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Main List Console */}
        <div className="bg-app-card rounded-[20px] border border-app-border overflow-hidden shadow-2xl relative">
           <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
           <div className="p-10 border-b border-app-border flex flex-col lg:row-span-1 md:flex-row justify-between gap-8 items-center bg-app-text/[0.01]">
              <div className="space-y-1">
                 <h3 className="text-3xl font-display font-black text-app-text uppercase italic tracking-tighter">
                    Neural <span className="text-primary">{activeTab}</span> Feed
                 </h3>
                 <p className="text-app-text/20 font-bold text-[10px] uppercase tracking-[0.2em] italic">Real-time status management console</p>
              </div>
              <div className="relative w-full md:w-96">
                 <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full" />
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-app-text/20" />
                 <input className="relative w-full bg-app-bg border border-app-border rounded-[20px] py-4 pl-14 pr-6 outline-none text-app-text focus:border-primary/50 transition-all font-medium placeholder:text-app-text/10" placeholder={`Identify ${activeTab}...`} />
              </div>
           </div>

           <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-app-text/[0.02]">
                       <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest text-app-text/20">Index</th>
                       <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest text-app-text/20">Entity Profile</th>
                       <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest text-app-text/20">Protocol Stats</th>
                       <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest text-app-text/20">Auth Status</th>
                       <th className="px-10 py-8 text-[11px] font-black uppercase tracking-widest text-app-text/20 text-right">Master Control</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-app-border">
                    {(activeTab === 'users' ? users : restaurants).map((item: any) => (
                       <tr key={item.id} className="hover:bg-app-text/[0.03] transition-all group">
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-4">
                                <div className="w-1 h-8 bg-primary rounded-full group-hover:h-12 transition-all duration-500" />
                                <span className="font-display font-black text-app-text text-xl italic tracking-tighter">{item.id}</span>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex flex-col">
                                <span className="text-app-text text-lg font-bold tracking-tight">{item.name}</span>
                                <span className="text-app-text/30 text-[10px] font-medium uppercase tracking-[0.1em] mt-1">{item.email || item.owner}</span>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex flex-col">
                                <span className="text-app-text font-display font-black text-xl italic tracking-tighter">{item.orders || item.revenue}</span>
                                <span className="text-[9px] text-app-text/20 uppercase tracking-[0.2em] font-black mt-1">{activeTab === 'users' ? 'Total Cycles' : 'Revenue Units'}</span>
                             </div>
                          </td>
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${item.status === 'Active' || item.status === 'Open' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                                <span className={`text-[10px] font-black uppercase tracking-widest italic ${
                                   item.status === 'Active' || item.status === 'Open' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                   {item.status}
                                </span>
                             </div>
                          </td>
                          <td className="px-10 py-8 text-right">
                             <div className="flex justify-end gap-3 opacity-30 group-hover:opacity-100 transition-all">
                                {activeTab === 'users' ? (
                                   <button className="flex items-center gap-3 px-8 py-4 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-[20px] transition-all text-[10px] font-black uppercase italic tracking-widest font-display">
                                      <Ban className="w-4 h-4" /> SEVER LINK
                                   </button>
                                ) : (
                                   <button className="flex items-center gap-3 px-8 py-4 bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white border border-orange-500/20 rounded-[20px] transition-all text-[10px] font-black uppercase italic tracking-widest font-display">
                                      <Power className="w-4 h-4" /> LOCKDOWN
                                   </button>
                                )}
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        <div className="mt-12 p-8 bg-red-500/5 rounded-[20px] border border-red-500/10 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-6">
              <div className="p-4 bg-red-500/20 text-red-500 rounded-[20px]">
                 <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                 <h4 className="text-app-text font-bold">Protocol Gamma Active</h4>
                 <p className="text-app-text/30 text-sm italic">All executive decisions are logged by the Muscat Central Aviation Authority.</p>
              </div>
           </div>
           <button className="px-10 py-4 bg-app-card text-app-text/40 border border-app-border rounded-[20px] text-[10px] font-black uppercase tracking-widest hover:bg-app-card/80 transition-all">View Audit Logs</button>
        </div>
      </div>
    </motion.div>
  );
}
