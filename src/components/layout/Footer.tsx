import { Link } from 'react-router-dom';
import { Plane, Instagram, Twitter, Facebook, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-app-card border-t border-app-border backdrop-blur-md py-6 px-8 text-[11px] text-app-text/30 uppercase tracking-[0.2em] mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
           <span className="text-app-text font-black italic">DRONE<span className="text-primary">EXPRESS</span> OMAN</span>
           <span className="hidden md:block opacity-20">•</span>
           <span>DELIVERING THE FUTURE OF LOGISTICS</span>
        </div>
        
        <div className="flex gap-10">
          {['Safety', 'Partnership', 'Innovation', 'Privacy'].map((link) => (
            <a key={link} href="#" className="hover:text-primary transition-colors hover:translate-y-[-2px] inline-block">{link}</a>
          ))}
        </div>

        <div className="text-app-text/20">
          © 2026 DX-LABS. UNIVERSITY PROTOTYPE PHASE 02.
        </div>
      </div>
    </footer>
  );
}
