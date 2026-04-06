import { motion } from 'framer-motion';

export default function Skills() {
  const categories = [
    {
      title: "Frontend",
      color: "border-neon-blue",
      textColor: "text-neon-blue",
      skills: ["React", "Three.js", "Tailwind CSS", "Framer Motion", "WebGL", "Next.js"]
    },
    {
      title: "Backend",
      color: "border-neon-purple",
      textColor: "text-neon-purple",
      skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL", "REST APIs"]
    },
    {
      title: "Tools & DevOps",
      color: "border-neon-pink",
      textColor: "text-neon-pink",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Vite", "Webpack"]
    }
  ];

  return (
    <section id="skills" className="min-h-screen py-24 relative pointer-events-none flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-2 text-white">
            TECH_STACK <span className="text-neon-pink blink animate-pulse">_</span>
          </h2>
          <div className="w-24 h-1 bg-neon-pink mx-auto mb-4 box-shadow-neon-pink"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, catIndex) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: catIndex * 0.2 }}
              className={`bg-dark-surface/60 border ${category.color} p-8 backdrop-blur-md relative`}
            >
              <h3 className={`text-2xl font-bold mb-8 uppercase tracking-widest ${category.textColor} text-center`}>
                {category.title}
              </h3>
              
              <div className="flex flex-wrap justify-center gap-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: (catIndex * 0.5) + (skillIndex * 0.2) // Staggered floating
                    }}
                    whileHover={{ scale: 1.1, zIndex: 10 }}
                    // Hexagon-like appearance via CSS
                    className={`
                      relative group cursor-default flex items-center justify-center 
                      min-w-[100px] h-[50px] px-6
                      bg-dark-bg border border-white/10 
                      hover:${category.color} hover:bg-dark-bg/90 
                      transition-colors duration-300
                    `}
                    style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)' }}
                  >
                    <span className="text-white font-mono text-sm z-10 group-hover:text-shadow-sm transition-all duration-300 text-center uppercase tracking-wide">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
