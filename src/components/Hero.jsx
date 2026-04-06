import { motion } from 'framer-motion';

export default function Hero() {
  const downloadResume = () => {
    // Generate dummy resume
    const text = "ABDULBER RESUME\nFull Stack Developer\n\nSkills: React, Node.js, Three.js";
    const element = document.createElement("a");
    const file = new Blob([text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Abdlber_Resume.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const scrollToContact = () => {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pointer-events-none">
      <div className="z-10 text-center px-4 max-w-5xl mx-auto pointer-events-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-neon-pink font-mono mb-4 tracking-widest text-lg uppercase shadow-neon-pink">System Initialization complete</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="text-6xl md:text-8xl font-black mb-6 glitch-text tracking-tighter">
            ABDLBER
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xl md:text-3xl text-gray-400 mb-10 font-light border-l-4 border-neon-blue pl-4 inline-block text-left">
            FULL-STACK DEVELOPER <br/>
            <span className="text-neon-blue text-sm uppercase tracking-[0.3em] font-mono">React // Node.js // Three.js</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.button 
            whileHover={{ y: -2, boxShadow: '0 0 20px #00f3ff' }}
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className="px-8 py-4 bg-transparent border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-bg transition-all duration-300 font-bold tracking-widest uppercase w-full sm:w-auto text-sm"
          >
            Explore Core
          </motion.button>
          
          <motion.button 
            whileHover={{ y: -2, boxShadow: '0 0 20px #ff00aa' }}
            onClick={downloadResume}
            className="px-8 py-4 bg-transparent border border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-dark-bg transition-all duration-300 font-bold tracking-widest uppercase w-full sm:w-auto text-sm"
          >
            Extract Data (Resume)
          </motion.button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-auto cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs tracking-widest text-gray-500 font-mono uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-blue to-transparent"></div>
      </motion.div>
    </section>
  );
}
