import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";

const journeyCards = [
  {
    title: "The Journey of Devarshi Patel",
    description: `Went viral on <span class="highlight">MTV Roadies Season 6</span> with a bold coffin stunt, igniting a passion for entertaining and inspiring.`,
    icon: "🚀",
    year: "2008",
    stats: "Thousands of Views"
  },
  {
    title: "Roadies Journey: A Battle of Wits and Strength",
    description: `Performed at <span class="highlight">Numerous events</span> mastering the art of blending humor with heartfelt lessons.`,
    icon: "🎭",
    year: "2009-2015",
    stats: "Numerous Events"
  },
  {
    title: "A Legacy of Authenticity",
    description: `Crafted relatable content for brands, reaching millions by turning raw moments into stories that connect.`,
    icon: "🎬",
    year: "2016-2020",
    stats: "Great Reach"
  },
  {
    title: "Devarshi is now an Inspirational Comedian",
    description: `Transforming <span class="highlight">pain</span> into purpose to inspire teams, communities, and brands worldwide.`,
    icon: "✨",
    year: "2021-Present",
    stats: "Global Impact"
  },
];

const TimelineCard = ({ item, index, isActive, setActiveCard }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { 
    once: true, 
    margin: "-100px 0px -100px 0px" 
  });

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      x: index % 2 === 0 ? -100 : 100,
      rotateY: -15 
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 1],
        delay: 0.2
      }
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.2,
      rotate: 15,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <div ref={cardRef} className="relative flex items-center">
      {/* Card */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        whileHover="hover"
        onHoverStart={() => setActiveCard(index)}
        className={`relative w-full md:w-2/5 p-8 rounded-2xl backdrop-blur-lg border-2 shadow-2xl cursor-pointer
          ${index % 2 === 0 ? "mr-auto" : "ml-auto"}
          ${isActive 
            ? "bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-blue-400 shadow-blue-500/25" 
            : "bg-gray-900/40 border-gray-700 hover:border-blue-500/50"
          }
        `}
        style={{
          background: isActive 
            ? "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)"
            : "rgba(17, 24, 39, 0.4)"
        }}
      >
        {/* Stats Badge */}
        <motion.div
          className="absolute -top-4 right-8 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-sm font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          whileHover={{ scale: 1.1 }}
        >
          {item.stats}
        </motion.div>

        {/* Icon */}
        <motion.div
          className="text-6xl mb-6 flex justify-center"
          variants={iconVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
        >
          {item.icon}
        </motion.div>

        {/* Content */}
        <motion.div variants={contentVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            {item.title}
          </motion.h3>
          
          <motion.p
            className="text-base md:text-lg leading-relaxed text-gray-300 text-center"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </motion.div>

        {/* Glow Effect */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{
                filter: "blur(20px)",
                zIndex: -1
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Timeline Dot */}
      <motion.div
        className="absolute w-6 h-6 rounded-full border-4 border-white shadow-lg"
        style={{
          left: "49%",
          top: "3rem",
          transform: "translateX(-50%)",
          zIndex: 4,
          background: isActive 
            ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" 
            : "linear-gradient(135deg, #60a5fa, #a78bfa)"
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ delay: 0.8, duration: 0.4, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.3 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={isActive ? {
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.4)",
              "0 0 0 20px rgba(59, 130, 246, 0)",
              "0 0 0 0 rgba(59, 130, 246, 0)"
            ]
          } : {}}
          transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
        />
      </motion.div>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const timelineProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100]);

  useEffect(() => {
    // Smooth Particle System
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resizeCanvas = () => {
      if (canvas && sectionRef.current) {
        canvas.width = window.innerWidth;
        canvas.height = sectionRef.current.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Optimized particle system
    const particles = [];
    const particleCount = Math.min(40, Math.floor(window.innerWidth / 30));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        hue: Math.random() * 60 + 200,
        pulseSpeed: Math.random() * 0.01 + 0.005,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const animateParticles = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      particles.forEach((particle, i) => {
        // Smoother movement
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Smooth edge bouncing
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Gentle pulsing
        const pulse = Math.sin(time * particle.pulseSpeed + particle.pulseOffset) * 0.3;
        const currentRadius = particle.radius + pulse;
        const currentOpacity = Math.max(0.05, particle.opacity + pulse * 0.1);

        // Draw particle with smooth glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentRadius * 2
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 60%, 70%, ${currentOpacity})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 60%, 70%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Subtle connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(220, 40%, 60%, ${0.15 - distance / 800})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Smooth mouse tracking
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      if (sectionRef.current) {
        sectionRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-black py-32 text-blue-50 overflow-hidden"
      style={{
        position: 'relative',
        background: `
          radial-gradient(circle at 20% 20%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 119, 198, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 226, 0.1) 0%, transparent 50%),
          linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)
        `
      }}
    >
      {/* Animated Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />

      {/* Smooth Mouse Follower Effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(120, 119, 198, 0.08) 0%, transparent 70%)",
          zIndex: 2,
        }}
        animate={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
          scale: [1, 1.1, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 100, damping: 30 },
          y: { type: "spring", stiffness: 100, damping: 30 },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      />

      {/* Smooth Grid Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(120, 144, 156, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(120, 144, 156, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          zIndex: 0,
          y: backgroundY
        }}
      />

      {/* Smooth Timeline Line */}
      <div className="absolute left-1/2 top-72 bottom-32 w-1 -translate-x-1/2" style={{ zIndex: 2 }}>
        <div className="w-full h-full bg-gradient-to-b from-blue-400/30 via-purple-500/30 to-pink-500/30 rounded-full" />
        <motion.div
          className="absolute top-0 w-full bg-gradient-to-b from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/50 rounded-full"
          style={{
            height: useTransform(timelineProgress, (value) => `${Math.min(100, Math.max(0, value))}%`)
          }}
          initial={{ height: "0%" }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      {/* Enhanced Heading */}
      <motion.div
        className="text-center mb-24 relative"
        style={{ zIndex: 3 }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h2 
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-black via-blue-400 to-black bg-clip-text text-transparent mb-4"
          style={{ backgroundSize: "200% 100%" }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          My Journey
        </motion.h2>
        <motion.p
          className="text-lg text-blue-300 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          From viral moments to inspiring millions - discover the story behind the journey
        </motion.p>
      </motion.div>

      {/* Smooth Timeline Cards Container */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-32 px-4" style={{ zIndex: 3 }}>
        {journeyCards.map((item, index) => (
          <TimelineCard
            key={index}
            item={item}
            index={index}
            isActive={activeCard === index}
            setActiveCard={setActiveCard}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;