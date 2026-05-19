import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Building2, MapPin, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RestaurantRegistration() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { registerRestaurant } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    brandName: '',
    address: '',
    province: 'Muscat',
    city: 'Seeb',
    country: 'Oman',
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setError('');
    setLoading(true);
    try {
      await registerRestaurant(form);
      navigate('/restaurant-dashboard');
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
      className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden bg-app-bg"
    >
      <motion.div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">Partner Program</span>
          <h1 className="text-5xl md:text-7xl font-display font-black text-app-text tracking-tighter uppercase italic mb-6">
            Register Your <span className="text-primary">Kitchen</span>
          </h1>
          <p className="text-app-text/40 max-w-2xl mx-auto italic">
            Join Oman's most advanced delivery network.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 w-24 rounded-full transition-all duration-500 ${step >= s ? 'bg-primary' : 'bg-app-border'}`}
            />
          ))}
        </div>

        <div className="bg-app-card backdrop-blur-xl rounded-[20px] border border-app-border p-8 md:p-16 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-10">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <motion.div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-app-text/40 tracking-widest ml-4">Full Name</label>
                  <input
                    required
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all"
                    placeholder="Ahmed Al-Balushi"
                  />
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-app-text/40 tracking-widest ml-4">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all"
                      placeholder="ahmed@example.com"
                    />
                  </motion.div>
                  <motion.div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-app-text/40 tracking-widest ml-4">Phone</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all"
                      placeholder="+968 9xxx xxxx"
                    />
                  </motion.div>
                </div>
                <motion.div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-app-text/40 tracking-widest ml-4">Password</label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => update('password', e.target.value)}
                    className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all"
                    placeholder="Minimum 8 characters"
                  />
                </motion.div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <motion.div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-app-text/40 tracking-widest ml-4">Brand Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-app-text/20" />
                    <input
                      required
                      value={form.brandName}
                      onChange={(e) => update('brandName', e.target.value)}
                      className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 pl-14 pr-6 focus:border-primary/50 outline-none text-app-text transition-all"
                      placeholder="Your Restaurant Brand"
                    />
                  </div>
                </motion.div>
                <motion.div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-app-text/40 tracking-widest ml-4">Address</label>
                  <motion.div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-app-text/20" />
                    <input
                      required
                      value={form.address}
                      onChange={(e) => update('address', e.target.value)}
                      className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 pl-14 pr-6 focus:border-primary/50 outline-none text-app-text transition-all"
                      placeholder="Street, Building, Floor"
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-app-text/40 tracking-widest ml-4">Province</label>
                    <input
                      required
                      value={form.province}
                      onChange={(e) => update('province', e.target.value)}
                      className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all"
                      placeholder="Muscat"
                    />
                  </motion.div>
                  <motion.div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-app-text/40 tracking-widest ml-4">City</label>
                    <input
                      required
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all"
                      placeholder="Seeb"
                    />
                  </motion.div>
                </div>
                <motion.div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-app-text/40 tracking-widest ml-4">Country</label>
                  <input
                    required
                    value={form.country}
                    onChange={(e) => update('country', e.target.value)}
                    className="w-full bg-app-bg border border-app-border rounded-[20px] py-5 px-6 focus:border-primary/50 outline-none text-app-text transition-all"
                  />
                </motion.div>
              </motion.div>
            )}

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white p-6 rounded-[20px] font-black text-xl tracking-tighter flex items-center justify-center gap-3 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 group disabled:opacity-50"
            >
              {loading ? 'REGISTERING...' : step === 3 ? 'COMPLETE REGISTRATION' : 'NEXT STEP'}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <p className="text-center mt-12 text-xs text-app-text/20 font-medium">
          Already a partner? <Link to="/login" className="text-primary hover:underline">Access Dashboard</Link>
        </p>
      </div>
    </motion.div>
  );
}
