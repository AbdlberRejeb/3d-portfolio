import { motion } from 'framer-motion';
import { Terminal, Code, Cpu, Activity } from 'lucide-react';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="about" className="min-h-screen py-24 flex items-center relative pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pointer-events-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-2 text-white">
            <span className="text-neon-purple">{'//'}</span> ABOUT_ME
          </motion.h2>
          <motion.div variants={itemVariants} className="w-24 h-1 bg-neon-purple mb-12 box-shadow-neon-purple"></motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <motion.div variants={itemVariants} className="bg-dark-surface/50 border border-neon-purple/30 p-8 backdrop-blur-sm relative group hover:border-neon-purple transition-all duration-500">
              <div className="absolute top-0 left-0 w-2 h-full bg-neon-purple group-hover:shadow-[0_0_15px_#b000ff]"></div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I am a passionate Full-stack Developer specializing in crafting high-performance, visually striking digital experiences. My expertise bridges the gap between robust backend architectures and immersive frontend interfaces.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Leveraging React, Node.js, and Three.js, I build scalable applications that don't just function flawlessly, but leave a lasting impression. I thrive on solving complex problems and translating them into elegant, user-centric solutions.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Whether it's optimizing database queries, orchestrating state across massive applications, or rendering complex 3D scenes in the browser, I am dedicated to pushing the boundaries of web technology. Performance optimization is not an afterthought, it's a foundational principle in my work.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
              {[
                { icon: <Terminal size={32} />, title: "Full-Stack Dev", desc: "React & Node.js ecosystem", color: "text-neon-blue", border: "border-neon-blue" },
                { icon: <Code size={32} />, title: "3D Experiences", desc: "Three.js & WebGL mastery", color: "text-neon-pink", border: "border-neon-pink" },
                { icon: <Cpu size={32} />, title: "System Architecture", desc: "Scalable backend design", color: "text-neon-purple", border: "border-neon-purple" },
                { icon: <Activity size={32} />, title: "Performance", desc: "60fps optimizations", color: "hover:text-white text-gray-400", border: "border-gray-500" }
              ].map((skill, index) => (
                <div 
                  key={index} 
                  className={`bg-dark-surface/40 border border-white/5 p-6 flex flex-col items-center text-center hover:${skill.border} hover:bg-dark-surface/80 transition-all duration-300 group`}
                >
                  <div className={`${skill.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {skill.icon}
                  </div>
                  <h3 className="text-white font-bold mb-2 uppercase text-sm tracking-wider">{skill.title}</h3>
                  <p className="text-gray-400 text-sm">{skill.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
