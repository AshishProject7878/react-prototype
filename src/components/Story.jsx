import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";

const StaggeredText = ({ title, containerClass }) => {
  const titleRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.3 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    },
  };

  return (
    <motion.div
      ref={titleRef}
      className={`staggered-text ${containerClass}`}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      id="podcast"
    >
      {title.split(" ").map((word, index) => (
        <motion.span
          key={index}
          className="staggered-word inline-block"
          variants={wordVariants}
          style={{
            fontFamily: "Zentry, sans-serif",
            fontWeight: "900",
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.div>
  );
};

const PodcastCard = ({ podcast, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="podcast-card relative group cursor-pointer"
      initial={{ opacity: 0, y: 100, rotateX: -45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.6, 0.01, 0.05, 0.95]
      }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      
      style={{ 
        transition: 'transform 0.1s ease-out',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glowing Background */}
      <motion.div
        className="absolute -inset-1 rounded-2xl blur opacity-25"
        style={{ 
          background: 'linear-gradient(45deg, #007BFF, #00E6E6, #FF4C29)'
        }}
        animate={{
          opacity: isHovered ? 0.5 : 0.25,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main Card */}
      <div 
        className="relative backdrop-blur-xl rounded-2xl p-6 overflow-hidden"
        style={{ 
          backgroundColor: 'rgba(28, 28, 28, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          border: '1px solid'
        }}
      >
        {/* Animated Background Gradients */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl"
            style={{ backgroundColor: '#007BFF' }}
            animate={{
              x: isHovered ? 20 : 0,
              y: isHovered ? -10 : 0,
              scale: isHovered ? 1.2 : 1
            }}
            transition={{ duration: 0.6 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-2xl"
            style={{ backgroundColor: '#00E6E6' }}
            animate={{
              x: isHovered ? -15 : 0,
              y: isHovered ? 10 : 0,
              scale: isHovered ? 1.3 : 1
            }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Video Container */}
          <motion.div
            className="aspect-video rounded-xl overflow-hidden mb-6 bg-gray-900"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${podcast.videoId}?rel=0&modestbranding=1`}
              title={podcast.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>

          {/* Episode Info */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-3">
              Episode {podcast.episode}
            </span>
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
              {podcast.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
              {podcast.description}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex items-center justify-between text-sm text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <span>🎧</span>
                <span>{podcast.duration}</span>
              </span>
              
            </div>
           
          </motion.div>
        </div>

        {/* Hover Effect Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 rounded-2xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const PodcastSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Replace these videoId values with your actual YouTube video IDs
  // To get the video ID: from URL https://www.youtube.com/watch?v=YOUR_VIDEO_ID
  // Just copy the part after "v=" 
  const podcasts = [
    {
      videoId: "GmSJ76YUI3o", // 🔴 REPLACE: Paste your first video ID here
      episode: "01",
      title: "THE RETURN OF DEVARSHI PATEL",
      description: "Devarshi Patel, is an ex Roadies contestant. The man with the most entertaining , viral and remembered Roadies Audition is back with his Motivational talks.",
      duration: "55:22",
    },
    {
      videoId: "XtUFYzY3sW8", // 🔴 REPLACE: Paste your second video ID here  
      episode: "02", 
      title: "Devarshi Patel | Roadies 6 Fame",
      description: "This is the 6th Episode of our new series, Ek Mulaqat which we have begun to give platform and encouragement to new and emerging talents.",
      duration: "27:59",
    },
    {
      videoId: "Kkq5MRHH-Wk", // 🔴 REPLACE: Paste your third video ID here
      episode: "03",
      title: "In Conversation with Devarshi...",
      description: "A detail conversation with EX-Roadies #devarshipatel regarding his journey in Roadies , his current life , His experiences and lot more.",
      duration: "48:27",
    }
  ];

  return (
    <div 
      ref={sectionRef}
      id="podcast" 
      className="min-h-screen w-full relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #1C1C1C 0%, #000000 50%, #1C1C1C 100%)',
        color: '#fff'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl"
          style={{ backgroundColor: '#007BFF' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ backgroundColor: '#00E6E6' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-3/4 left-1/2 w-48 h-48 rounded-full blur-3xl"
          style={{ backgroundColor: '#FF4C29' }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <motion.div 
        className="flex size-full flex-col items-center py-20 pb-24 relative z-10"
        style={{ y, opacity }}
      >
        <div className="relative size-full max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <StaggeredText
              title="Featured Podcasts"
              containerClass="text-5xl md:text-7xl font-black bg-gradient-to-r from-black via-blue-500 to-black bg-clip-text text-transparent mb-6"
            />
            <motion.p
              className="text-xl max-w-3xl mx-auto leading-relaxed"
              style={{ color: '#6C757D' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Dive deep into conversations about storytelling, branding, and digital innovation. 
              Each episode brings fresh insights and actionable strategies from industry leaders.
            </motion.p>
          </motion.div>

          {/* Podcast Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {podcasts.map((podcast, index) => (
              <PodcastCard key={index} podcast={podcast} index={index} />
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >

          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PodcastSection;