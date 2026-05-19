import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Mail, Lock, ArrowRight, Github } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <Plane className="text-white w-6 h-6" />
            </div>
            <span className="text-3xl font-display font-black tracking-tighter text-white">
              DRONE<span className="text-primary italic">EXPRESS</span>
            </span>
          </Link>
          <h1 className="text-4xl font-display font-black text-white uppercase italic tracking-tighter mb-2">Welcome <span className="text-primary italic">Back</span></h1>
          <p className="text-white/30 font-medium uppercase tracking-widest text-[10px]">Access the future of delivery in Oman</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em] ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-white/10 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between px-4">
                <label className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Password</label>
                <button type="button" className="text-[10px] font-black uppercase text-primary hover:text-primary-dark tracking-widest">Forgot?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-6 focus:outline-none focus:border-primary/50 transition-all text-white placeholder:text-white/10 font-medium"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary text-white p-6 rounded-[2rem] font-black text-xl tracking-tighter flex items-center justify-center gap-3 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 group"
            >
              SIGN IN
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-white/5">
            <button className="w-full bg-white/5 hover:bg-white/10 border border-white/5 p-5 rounded-2xl flex items-center justify-center gap-3 transition-all text-white font-bold mb-6">
              <Github className="w-5 h-5" />
              Continue with Passport
            </button>
            
            <p className="text-center text-xs text-white/30">
              Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Create Account</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
