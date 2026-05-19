import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Plane, Search, MapPin, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();

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
        isScrolled ? "glass border-b" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-[20px] group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
            <Plane className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-black tracking-tighter text-app-text">
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
                location.pathname === link.href ? "text-primary" : "text-app-text/60"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-app-card rounded-full transition-colors group"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-yellow-500 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600 group-hover:-rotate-12 transition-transform" />
            )}
          </button>

          <div className="flex items-center gap-2 text-sm text-app-text/40 hidden lg:flex mr-4 pr-4 border-r border-app-border">
            <MapPin className="w-4 h-4" />
            Al Mouj, Muscat
          </div>
          <button className="p-2 hover:bg-app-card rounded-full transition-colors hidden sm:block">
            <Search className="w-5 h-5 text-app-text/60" />
          </button>
          <Link to="/cart" className="relative p-2 hover:bg-app-card rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5 text-app-text/60" />
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
          <Link to="/profile" className="hidden md:flex items-center gap-2 bg-app-card border border-app-border text-app-text px-5 py-2.5 rounded-full font-medium hover:bg-app-card transition-colors shadow-lg">
            <User className="w-4 h-4" />
            Profile
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 hover:bg-app-card rounded-full text-app-text"
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
            className="md:hidden glass rounded-[20px] mt-4 p-8 flex flex-col gap-6 shadow-2xl border border-white/10"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-2xl font-display font-black uppercase italic tracking-tighter",
                  location.pathname === link.href ? "text-primary" : "text-app-text"
                )}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-[1px] bg-app-border my-2" />
            
            <div className="flex flex-col gap-4">
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-display font-black text-app-text/40 uppercase italic tracking-tighter hover:text-primary transition-colors">User Profile</Link>
              <Link to="/restaurant-dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-display font-black text-app-text/40 uppercase italic tracking-tighter hover:text-primary transition-colors">Kitchen Command</Link>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-display font-black text-app-text/40 uppercase italic tracking-tighter hover:text-primary transition-colors">Fleet Controller</Link>
              <Link to="/register-restaurant" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-display font-black text-primary uppercase italic tracking-tighter">Join as Partner</Link>
            </div>

            <Link 
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-primary text-white p-5 rounded-[20px] font-black uppercase tracking-widest w-full shadow-lg shadow-primary/20 mt-4"
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
