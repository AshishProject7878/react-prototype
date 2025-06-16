import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import AnimatedTitle1 from "./AnimatedTitle";

// Animated Staggered Text Component (unchanged)
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
    hidden: { opacity: 0, y: 50, rotateX: -90 },
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
          {word} 
        </motion.span>
      ))}
    </motion.div>
  );
};

// Video Card Component (unchanged)
const VideoCard = ({ podcast, index }) => {
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
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="video-card relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg h-[450px] lg:h-[400px] max-w-[400px] lg:max-w-[450px] mx-auto"
      initial={{ opacity: 0, y: 100, rotateX: -45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.6, 0.01, 0.05, 0.95] }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transition: "transform 0.1s ease-out",
        transformStyle: "preserve-3d",
        backgroundColor: "#1C1C1C",
        border: "1px solid #333",
      }}
    >
      <div className="relative backdrop-blur-xl rounded-2xl p-4 flex flex-col h-full">
        <motion.div
          className="rounded-xl overflow-hidden mb-4 aspect-[16/9] flex-shrink-0 w-full"
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
        <motion.div
          className="flex-grow min-h-[120px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
            {podcast.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed line-clamp-4">
            {podcast.description}
          </p>
        </motion.div>
        <motion.div
          className="flex items-center justify-between text-xs text-gray-500 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
          viewport={{ once: true }}
        >
          <span className="flex items-center space-x-1">
            <span>🎧</span>
            <span>{podcast.duration}</span>
          </span>
          <span>Video</span>
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-white/5 opacity-0 rounded-2xl pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Short Card Component (modified for mobile responsiveness)
const ShortCard = ({ podcast, index }) => {
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
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="short-card relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg h-[480px] sm:h-[440px] w-full sm:w-[200px] lg:max-w-[225px] flex-shrink-0"
      initial={{ opacity: 0, y: 100, rotateX: -45 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.6, 0.01, 0.05, 0.95] }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        transition: "transform 0.1s ease-out",
        transformStyle: "preserve-3d",
        backgroundColor: "#1C1C1C",
        border: "1px solid #333",
      }}
    >
      <div className="relative backdrop-blur-xl rounded-2xl p-3 flex flex-col h-full">
        <motion.div
          className="rounded-xl overflow-hidden mb-3 aspect-[9/16] flex-shrink-0 w-full"
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
        <motion.div
          className="flex-grow min-h-[100px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm font-bold text-white mb-1 line-clamp-2">
            {podcast.title}
          </h3>
          <p className="text-gray-400 text-[10px] leading-relaxed line-clamp-4">
            {podcast.description}
          </p>
        </motion.div>
        <motion.div
          className="flex items-center justify-between text-[10px] text-gray-500 mt-1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
          viewport={{ once: true }}
        >
          <span>Short</span>
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-white/5 opacity-0 rounded-2xl pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

// Main Section (modified for mobile visibility of Shorts)
const PodcastSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const [activeTab, setActiveTab] = useState("videos");

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const podcasts = [
    {
      videoId: "GmSJ76YUI3o",
      episode: "01",
      title: "THE RETURN OF DEVARSHI PATEL",
      description:
        "Devarshi Patel, is an ex Roadies contestant. The man with the most entertaining, viral and remembered Roadies Audition is back with his Motivational talks.",
      duration: "55:22",
      category: "video",
    },
    {
      videoId: "XtUFYzY3sW8",
      episode: "02",
      title: "Devarshi Patel | Roadies 6 Fame",
      description:
        "This is the 6th Episode of our new series, Ek Mulaqat which we have begun to give platform and encouragement to new and emerging talents.",
      duration: "27:59",
      category: "video",
    },
    {
      videoId: "9mFXHFeEXso",
      title: "Devarshi Patel gets reality check",
      category: "short",
    },
    {
      videoId: "fnevoGW25FE",
      title: "Devarshi Patel Podcast (Roadies Fame)",
      category: "short",
    },
    {
      videoId: "eta5w6tq8P8",
      title: "Devarshi Patel from Roadies 6 with a very inspirational and motivational message",
      category: "short",
    },
    {
      videoId: "lmsmMd_8N4s",
      title: "No One can Replace Devarshi | Raghu Ram",
      category: "short",
    },
    {
      videoId: "tt6hIwcIOsY",
      title: "Devarshi Patel",
      category: "short",
    },
    {
      videoId: "RsM5vrrBiTU",
      title: "Devarshi Patel from Roadies 6.0 has a very important and inspirational message for the viewers",
      category: "short",
    },
    {
      videoId: "sQA8zxSZkh8",
      title: "Devarshi Patel from Roadies 6.0 has a very important and inspirational message for the viewers",
      category: "short",
    },
    {
      videoId: "BYjO5virVUk",
      episode: "04",
      title: "STAGE FEAR, CONFIDENCE ...",
      description:
        "Devarshi Patel: રોડીઝ લિજેન્ડની જર્નીરોડીઝના જાણીતા સ્પર્ધક દેવર્ષિ પટેલને દર્શાવતા મનમોહક એપિસોડ માટે અમારી સાથે જોડાઓ, જેમણે શો અને દર્શકોના હૃદય પર અમીટ છાપ છોડી દીધી છે. ",
      duration: "48:27",
      category: "video",
    },
  ];

  const videos = podcasts.filter((podcast) => podcast.category === "video");
  const shorts = podcasts.filter((podcast) => podcast.category === "short");

  return (
    <div
      ref={sectionRef}
      id="podcast"
      className="min-h-screen w-full relative overflow-hidden"
      style={{ backgroundColor: "#1C1C1C", color: "#fff" }}
    >
      <motion.div
        className="flex size-full flex-col items-center py-20 pb-24 relative z-10"
        style={{ y, opacity }}
      >
        <div className="relative size-full max-w-7xl mx-auto px-4">
          {/* Header (unchanged) */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative flex flex-col items-center gap-5">
              <AnimatedTitle1
                title="Featured Podcasts"
                line="Does this worl?"
                containerClass="mb-5 text-center"
                style={{
                  marginTop: "-30px",
                }}
              />
            </div>
            <motion.p
              className="text-xl max-w-3xl mx-auto leading-relaxed text-gray-400"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Dive deep into conversations about storytelling, branding, and digital innovation.
              Each episode brings fresh insights and actionable strategies from industry leaders.
            </motion.p>
          </motion.div>

          {/* Tabs (unchanged) */}
          <div className="flex justify-center mb-8">
            <button
              className={`px-4 py-2 mx-2 text-lg font-semibold rounded-lg transition-colors ${
                activeTab === "videos"
                  ? "bg-white text-black"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("videos")}
            >
              Videos
            </button>
            <button
              className={`px-4 py-2 mx-2 text-lg font-semibold rounded-lg transition-colors ${
                activeTab === "shorts"
                  ? "bg-white text-black"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("shorts")}
            >
              Shorts
            </button>
          </div>

          {/* Videos Section (unchanged) */}
          {activeTab === "videos" && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Videos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
                {videos.map((podcast, index) => (
                  <motion.div
                    key={index}
                    className="rounded-2xl overflow-hidden flex items-center justify-center"
                  >
                    <VideoCard podcast={podcast} index={index} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Shorts Section (modified for mobile) */}
          {activeTab === "shorts" && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Shorts</h3>
              <div className="flex flex-col gap-6 sm:grid sm:grid-cols-3 lg:grid-cols-5 auto-rows-[440px]">
                {shorts.map((podcast, index) => (
                  <motion.div
                    key={index}
                    className="rounded-2xl overflow-hidden flex items-center justify-center"
                  >
                    <ShortCard podcast={podcast} index={index} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PodcastSection;