import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden bg-app-bg"
    >
      {/* Background Glows */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-6 group">
            <div className="bg-primary p-2 rounded-[20px] group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <Plane className="text-white w-6 h-6" />
            </div>
            <span className="text-3xl font-display font-black tracking-tighter text-app-text">
              DRONE<span className="text-primary italic">EXPRESS</span>
            </span>
          </Link>
          <h1 className="text-4xl font-display font-black text-app-text uppercase italic tracking-tighter mb-2">Join the <span className="text-primary italic">Fleet</span></h1>
          <p className="text-app-text/30 font-medium uppercase tracking-widest text-[10px]">Create your futuristic delivery profile</p>
        </div>

        <div className="bg-app-card backdrop-blur-xl rounded-[20px] border border-app-border p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-app-text/40 tracking-[0.2em] ml-4">Full Name</label>
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-app-text/20" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ahmed Al-Balushi"
                  className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 pl-14 pr-6 focus:outline-none focus:border-primary/50 transition-all text-app-text placeholder:text-app-text/10 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-app-text/40 tracking-[0.2em] ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-app-text/20" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 pl-14 pr-6 focus:outline-none focus:border-primary/50 transition-all text-app-text placeholder:text-app-text/10 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-app-text/40 tracking-[0.2em] ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-app-text/20" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 pl-14 pr-6 focus:outline-none focus:border-primary/50 transition-all text-app-text placeholder:text-app-text/10 font-medium"
                />
              </div>
            </div>

            <div className="p-4 bg-primary/5 rounded-[20px] border border-primary/10 flex gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-[10px] text-app-text/40 font-medium leading-relaxed uppercase tracking-wider">
                By signing up, you agree to DroneExpress AR data processing and Muscat flight safety regulations.
              </p>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white p-6 rounded-[20px] font-black text-xl tracking-tighter flex items-center justify-center gap-3 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 group disabled:opacity-50"
            >
              {loading ? 'CREATING...' : 'CREATE ACCOUNT'}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center text-xs text-app-text/30 mt-8">
            Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
