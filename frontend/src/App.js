import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { ShoppingBag, Sparkles, Home, Baby, Users, Star, Menu, X, ChevronRight, Phone, MessageCircle, MapPin, Mail, Instagram, Facebook, Twitter, ArrowRight, CheckCircle, Package, Zap, Award, Heart, Crown } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import './App.css';

// Floating 3D Sphere Component with Luxury Colors
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

// Product Category Card Component
const CategoryCard = ({ image, title, description, icon: Icon, itemCount }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="group relative bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-emerald-500/20 shadow-2xl"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent" />
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-emerald-900 px-3 py-1 rounded-full text-sm font-bold">
          {itemCount}+ Items
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-2">
            <Icon size={24} className="text-emerald-900" />
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-emerald-100 mb-4">{description}</p>
        
        <motion.button
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-semibold py-3 px-6 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 border border-yellow-400/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://wa.me/94703743065', '_blank')}
        >
          <MessageCircle size={20} />
          <span>Shop Category</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Featured Product Card Component
const ProductCard = ({ image, title, price, category, isNew = false, discount = null }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="group relative bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-emerald-500/20 shadow-xl"
      whileHover={{ scale: 1.02, y: -3 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isNew && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-400 to-yellow-600 text-emerald-900 px-2 py-1 rounded-full text-xs font-bold">
          NEW
        </div>
      )}
      
      {discount && (
        <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-bold">
          -{discount}%
        </div>
      )}
      
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-yellow-400 font-medium">{category}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} className="text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{title}</h3>
        <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-3">
          Rs. {price}
        </p>
        
        <motion.button
          className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white font-semibold py-2 px-4 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.open('https://wa.me/94703743065', '_blank')}
        >
          <MessageCircle size={16} />
          <span>Order Now</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ name, review, rating, avatar, location }) => {
  return (
    <motion.div
      className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/20 shadow-xl"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={16} className="text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-emerald-100 mb-4 italic">"{review}"</p>
      <div className="flex items-center">
        <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-3 border-2 border-yellow-400/30" />
        <div>
          <span className="text-white font-semibold block">{name}</span>
          <span className="text-emerald-300 text-sm">{location}</span>
        </div>
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

  const categories = [
    {
      image: "https://images.unsplash.com/photo-1598528738936-c50861cc75a9",
      title: "Beauty Products",
      description: "Premium skincare, makeup, and beauty essentials",
      icon: Sparkles,
      itemCount: 150
    },
    {
      image: "https://images.unsplash.com/photo-1586208958839-06c17cacdf08",
      title: "Home & Kitchen",
      description: "Modern appliances and stylish home solutions",
      icon: Home,
      itemCount: 200
    },
    {
      image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c",
      title: "Kids' Toys",
      description: "Fun, educational toys for creative minds",
      icon: Baby,
      itemCount: 180
    },
    {
      image: "https://images.unsplash.com/photo-1650785468226-e415afc2bd9e",
      title: "Fashion Essentials",
      description: "Trendy accessories for women and men",
      icon: Crown,
      itemCount: 250
    }
  ];

  const featuredProducts = [
    {
      image: "https://images.pexels.com/photos/3993398/pexels-photo-3993398.jpeg",
      title: "Luxury Skincare Set",
      price: "4,500",
      category: "Beauty",
      isNew: true
    },
    {
      image: "https://images.pexels.com/photos/1450903/pexels-photo-1450903.jpeg",
      title: "Premium Stand Mixer",
      price: "12,800",
      category: "Kitchen",
      discount: 15
    },
    {
      image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1",
      title: "Educational Toy Set",
      price: "3,200",
      category: "Kids",
      isNew: true
    },
    {
      image: "https://images.pexels.com/photos/5778712/pexels-photo-5778712.jpeg",
      title: "Luxury Watch Collection",
      price: "8,900",
      category: "Fashion"
    }
  ];

  const testimonials = [
    {
      name: "Priya Jayasekara",
      review: "Amazing quality beauty products! My skin has never looked better. Fast delivery and excellent customer service.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9a2f4a5?w=150",
      location: "Colombo"
    },
    {
      name: "Kamal Perera",
      review: "The kitchen appliances are top-notch quality. Our new mixer has revolutionized our baking experience!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      location: "Kandy"
    },
    {
      name: "Nisha Fernando",
      review: "My kids absolutely love the toys we bought. Educational, fun, and great quality. Highly recommend Nuvee Collection!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      location: "Galle"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-emerald-950/80 backdrop-blur-xl border-b border-yellow-400/20"
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
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center font-bold text-emerald-900 text-xl">
                NC
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Nuvee Collection
                </span>
                <p className="text-emerald-300 text-xs">Premium Quality Products</p>
              </div>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-yellow-400 transition-colors">Home</a>
              <a href="#categories" className="hover:text-yellow-400 transition-colors">Categories</a>
              <a href="#products" className="hover:text-yellow-400 transition-colors">Products</a>
              <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
              <motion.button
                className="bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 px-6 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 border border-yellow-400/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/94703743065', '_blank')}
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
            className="fixed inset-0 z-40 bg-emerald-900/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              className="absolute top-20 left-4 right-4 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
            >
              <div className="flex flex-col space-y-4">
                <a href="#home" className="hover:text-yellow-400 transition-colors">Home</a>
                <a href="#categories" className="hover:text-yellow-400 transition-colors">Categories</a>
                <a href="#products" className="hover:text-yellow-400 transition-colors">Products</a>
                <a href="#about" className="hover:text-yellow-400 transition-colors">About</a>
                <a href="#contact" className="hover:text-yellow-400 transition-colors">Contact</a>
                <button
                  className="bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 px-6 py-3 rounded-full flex items-center justify-center space-x-2 transition-all duration-300 border border-yellow-400/30"
                  onClick={() => window.open('https://wa.me/94703743065', '_blank')}
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
            <FloatingOrb position={[-2, 2, 0]} color="#10B981" speed={0.5} />
            <FloatingOrb position={[2, -1, -2]} color="#FBBF24" speed={0.8} />
            <FloatingOrb position={[0, -2, -1]} color="#059669" speed={0.6} />
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
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center font-bold text-emerald-900 text-4xl mb-4">
                NC
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
              style={{ transform: `translateY(${scrollY * 0.5}px)` }}
            >
              Premium Quality
              <br />
              <span className="text-white">For Every Lifestyle</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Discover our curated collection of beauty products, home & kitchen appliances, fun kids' toys, and trendy essentials - all delivered with excellence across Sri Lanka.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <motion.button
                className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-emerald-900 font-bold py-4 px-8 rounded-full flex items-center space-x-2 shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 191, 36, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingBag size={20} />
                <span>Shop Now</span>
                <ArrowRight size={20} />
              </motion.button>
              
              <motion.button
                className="border-2 border-yellow-400/50 hover:border-yellow-400 text-white font-semibold py-4 px-8 rounded-full flex items-center space-x-2 backdrop-blur-xl transition-all duration-300"
                whileHover={{ scale: 1.05, borderColor: "#FBBF24" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://wa.me/94703743065', '_blank')}
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
          <div className="w-6 h-10 border-2 border-yellow-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-yellow-400/60 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emerald-950/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Users, value: 1000, suffix: "+", label: "Happy Customers" },
              { icon: Package, value: 2500, suffix: "+", label: "Products Sold" },
              { icon: Star, value: 4.9, suffix: "/5", label: "Customer Rating" },
              { icon: Award, value: 3, suffix: " Years", label: "Trusted Service" }
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
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                    <stat.icon size={24} className="text-emerald-900" />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-emerald-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Our Categories
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Explore our carefully curated categories, each featuring premium products that enhance your lifestyle and bring joy to your daily routine.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <CategoryCard {...category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-20 bg-emerald-950/50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Featured Products
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Handpicked premium items that represent the best in quality, style, and functionality across all our categories.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
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
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-emerald-900 font-bold py-4 px-8 rounded-full flex items-center space-x-2 mx-auto transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/94703743065', '_blank')}
            >
              <span>View All Products</span>
              <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                About Nuvee Collection
              </h2>
              <p className="text-xl text-emerald-100 mb-6 leading-relaxed">
                Founded with a vision to bring premium quality products to every Sri Lankan home, Nuvee Collection has become synonymous with excellence, trust, and style.
              </p>
              <p className="text-lg text-emerald-200 mb-8 leading-relaxed">
                From luxury beauty products that make you glow, to innovative home appliances that simplify your life, educational toys that spark creativity, and trendy essentials that define your style - we curate only the finest for our valued customers.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { icon: CheckCircle, title: "Premium Quality", desc: "Only the finest products make it to our collection" },
                  { icon: Zap, title: "Island-wide Delivery", desc: "Fast and reliable delivery across Sri Lanka" },
                  { icon: Heart, title: "Customer Satisfaction", desc: "Your happiness is our greatest achievement" },
                  { icon: Award, title: "Trusted Brand", desc: "3+ years of consistent quality and service" }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <feature.icon size={16} className="text-emerald-900" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{feature.title}</h4>
                      <p className="text-emerald-300 text-sm">{feature.desc}</p>
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
                  src="https://images.unsplash.com/photo-1658295474066-6936d5a563a2" 
                  alt="Luxury shopping experience"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/50 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <motion.div
                className="absolute -top-4 -right-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-yellow-400/30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">4.9★</div>
                  <div className="text-sm text-emerald-300">Customer Rating</div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-yellow-400/30"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">1000+</div>
                  <div className="text-sm text-emerald-300">Happy Customers</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-emerald-950/50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Customer Stories
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Real experiences from our valued customers across Sri Lanka who trust Nuvee Collection for their premium needs.
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
      <section id="contact" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              Ready to experience premium quality? Connect with us through WhatsApp for instant service and personalized recommendations.
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
                  { icon: MessageCircle, title: "WhatsApp", desc: "070 374 3065", action: "https://wa.me/94703743065" },
                  { icon: Phone, title: "Call Us", desc: "070 374 3065", action: "tel:+94703743065" },
                  { icon: Facebook, title: "Facebook", desc: "Follow us for updates", action: "#" },
                  { icon: MapPin, title: "Location", desc: "Island-wide Delivery, Sri Lanka", action: null }
                ].map((contact, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-emerald-500/20 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => contact.action && window.open(contact.action, '_blank')}
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <contact.icon size={20} className="text-emerald-900" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{contact.title}</h4>
                      <p className="text-emerald-300">{contact.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/20"
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
                    className="w-full px-4 py-3 bg-white/10 border border-emerald-500/20 rounded-xl text-white placeholder-emerald-300 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-white/10 border border-emerald-500/20 rounded-xl text-white placeholder-emerald-300 focus:outline-none focus:border-yellow-400 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    rows="5"
                    placeholder="Your Message"
                    className="w-full px-4 py-3 bg-white/10 border border-emerald-500/20 rounded-xl text-white placeholder-emerald-300 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-emerald-900 font-bold py-3 px-6 rounded-xl transition-all duration-300"
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
      <footer className="py-12 bg-emerald-950/80 border-t border-yellow-400/20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center font-bold text-emerald-900 text-lg">
                  NC
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Nuvee Collection
                </span>
              </div>
              <p className="text-emerald-300 mb-4">
                Your trusted partner for premium beauty products, home appliances, kids' toys, and fashion essentials in Sri Lanka.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-emerald-400 hover:text-yellow-400 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-emerald-400 hover:text-yellow-400 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-emerald-400 hover:text-yellow-400 transition-colors">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-emerald-400 hover:text-yellow-400 transition-colors">Home</a></li>
                <li><a href="#categories" className="text-emerald-400 hover:text-yellow-400 transition-colors">Categories</a></li>
                <li><a href="#products" className="text-emerald-400 hover:text-yellow-400 transition-colors">Products</a></li>
                <li><a href="#about" className="text-emerald-400 hover:text-yellow-400 transition-colors">About</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-emerald-400 hover:text-yellow-400 transition-colors">Beauty Products</a></li>
                <li><a href="#" className="text-emerald-400 hover:text-yellow-400 transition-colors">Home & Kitchen</a></li>
                <li><a href="#" className="text-emerald-400 hover:text-yellow-400 transition-colors">Kids' Toys</a></li>
                <li><a href="#" className="text-emerald-400 hover:text-yellow-400 transition-colors">Fashion Essentials</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2">
                <li className="text-emerald-400">070 374 3065</li>
                <li className="text-emerald-400">Facebook & WhatsApp</li>
                <li className="text-emerald-400">Island-wide Delivery</li>
                <li className="text-emerald-400">Sri Lanka</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-yellow-400/20 mt-8 pt-8 text-center">
            <p className="text-emerald-400">
              © 2025 Nuvee Collection. All rights reserved. Premium Quality • Island-wide Delivery • Made with ❤️ in Sri Lanka.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;