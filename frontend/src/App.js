import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { ShoppingBag, Smartphone, Heart, Star, Menu, X, ChevronRight, Phone, MessageCircle, MapPin, Mail, Instagram, Facebook, Twitter, ArrowRight, CheckCircle, Users, Package, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import './App.css';

// Floating 3D Sphere Component
const FloatingOrb = ({ position, color, speed = 1 }) => {
  const meshRef = useRef();
  
  useEffect(() => {
    const animate = () => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.01 * speed;
        meshRef.current.rotation.y += 0.01 * speed;
      }
    };
    
    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, [speed]);

  return (
    <Sphere ref={meshRef} position={position} args={[1, 100, 200]} scale={0.8}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.5}
        speed={speed}
        roughness={0.2}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      let start = 0;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, end, duration]);
  
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

// Product Card Component
const ProductCard = ({ image, title, price, category, isNew = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="group relative bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isNew && (
        <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          New
        </div>
      )}
      
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-purple-300 font-medium">{category}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
          Rs. {price}
        </p>
        
        <motion.button
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center space-x-2 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://wa.me/94771234567', '_blank')}
        >
          <MessageCircle size={20} />
          <span>Order via WhatsApp</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ name, review, rating, avatar }) => {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} className="text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-300 mb-4 italic">"{review}"</p>
      <div className="flex items-center">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3" />
        <span className="text-white font-semibold">{name}</span>
      </div>
    </motion.div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const products = [
    {
      image: "https://images.unsplash.com/photo-1677773239794-e499bc6fce0b",
      title: "Premium Leather Handbag",
      price: "3,500",
      category: "Handbags",
      isNew: true
    },
    {
      image: "https://images.unsplash.com/photo-1706794440955-7f2cbca00bfc",
      title: "Designer Crossbody Bag",
      price: "2,800",
      category: "Handbags"
    },
    {
      image: "https://images.unsplash.com/photo-1645684084216-b52ba9e12aaf",
      title: "Wireless Earbuds Pro",
      price: "4,200",
      category: "Electronics",
      isNew: true
    },
    {
      image: "https://images.unsplash.com/photo-1606741965509-717b9fdd6549",
      title: "Smartphone Case Set",
      price: "1,500",
      category: "Electronics"
    }
  ];

  const testimonials = [
    {
      name: "Priya Perera",
      review: "Amazing quality bags! The leather is so soft and the design is perfect for daily use.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9a2f4a5?w=150"
    },
    {
      name: "Kamal Silva",
      review: "Fast delivery and excellent customer service. My new phone case is exactly what I wanted!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      name: "Nisha Fernando",
      review: "Nuvee Collection has the best trendy items. I've bought multiple bags and they're all perfect!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <ShoppingBag size={20} className="text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Nuvee Collection
              </span>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
              <a href="#products" className="hover:text-purple-400 transition-colors">Products</a>
              <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-2 rounded-full flex items-center space-x-2 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/94771234567', '_blank')}
              >
                <MessageCircle size={16} />
                <span>WhatsApp</span>
              </motion.button>
            </div>
            
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              className="absolute top-20 left-4 right-4 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <div className="flex flex-col space-y-4">
                <a href="#home" className="hover:text-purple-400 transition-colors">Home</a>
                <a href="#products" className="hover:text-purple-400 transition-colors">Products</a>
                <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
                <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
                <button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-full flex items-center justify-center space-x-2 transition-all duration-300"
                  onClick={() => window.open('https://wa.me/94771234567', '_blank')}
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <FloatingOrb position={[-2, 2, 0]} color="#8B5CF6" speed={0.5} />
            <FloatingOrb position={[2, -1, -2]} color="#EC4899" speed={0.8} />
            <FloatingOrb position={[0, -2, -1]} color="#3B82F6" speed={0.6} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
              style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            >
              Style. Utility. Everyday.
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Discover premium bags, cutting-edge electronics, and daily essentials that elevate your lifestyle.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full flex items-center space-x-2 shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={20} />
                <span>Shop Now</span>
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button
                className="border-2 border-white/30 hover:border-purple-400 text-white font-semibold py-4 px-8 rounded-full flex items-center space-x-2 backdrop-blur-xl transition-all duration-300"
                whileHover={{ scale: 1.05, borderColor: "#8B5CF6" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/94771234567', '_blank')}
              >
                <MessageCircle size={20} />
                <span>Contact Us</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Animated Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: 500, suffix: "+", label: "Happy Customers" },
              { icon: Package, value: 1000, suffix: "+", label: "Products Sold" },
              { icon: Star, value: 4.9, suffix: "/5", label: "Customer Rating" },
              { icon: Zap, value: 24, suffix: "h", label: "Fast Delivery" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="mb-4 flex justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <stat.icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Carefully curated collection of premium items that combine style, functionality, and exceptional quality.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-full flex items-center space-x-2 mx-auto transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/94771234567', '_blank')}
            >
              <span>View All Products</span>
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Nuvee Collection
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Born from a passion for quality and style, Nuvee Collection has become Sri Lanka's trusted destination for premium bags, electronics, and daily essentials.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                We believe that every item you carry should reflect your personality and enhance your lifestyle. Our curated collection combines international trends with local preferences, ensuring you always find something that's perfectly you.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: CheckCircle, title: "Quality Guaranteed", desc: "Every product is carefully selected and tested" },
                  { icon: Zap, title: "Fast Delivery", desc: "Island-wide delivery within 24-48 hours" },
                  { icon: Heart, title: "Customer First", desc: "Your satisfaction is our top priority" },
                  { icon: Star, title: "Trendy Collection", desc: "Always updated with latest fashion trends" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon size={16} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0" 
                  alt="Customer satisfaction"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.9★</div>
                  <div className="text-sm text-gray-300">Customer Rating</div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-sm text-gray-300">Happy Customers</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our valued customers have to say about their Nuvee Collection experience.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to elevate your style? We're here to help you find the perfect items for your lifestyle.
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-8">
                {[
                  { icon: MessageCircle, title: "WhatsApp", desc: "+94 77 123 4567", action: "https://wa.me/94771234567" },
                  { icon: Phone, title: "Call Us", desc: "+94 77 123 4567", action: "tel:+94771234567" },
                  { icon: Mail, title: "Email", desc: "hello@nuveecollection.lk", action: "mailto:hello@nuveecollection.lk" },
                  { icon: MapPin, title: "Location", desc: "Colombo, Sri Lanka", action: null }
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => contact.action && window.open(contact.action, '_blank')}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <contact.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{contact.title}</h4>
                      <p className="text-gray-300">{contact.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    rows="5"
                    placeholder="Your Message"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black/40 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <ShoppingBag size={16} className="text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Nuvee Collection
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for premium bags, electronics, and daily essentials in Sri Lanka.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-purple-400 transition-colors">Home</a></li>
                <li><a href="#products" className="text-gray-400 hover:text-purple-400 transition-colors">Products</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-purple-400 transition-colors">About</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-purple-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Handbags</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Electronics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">Daily Essentials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">New Arrivals</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">+94 77 123 4567</li>
                <li className="text-gray-400">hello@nuveecollection.lk</li>
                <li className="text-gray-400">Colombo, Sri Lanka</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Nuvee Collection. All rights reserved. Made with ❤️ in Sri Lanka.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;