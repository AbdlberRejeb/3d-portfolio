import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = ['Hero', 'About', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 } // 50% visibility required to trigger
    );

    LINKS.forEach((link) => {
      const el = document.getElementById(link.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-40 backdrop-blur-md bg-dark-bg/60 border-b border-neon-blue/20 pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <span className="text-2xl font-bold glitch-text">ABDLBER</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {LINKS.map((link) => {
                const isActive = activeSection === link.toLowerCase();
                return (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link)}
                    className={`${
                      isActive ? 'text-neon-blue text-shadow-[0_0_10px_#00f3ff]' : 'text-gray-300'
                    } hover:text-neon-blue hover:text-shadow-[0_0_10px_#00f3ff] transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium uppercase tracking-widest relative group`}
                  >
                    {link}
                    {isActive && (
                      <motion.div 
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-blue shadow-[0_0_5px_#00f3ff]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-dark-surface focus:outline-none"
            >
              {isOpen ? <X className="text-neon-pink" size={24} /> : <Menu className="text-neon-blue" size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-dark-surface/95 backdrop-blur-xl border-b border-neon-blue/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {LINKS.map((link) => {
              const isActive = activeSection === link.toLowerCase();
              return (
                <button
                  key={link}
                  onClick={() => scrollToSection(link)}
                  className={`${
                    isActive ? 'text-neon-blue text-shadow-[0_0_10px_#00f3ff]' : 'text-gray-300'
                  } hover:text-neon-blue block px-3 py-2 rounded-md text-base font-medium w-full text-left uppercase tracking-widest`}
                >
                  {link}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
