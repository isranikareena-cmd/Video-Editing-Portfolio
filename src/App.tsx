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
  Clock
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
    <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
      {/* Background Video Placeholder/Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/20 via-brand-black/60 to-brand-black z-10" />
        <img 
          src="https://picsum.photos/seed/studio/1920/1080?blur=2" 
          className="w-full h-full object-cover opacity-40"
          alt="Studio background"
          referrerPolicy="no-referrer"
        />
      </div>

      <motion.div 
        style={{ y: y1, opacity }}
        className="relative z-20 text-center max-w-5xl"
      >
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block text-brand-accent font-display font-bold tracking-[0.3em] uppercase text-xs mb-6"
        >
          Premium Video Post-Production
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-[10vw] font-display font-bold leading-[0.9] mb-8 tracking-tighter"
        >
          WE CRAFT <br />
          <span className="text-stroke">STORIES</span> THAT <br />
          RESONATE.
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <a 
            href="#work"
            className="group flex items-center gap-3 bg-brand-white text-brand-black px-8 py-4 rounded-full font-bold hover:bg-brand-accent hover:text-brand-white transition-all duration-300"
          >
            VIEW OUR WORK
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <button className="flex items-center gap-3 text-brand-white hover:text-brand-accent transition-colors">
            <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-accent transition-colors">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <span className="text-sm font-bold tracking-widest uppercase">Watch Reel</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
      >
        <div className="w-px h-12 bg-brand-white" />
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
};

const Work = () => {
  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-brand-black">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-7xl font-bold mb-4">SELECTED WORK</h2>
            <p className="text-brand-white/50 max-w-md">
              A curated collection of projects where we pushed the boundaries of visual storytelling.
            </p>
          </div>
          <div className="flex gap-4">
            {['All', 'Commercial', 'Music Video', 'Short Film'].map((cat) => (
              <button 
                key={cat}
                className="text-xs uppercase tracking-widest font-bold px-4 py-2 border border-white/10 rounded-full hover:border-brand-accent transition-colors"
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
    <section id="services" className="py-24 px-6 md:px-12 bg-zinc-950">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-brand-accent font-display font-bold tracking-[0.3em] uppercase text-xs mb-6 block">
              What we do
            </span>
            <h2 className="text-5xl md:text-8xl font-bold mb-12 leading-tight">
              ELEVATING <br />
              YOUR <br />
              <span className="text-stroke">CONTENT</span>
            </h2>
            <p className="text-xl text-brand-white/60 mb-12 max-w-lg leading-relaxed">
              We provide end-to-end video post-production services tailored to your brand's unique voice. From raw footage to cinematic masterpieces.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-display font-bold text-brand-accent">150+</span>
                <span className="text-xs uppercase tracking-widest opacity-50">Projects Delivered</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-display font-bold text-brand-accent">50+</span>
                <span className="text-xs uppercase tracking-widest opacity-50">Happy Clients</span>
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

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-brand-black relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-screen-2xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-5xl md:text-8xl font-bold mb-8">LET'S <br /> COLLAB.</h2>
            <p className="text-xl text-brand-white/60 mb-12 max-w-md">
              Ready to take your project to the next level? Drop us a line and let's discuss your vision.
            </p>
            
            <div className="space-y-8">
              <a href="mailto:hello@nodestree.media" className="flex items-center gap-6 group">
                <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-accent transition-colors">
                  <Mail className="w-6 h-6 group-hover:text-brand-accent transition-colors" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest opacity-50 block mb-1">Email Us</span>
                  <span className="text-xl font-bold">hello@nodestree.media</span>
                </div>
              </a>
              
              <div className="flex gap-4">
                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <a 
                    key={i}
                    href="#" 
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:border-brand-accent transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Project Type</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors appearance-none">
                <option>Commercial</option>
                <option>Music Video</option>
                <option>Documentary</option>
                <option>Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Message</label>
              <textarea 
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button className="w-full bg-brand-accent text-white font-bold py-5 rounded-2xl hover:bg-brand-accent/90 transition-all flex items-center justify-center gap-3 group">
              SEND MESSAGE
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
