import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { X, ExternalLink, Code } from 'lucide-react';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="min-h-screen py-24 relative pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pointer-events-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-black mb-2 text-white text-right">
            PROJECTS <span className="text-neon-blue">{'<'}</span>
          </motion.h2>
          <motion.div variants={itemVariants} className="w-24 h-1 bg-neon-blue mb-12 ml-auto box-shadow-neon-blue"></motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
            {projects.map((project) => (
              <motion.div 
                key={project.id} 
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10, boxShadow: '0 0 25px rgba(0, 243, 255, 0.4)', borderColor: '#00f3ff' }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-dark-surface/80 border border-white/10 overflow-hidden transition-all duration-300 relative backdrop-blur-md"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-bg/90 z-10 pointer-events-none"></div>
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                  />
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-blue opacity-0 group-hover:opacity-100 transition-opacity z-20 m-4"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-blue opacity-0 group-hover:opacity-100 transition-opacity z-20 m-4"></div>
                </div>
                
                <div className="p-6 absolute bottom-0 w-full z-20">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">{project.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0,3).map(t => (
                      <span key={t} className="text-xs bg-dark-bg border border-white/20 px-2 py-1 text-gray-300 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-bg/90 backdrop-blur-sm pointer-events-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-dark-surface border border-neon-blue/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative h-64 sm:h-80 w-full">
                <button 
                  className="absolute top-4 right-4 z-30 p-2 bg-dark-bg/50 backdrop-blur border border-white/10 hover:border-neon-pink text-white hover:text-neon-pink rounded-full transition-all"
                  onClick={() => setSelectedProject(null)}
                >
                  <X size={24} />
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-dark-surface to-transparent z-10"></div>
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-8 relative z-20 -mt-16">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedProject.title}</h3>
                
                <div className="flex flex-wrap gap-3 mb-8">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="text-sm bg-neon-blue/10 border border-neon-blue/30 text-neon-blue px-3 py-1 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                
                <div className="mb-8 hidden sm:block w-12 h-1 bg-neon-pink"></div>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {selectedProject.fullDescription}
                </p>

                <div className="flex gap-4">
                  <a href={selectedProject.demoUrl} className="flex items-center gap-2 px-6 py-3 bg-neon-blue/10 border border-neon-blue hover:bg-neon-blue hover:text-dark-bg text-neon-blue transition-all font-bold tracking-widest uppercase text-sm">
                    <ExternalLink size={18} /> Live Demo
                  </a>
                  <a href="#" className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 hover:border-white text-white transition-all font-bold tracking-widest uppercase text-sm">
                    <Code size={18} /> Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
