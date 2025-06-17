import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
} from "framer-motion";
import AnimatedTitle1 from "./AnimatedTitle";

const journeyCards = [
  {
    title: "The Journey of Devarshi Patel",
    description: `Went viral on <span class="highlight">MTV Roadies Season 6</span> with a bold coffin stunt, igniting a passion for entertaining and inspiring.`,
    color: "#FF4C29",
    image: "/img/journey-1.jpg",
  },
  {
    title: "Roadies Journey: A Battle of Wits and Strength",
    description: `Performed at <span class="highlight">Numerous events</span> mastering the art of blending humor with heartfelt lessons.`,
    color: "#007BFF",
    image: "/img/Journey-2.jpg",
  },
  {
    title: "A Legacy of Authenticity",
    description: `Crafted relatable content for brands, reaching millions by turning raw moments into stories that connect.`,
    color: "#00E6E6",
    image: "/img/dp3.jpg",
  },
  {
    title: "Devarshi is now an Inspirational Comedian",
    description: `Transforming <span class="highlight">pain</span> into purpose to inspire teams, communities, and brands worldwide.`,
    color: "#007BFF",
    image: "/img/LogoImage.png",
  },
];

const TimelineCard = ({ item, index, isActive, setActiveCard }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, {
    once: true,
    margin: "-100px 0px -100px 0px",
  });

  const isDesktop = window.innerWidth >= 768;

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: index % 2 === 0 && isDesktop ? -100 : index % 2 !== 0 && isDesktop ? 100 : 0,
      rotateY: isDesktop ? -15 : 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 1],
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
      filter: "grayscale(100%)",
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: isActive ? "grayscale(0%)" : "grayscale(100%)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 1],
        delay: 0.4,
        filter: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
    },
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
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 15,
      transition: { duration: 0.3 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={cardRef} className="relative flex items-center justify-center">
      <motion.div
        className={`card-Box flex flex-col md:flex-row items-center justify-center w-full md:w-5/6 ${
          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        } gap-8`}
        style={{
          transform:
            isDesktop && index % 2 === 0
              ? "translateX(-10%)"
              : isDesktop && index % 2 !== 0
              ? "translateX(10%)"
              : "none",
        }}
      >
        <motion.img
          src={item.image}
          alt={item.title}
          variants={imageVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="card-Image hidden md:block w-2/5 h-auto object-cover rounded-2xl shadow-2xl"
          style={{ maxHeight: "300px", objectPosition: "50% 0" }}
        />

        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover="hover"
          onHoverStart={() => setActiveCard(index)}
          onHoverEnd={() => setActiveCard(null)}
          className="relative card-Box w-full md:w-2/5 p-8 rounded-2xl backdrop-blur-lg border-2 shadow-2xl cursor-pointer"
          style={{
            background: isActive ? `${item.color}20` : "rgba(17, 24, 39, 0.4)",
            borderColor: item.color,
            boxShadow: isActive ? `0 0 25px ${item.color}40` : undefined,
          }}
        >
          <motion.div
            className="text-6xl mb-6 flex justify-center"
            variants={iconVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
          >
            {item.icon}
          </motion.div>

          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3
              className="text-2xl md:text-3xl font-bold mb-4 text-center"
              style={{ color: item.color }}
            >
              {item.title}
            </motion.h3>

            <motion.p
              className="text-base md:text-lg leading-relaxed text-gray-300 text-center"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </motion.div>

          <AnimatePresence>
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={{
                  backgroundColor: `${item.color}33`,
                  filter: "blur(20px)",
                  zIndex: -1,
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};


const Features = () => {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const timelineProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100]);

  const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const titleRotate = useTransform(scrollYProgress, [0, 0.3], [45, 0]);

  const subtitleX = useTransform(scrollYProgress, [0.1, 0.4], [-50, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const originalText = title.textContent;
    const chars = originalText.split("");

    title.innerHTML = chars
      .map(
        (char, i) =>
          `<span class="char" style="display: inline-block; transition: transform 0.6s ease;">${
            char === " " ? " " : char
          }</span>`
      )
      .join("");

    const charElements = title.querySelectorAll(".char");

    let animationInterval;
    let isVisible = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            isVisible = true;
            animationInterval = setInterval(() => {
              charElements.forEach((char, i) => {
                setTimeout(() => {
                  char.style.transform = "translateY(-20px) scale(1.1)";
                  char.style.color = "#99ccff";

                  setTimeout(() => {
                    char.style.transform = "translateY(0px) scale(1)";
                    char.style.color = "#007BFF";
                  }, 300);
                }, i * 100);
              });
            }, 3000);
          } else if (!entry.isIntersecting && isVisible) {
            isVisible = false;
            clearInterval(animationInterval);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(title);

    return () => {
      observer.disconnect();
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-32 text-blue-50 overflow-hidden"
      style={{ backgroundColor: "#1C1C1C" }}
    >
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(120, 144, 156, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(120, 144, 156, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          zIndex: 0,
          y: backgroundY,
        }}
      />

      <div
        className="timelineLine absolute left-1/2 top-72 bottom-32 w-1 -translate-x-1/2"
        style={{ zIndex: 2 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{ backgroundColor: "rgba(0, 123, 255, 0.3)" }}
        />
        <motion.div
          className="absolute top-0 w-full shadow-lg rounded-full"
          style={{
            backgroundColor: "#007BFF",
            boxShadow: "0 0 15px rgba(0, 123, 255, 0.5)",
            height: useTransform(
              timelineProgress,
              (value) => `${Math.min(100, Math.max(0, value))}%`
            ),
          }}
          initial={{ height: "0%" }}
          transition={{ ease: "easeOut" }}
        />
      </div>

      <div className="text-center mb-24 relative" style={{ zIndex: 3 }}>
        <div className="relative mb-8 flex flex-col items-center gap-5">
          <AnimatedTitle1
            title="My Journey"
            containerClass="mt-5 text-center"
          />
        </div>
        <motion.p
          ref={subtitleRef}
          className="text-lg max-w-2xl mx-auto"
          style={{
            color: "#99ccff",
            x: subtitleX,
            opacity: subtitleOpacity,
          }}
        >
          From viral moments to inspiring millions - discover the story behind
          the journey
        </motion.p>
      </div>

      <div
        className="relative mx-auto flex w-full max-w-7xl flex-col gap-32 px-4"
        style={{ zIndex: 3 }}
      >
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
