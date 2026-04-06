import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, Code, Globe, MessageCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle, submitting, success

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Mock submission
    setStatus('submitting');
    setTimeout(() => {
      console.log('Form data submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="min-h-screen py-24 relative pointer-events-none flex flex-col justify-between">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pointer-events-auto flex-grow flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-4xl md:text-5xl font-black text-white">INITIATE_CONTACT</h2>
            <div className="h-[2px] flex-grow bg-neon-blue max-w-xs shadow-[0_0_10px_#00f3ff]"></div>
          </div>
          <p className="text-gray-400 mb-12 font-mono uppercase tracking-widest text-sm">Awaiting connection protocol...</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="w-full lg:w-2/3 bg-dark-surface/60 border border-white/10 p-8 md:p-12 backdrop-blur-md relative overflow-hidden"
          >
            {/* Success Overlay */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-dark-surface/95 z-20 flex flex-col items-center justify-center p-8 text-center"
                >
                  <CheckCircle size={64} className="text-neon-blue mb-6 shadow-[0_0_20px_#00f3ff] rounded-full" />
                  <h3 className="text-3xl font-bold text-white mb-2 uppercase tracking-widest">Transmission Sent</h3>
                  <p className="text-neon-blue font-mono">Connection established. Awaiting response.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Target Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full bg-dark-bg border ${errors.name ? 'border-red-500' : 'border-white/20 focus:border-neon-blue'} focus:shadow-[0_0_10px_#00f3ff] text-white p-4 outline-none transition-all duration-300 font-mono`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-2 font-mono">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Return Address (Email)</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-dark-bg border ${errors.email ? 'border-red-500' : 'border-white/20 focus:border-neon-blue'} focus:shadow-[0_0_10px_#00f3ff] text-white p-4 outline-none transition-all duration-300 font-mono`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-2 font-mono">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-widest">Payload (Message)</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full bg-dark-bg border ${errors.message ? 'border-red-500' : 'border-white/20 focus:border-neon-blue'} focus:shadow-[0_0_10px_#00f3ff] text-white p-4 outline-none transition-all duration-300 font-mono resize-none`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs mt-2 font-mono">{errors.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="group relative flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-transparent border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-bg transition-all duration-300 font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Transmitting...' : 'Execute Send'}
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-1/3 flex flex-col justify-center gap-8"
          >
            <div className="bg-dark-surface/30 border-l border-white/20 p-6 hover:border-neon-purple transition-all duration-300 group">
              <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-sm group-hover:text-neon-purple transition-colors">Open Frequency</h4>
              <a href="mailto:hello@abdlber.dev" className="text-gray-400 hover:text-white font-mono text-sm hover:underline">hello@abdlber.dev</a>
            </div>

            <div className="bg-dark-surface/30 border-l border-white/20 p-6 hover:border-neon-pink transition-all duration-300 group">
              <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm group-hover:text-neon-pink transition-colors">Social Network</h4>
              <div className="flex gap-4">
                <a href="#" className="p-3 bg-dark-bg border border-white/10 hover:border-neon-pink hover:text-neon-pink text-gray-400 transition-all duration-300">
                  <Code size={20} />
                </a>
                <a href="#" className="p-3 bg-dark-bg border border-white/10 hover:border-neon-blue hover:text-neon-blue text-gray-400 transition-all duration-300">
                  <Globe size={20} />
                </a>
                <a href="#" className="p-3 bg-dark-bg border border-white/10 hover:border-neon-purple hover:text-neon-purple text-gray-400 transition-all duration-300">
                  <MessageCircle size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full text-center py-6 mt-20 border-t border-white/5 z-10 pointer-events-auto">
        <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          SYSTEM.END_OF_FILE // © {new Date().getFullYear()} ABDLBER. ALL RIGHTS RESERVED.
        </p>
      </div>
    </section>
  );
}
