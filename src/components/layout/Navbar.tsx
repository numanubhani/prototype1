import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Plane, Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Restaurants', href: '/restaurants' },
    { name: 'Track Order', href: '/tracking' },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 md:px-8",
        isScrolled ? "glass border-b border-white/5" : "bg-black/20"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            <Plane className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-black tracking-tighter text-white">
            DRONE<span className="text-primary italic">EXPRESS</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href}
              className={cn(
                "font-medium transition-colors hover:text-primary",
                location.pathname === link.href ? "text-primary" : "text-white/60"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-white/40 hidden lg:flex mr-4 pr-4 border-r border-white/10">
            <MapPin className="w-4 h-4" />
            Al Mouj, Muscat
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
            <Search className="w-5 h-5 text-white/60" />
          </button>
          <Link to="/cart" className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5 text-white/60" />
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Link to="/login" className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 text-white px-5 py-2.5 rounded-full font-medium hover:bg-white/10 transition-colors shadow-lg">
            <User className="w-4 h-4" />
            Login
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-full text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="md:hidden glass rounded-[2.5rem] mt-4 p-8 flex flex-col gap-6 shadow-2xl border border-white/10"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-2xl font-display font-black uppercase italic tracking-tighter",
                  location.pathname === link.href ? "text-primary" : "text-white"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-primary text-white p-5 rounded-3xl font-black uppercase tracking-widest w-full shadow-lg shadow-primary/20"
            >
              <User className="w-5 h-5" />
              SIGN IN
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
