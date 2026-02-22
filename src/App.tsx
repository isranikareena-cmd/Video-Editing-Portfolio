/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { 
  Play, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Mail, 
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  CheckCircle2,
  Video,
  Layers,
  Zap,
  Clock,
  Scissors,
  Palette
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PROJECTS = [
  {
    id: 1,
    title: "Urban Pulse",
    category: "Commercial",
    thumbnail: "https://picsum.photos/seed/urban/800/600",
    videoUrl: "#",
    description: "A high-energy commercial for a streetwear brand."
  },
  {
    id: 2,
    title: "Silent Peaks",
    category: "Documentary",
    thumbnail: "https://picsum.photos/seed/peaks/800/600",
    videoUrl: "#",
    description: "Cinematic journey through the Swiss Alps."
  },
  {
    id: 3,
    title: "Neon Dreams",
    category: "Music Video",
    thumbnail: "https://picsum.photos/seed/neon/800/600",
    videoUrl: "#",
    description: "Vibrant visuals for an indie-pop artist."
  },
  {
    id: 4,
    title: "The Artisan",
    category: "Corporate",
    thumbnail: "https://picsum.photos/seed/artisan/800/600",
    videoUrl: "#",
    description: "Showcasing the craft of a master watchmaker."
  },
  {
    id: 5,
    title: "Velocity",
    category: "Sports",
    thumbnail: "https://picsum.photos/seed/velocity/800/600",
    videoUrl: "#",
    description: "Fast-paced editing for a Formula 1 recap."
  },
  {
    id: 6,
    title: "Ethereal",
    category: "Short Film",
    thumbnail: "https://picsum.photos/seed/ethereal/800/600",
    videoUrl: "#",
    description: "Experimental storytelling through visual effects."
  }
];

const SERVICES = [
  {
    title: "Narrative Editing",
    description: "Crafting compelling stories for films, documentaries, and shorts.",
    icon: <Video className="w-6 h-6" />,
    features: ["Color Grading", "Sound Design", "Pacing Optimization"]
  },
  {
    title: "Commercial & Social",
    description: "High-impact edits designed to capture attention in seconds.",
    icon: <Zap className="w-6 h-6" />,
    features: ["Fast Turnaround", "Platform Optimization", "Motion Graphics"]
  },
  {
    title: "Post-Production",
    description: "Full-service post-production including VFX and cleanup.",
    icon: <Layers className="w-6 h-6" />,
    features: ["VFX Compositing", "Audio Mastering", "4K Rendering"]
  },
  {
    title: "Clipping",
    description: "Extracting the best moments for short-form content and highlights.",
    icon: <Scissors className="w-6 h-6" />,
    features: ["Shorts/Reels", "Highlight Reels", "Content Repurposing"]
  },
  {
    title: "Color Grading",
    description: "Giving your footage a professional, cinematic look and feel.",
    icon: <Palette className="w-6 h-6" />,
    features: ["Color Correction", "Look Development", "HDR Grading"]
  }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'About Me', href: '#about' },
    { name: 'Contact Me', href: '#contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-6 md:px-12",
      isScrolled ? "bg-brand-black/80 backdrop-blur-xl py-4" : "bg-transparent"
    )}>
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-display font-bold tracking-tighter hover:text-brand-accent transition-colors"
        >
          nodestree.media
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm uppercase tracking-widest font-medium hover:text-brand-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-accent transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-brand-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col gap-6 p-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display font-bold"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex items-center overflow-hidden px-6 md:px-12 lg:px-24">
      {/* Background Video Placeholder/Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/40 to-transparent z-10" />
        <img 
          src="https://picsum.photos/seed/studio/1920/1080?blur=2" 
          className="w-full h-full object-cover opacity-30"
          alt="Studio background"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-20 max-w-7xl w-full"
      >
        <div className="overflow-hidden mb-12">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[8vw] lg:text-[9vw] font-display font-bold leading-[0.85] tracking-tighter"
          >
            WE CRAFT STORIES
          </motion.h1>
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-[8vw] lg:text-[9vw] font-display font-bold leading-[0.85] tracking-tighter text-stroke"
          >
            THAT RESONATE.
          </motion.h1>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col md:flex-row items-start gap-8"
        >
          <a 
            href="#work"
            className="group flex items-center gap-3 bg-brand-white text-brand-black px-10 py-5 rounded-full font-bold hover:bg-brand-accent hover:text-brand-white transition-all duration-300"
          >
            VIEW OUR WORK
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>

      {/* Decorative vertical line for balance */}
      <div className="absolute right-12 bottom-0 w-px h-1/3 bg-gradient-to-t from-brand-accent/50 to-transparent hidden lg:block" />

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-6 md:left-12 lg:left-24 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-px h-12 bg-brand-white" />
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
};

const Work = () => {
  return (
    <section id="work" className="py-20 px-6 md:px-12 bg-brand-black">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">SELECTED WORK</h2>
            <p className="text-brand-white/50 max-w-md">
              A curated collection of projects where we pushed the boundaries of visual storytelling.
            </p>
          </div>
          <div className="flex gap-4">
            {['All', 'Commercial', 'Music Video', 'Short Film'].map((cat) => (
              <button 
                key={cat}
                className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 border border-white/10 rounded-full hover:border-brand-accent transition-colors"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 cursor-pointer"
            >
              <img 
                src={project.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                alt={project.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-bold mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-brand-white/60 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {project.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  View Project <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-20 px-6 md:px-12 bg-zinc-950">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-brand-accent font-display font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">
              What we do
            </span>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              ELEVATING <br />
              YOUR <br />
              <span className="text-stroke">CONTENT</span>
            </h2>
            <p className="text-lg text-brand-white/60 mb-10 max-w-lg leading-relaxed">
              We provide end-to-end video post-production services tailored to your brand's unique voice. From raw footage to cinematic masterpieces.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-display font-bold text-brand-accent">150+</span>
                <span className="text-[10px] uppercase tracking-widest opacity-50">Projects Delivered</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-display font-bold text-brand-accent">50+</span>
                <span className="text-[10px] uppercase tracking-widest opacity-50">Happy Clients</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-brand-black border border-white/5 hover:border-brand-accent/30 transition-all group"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-brand-white/50 mb-6">{service.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {service.features.map(f => (
                        <span key={f} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 px-6 md:px-12 bg-zinc-950 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square max-w-md mx-auto lg:mx-0 overflow-hidden rounded-3xl">
            <img 
              src="https://picsum.photos/seed/editor/800/800" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              alt="The Editor"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay" />
          </div>
          
          <div>
            <span className="text-brand-accent font-display font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">
              The Mind Behind
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 uppercase">DIVAKAR <br /> SHARMA</h2>
            <div className="space-y-6 text-brand-white/60 leading-relaxed">
              <p>
                I'm a passionate video editor and storyteller with over 5 years of experience in the industry. My journey started with a simple fascination for how timing and rhythm can transform raw footage into an emotional experience.
              </p>
              <p>
                I focus on high-end post-production for brands that want to stand out. I don't just cut clips; I build narratives that capture the essence of your vision.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                {['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro'].map(tool => (
                  <span key={tool} className="text-[10px] uppercase tracking-widest px-4 py-2 bg-white/5 rounded-full border border-white/10">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/mgolnpov', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 px-6 md:px-12 bg-brand-black relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8">LET'S <br /> COLLAB.</h2>
            <p className="text-lg text-brand-white/60 mb-10 max-w-md">
              Ready to take your project to the next level? Drop us a line and let's discuss your vision.
            </p>
            
            <div className="space-y-8">
              <a href="mailto:hello@nodestree.media" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-accent transition-colors">
                  <Mail className="w-5 h-5 group-hover:text-brand-accent transition-colors" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest opacity-50 block mb-1">Email Us</span>
                  <span className="text-lg font-bold">hello@nodestree.media</span>
                </div>
              </a>
              
              <div className="flex gap-4">
                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a 
                    key={i}
                    href="#" 
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Name</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Email</label>
                <input 
                  required
                  name="email"
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Project Type</label>
              <select name="projectType" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors appearance-none text-sm">
                <option>Commercial</option>
                <option>Music Video</option>
                <option>Documentary</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Message</label>
              <textarea 
                required
                name="message"
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors resize-none text-sm"
                placeholder="Tell us about your project..."
              />
            </div>
            
            <button 
              disabled={status === 'loading'}
              className={cn(
                "w-full font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 group text-sm",
                status === 'loading' ? "bg-zinc-800 cursor-not-allowed" : 
                status === 'success' ? "bg-emerald-600 text-white" :
                status === 'error' ? "bg-rose-600 text-white" :
                "bg-brand-accent text-white hover:bg-brand-accent/90"
              )}
            >
              {status === 'loading' ? 'SENDING...' : 
               status === 'success' ? 'MESSAGE SENT' : 
               status === 'error' ? 'TRY AGAIN' : 
               'SEND MESSAGE'}
              {status === 'idle' && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
              {status === 'success' && <CheckCircle2 className="w-5 h-5" />}
              {status === 'error' && <X className="w-5 h-5" />}
            </button>

            {status === 'success' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-emerald-500 text-[10px] font-bold uppercase tracking-widest"
              >
                Thank you! We'll get back to you shortly.
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-rose-500 text-[10px] font-bold uppercase tracking-widest"
              >
                Something went wrong. Please try again or email us directly.
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-brand-black">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-xl font-display font-bold tracking-tighter">
          nodestree.media
        </div>
        <div className="text-[10px] uppercase tracking-widest opacity-30">
          © 2024 NODESTREE MEDIA. ALL RIGHTS RESERVED.
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-[10px] uppercase tracking-widest hover:text-brand-accent transition-colors">Privacy Policy</a>
          <a href="#" className="text-[10px] uppercase tracking-widest hover:text-brand-accent transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
