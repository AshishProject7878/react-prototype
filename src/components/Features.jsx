import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Mock GSAP and ScrollTrigger for this environment
const gsap = {
  utils: {
    toArray: (selector) => Array.from(document.querySelectorAll(selector))
  },
  set: (targets, vars) => {
    const elements = Array.isArray(targets) ? targets : [targets];
    elements.forEach(el => {
      Object.assign(el.style, {
        opacity: vars.opacity || 1,
        transform: `translate(${vars.x || 0}px, ${vars.y || 0}px)`
      });
    });
  },
  to: (targets, vars) => {
    const elements = Array.isArray(targets) ? targets : [targets];
    elements.forEach(el => {
      el.style.transition = `all ${vars.duration || 1}s ${vars.ease || 'ease'}`;
      Object.assign(el.style, {
        opacity: vars.opacity !== undefined ? vars.opacity : 1,
        transform: `translate(${vars.x || 0}px, ${vars.y || 0}px)`
      });
    });
  }
};

const ScrollTrigger = {
  batch: (elements, config) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && config.onEnter) {
          config.onEnter([entry.target]);
        }
      });
    }, { threshold: 0.2 });
    
    elements.forEach(el => observer.observe(el));
  }
};

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
    description: `Performed at <span class="highlight">Numerous  events</span> mastering the art of blending humor with heartfelt lessons.`,
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

const Features = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const timelineProgress = useTransform(scrollYProgress, [0.2, 0.8], [0, 100]);

  useEffect(() => {
    // Enhanced GSAP Animations
    const cards = gsap.utils.toArray(".timeline-card");
    const icons = gsap.utils.toArray(".card-icon");
    const titles = gsap.utils.toArray(".card-title");
    const descriptions = gsap.utils.toArray(".card-description");

    // Initial setup
    cards.forEach((card, i) => {
      gsap.set(card, {
        opacity: 0,
        y: 100,
        x: i % 2 === 0 ? -150 : 150,
      });
    });

    icons.forEach((icon) => {
      gsap.set(icon, { opacity: 0, y: 50 });
    });

    titles.forEach((title) => {
      gsap.set(title, { opacity: 0, x: -30 });
    });

    descriptions.forEach((desc) => {
      gsap.set(desc, { opacity: 0, y: 20 });
    });

    // Scroll-triggered animations
    ScrollTrigger.batch(cards, {
      onEnter: (batch) => {
        batch.forEach((card, i) => {
          const cardIndex = cards.indexOf(card);
          
          gsap.to(card, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
          });

          // Staggered icon animation
          setTimeout(() => {
            gsap.to(icons[cardIndex], {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
            });
          }, 200);

          // Title animation
          setTimeout(() => {
            gsap.to(titles[cardIndex], {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          }, 400);

          // Description animation
          setTimeout(() => {
            gsap.to(descriptions[cardIndex], {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          }, 600);
        });
      },
      start: "top 80%",
      once: true,
    });

    // Complex Particle System
    const canvas = canvasRef.current;
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

    // Enhanced particle system
    const particles = [];
    const particleCount = 50;
    const connections = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 60 + 200, // Blue spectrum
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const animateParticles = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Pulsing effect
        const pulse = Math.sin(time * particle.pulseSpeed + particle.pulseOffset);
        const currentRadius = Math.max(0.5, particle.radius + pulse * 1);
        const currentOpacity = Math.max(0.1, particle.opacity + pulse * 0.1);

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentRadius * 3
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 70%, 60%, ${currentOpacity})`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 70%, 60%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw connections
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `hsla(220, 50%, 50%, ${0.3 - distance / 500})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    // Mouse tracking
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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      rotateY: -15 
    },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      rotateY: 5,
      z: 50,
      transition: {
        duration: 0.3
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
        damping: 10
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.5 }
    }
  };

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

      {/* Mouse Follower Effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(120, 119, 198, 0.1) 0%, transparent 70%)",
          zIndex: 2,
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Dynamic Grid Background */}
      <motion.div
        className="absolute inset-0"
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

      {/* Animated Timeline Line */}
      <div className="absolute left-1/2 top-72 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-blue-400 via-purple-500 to-pink-500" style={{ zIndex: 2 }}>
        <motion.div
          className="w-full bg-gradient-to-b from-cyan-400 to-blue-600 shadow-lg shadow-blue-500/50"
          style={{
            height: timelineProgress.get() + "%",
          }}
          initial={{ height: "0%" }}
          animate={{ height: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </div>

      {/* Enhanced Heading */}
      <motion.div
        className="text-center mb-24 relative"
        style={{ zIndex: 3 }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h2 
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-black via-blue-500 to-black bg-clip-text text-transparent mb-4"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          My Journey
        </motion.h2>
        <motion.p
          className="text-lg text-white max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          From viral moments to inspiring millions - discover the story behind the journey
        </motion.p>
      </motion.div>

      {/* Enhanced Timeline Cards Container */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-32 px-4" style={{ zIndex: 3 }}>
        <AnimatePresence>
          {journeyCards.map((item, index) => (
            <div key={index} className="relative flex items-center">
              {/* Card */}
              <motion.div
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true, amount: 0.3 }}
                onHoverStart={() => setActiveCard(index)}
                className={`timeline-card relative w-full md:w-2/5 p-8 rounded-2xl backdrop-blur-lg border-2 shadow-2xl
                  ${index % 2 === 0 ? "mr-auto" : "ml-auto"}
                  ${activeCard === index 
                    ? "bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-blue-400 shadow-blue-500/25" 
                    : "bg-gray-900/40 border-gray-700 hover:border-blue-500/50"
                  }
                `}
                style={{
                  background: activeCard === index 
                    ? "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)"
                    : "rgba(17, 24, 39, 0.4)"
                }}
              >
                {/* Stats Badge */}
                <motion.div
                  className="absolute -top-4 right-8 px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full text-sm font-bold"
                  whileHover={{ scale: 1.1 }}
                >
                  {item.stats}
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="card-icon text-6xl mb-6 flex justify-center"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {item.icon}
                </motion.div>

                {/* Content */}
                <motion.h3 
                  className="card-title text-2xl md:text-3xl font-bold mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                  layoutId={`title-${index}`}
                >
                  {item.title}
                </motion.h3>
                
                <motion.p
                  className="card-description text-base md:text-lg leading-relaxed text-gray-300 text-center"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                  layoutId={`desc-${index}`}
                />

                {/* Glow Effect */}
                {activeCard === index && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      filter: "blur(20px)",
                      zIndex: -1
                    }}
                  />
                )}
              </motion.div>

              {/* Perfectly Aligned Dot - Now positioned absolutely relative to the center line */}
              <motion.div
                className="absolute w-6 h-6 rounded-full border-4 border-white shadow-lg"
                style={{
                  left: "49%",
                  top: "3rem",
                  transform: "translateX(-50%)",
                  zIndex: 4,
                  background: activeCard === index 
                    ? "linear-gradient(135deg, #3b82f6, #8b5cf6)" 
                    : "linear-gradient(135deg, #60a5fa, #a78bfa)"
                }}
                animate={{
                  scale: activeCard === index ? [1, 1.3, 1] : 1,
                }}
                transition={{
                  duration: 0.5,
                  repeat: activeCard === index ? Infinity : 0,
                }}
              />
              
              {/* Connection Line from Card to Dot */}
              <div 
                className={`absolute top-12 h-0.5 bg-gradient-to-r ${
                  index % 2 === 0 
                    ? "from-transparent to-transparent right-1/2" 
                    : "from-transparent to-transparent left-1/2"
                }`}
                style={{
                  width: "calc(50% - 3rem)",
                  zIndex: 2
                }}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Features;