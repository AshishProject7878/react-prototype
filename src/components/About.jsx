import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle1 from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    // Enhanced device detection
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMobile = screenWidth <= 768;
    
    // More comprehensive responsive calculations
    const getResponsiveValues = () => {
      // Base reference values
      const baseWidth = 375;
      const baseHeight = 667;
      
      const widthRatio = screenWidth / baseWidth;
      const heightRatio = screenHeight / baseHeight;
      
      // Dynamic height with more granular control
      let dynamicHeight;
      if (screenHeight <= 600) {
        dynamicHeight = "350dvh";
      } else if (screenHeight <= 700) {
        dynamicHeight = "400dvh";
      } else if (screenHeight <= 800) {
        dynamicHeight = "450dvh";
      } else if (screenHeight <= 900) {
        dynamicHeight = "500dvh";
      } else {
        dynamicHeight = "550dvh";
      }
      
      // Improved Y positioning to prevent text cutoff
      let dynamicY;
      let dynamicScale;
      
      if (screenHeight <= 600) {
        // Very small screens
        dynamicY = 20;
        dynamicScale = 0.75;
      } else if (screenHeight <= 700) {
        // Small screens  
        dynamicY = 50;
        dynamicScale = 0.8;
      } else if (screenHeight <= 800) {
        // Medium screens
        dynamicY = 120;
        dynamicScale = 0.85;
      } else if (screenHeight <= 900) {
        // Large screens
        dynamicY = 200;
        dynamicScale = 0.9;
      } else {
        // Extra large screens
        dynamicY = 300;
        dynamicScale = 0.9;
      }
      
      // Image positioning with better scaling
      const imageLeft = screenWidth <= 400 ? "8%" : "13%";
      const imageTop = screenHeight <= 700 ? "5%" : "7.2%";
      const imageScale = Math.max(1.0, Math.min(1.4, 1.2 * widthRatio));
      
      return {
        height: dynamicHeight,
        yPosition: dynamicY,
        textScale: dynamicScale,
        imageLeft: imageLeft,
        imageTop: imageTop,
        imageScale: imageScale
      };
    };

    if (isMobile) {
      const values = getResponsiveValues();
      
      // Clear any existing animations
      gsap.killTweensOf([".about-image img", ".AboutFlexP", ".mask-clip-path", ".knowImg"]);
      
      // Set initial states with more precise control
      gsap.set(".about-image img", { 
        opacity: 1, 
        scale: values.imageScale,
        clearProps: "transform" // Clear any conflicting transforms
      });
      
      gsap.set(".AboutFlexP", { 
        y: -100, 
        zIndex: -1,
        opacity: 0,
        scale: values.textScale,
        clearProps: "transform" // Clear conflicting transforms
      });

      gsap.set(".mask-clip-path", {
        clipPath: "ellipse(40% 20% at 50% 50%)",
        clearProps: "transform"
      });

      const mobileTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "top top",
          end: "+=500",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          refreshPriority: 1, // Higher priority for refresh
          onRefresh: () => {
            // Recalculate on refresh to handle orientation changes
            const newValues = getResponsiveValues();
            gsap.set(".AboutFlexP", { scale: newValues.textScale });
          }
        },
      });

      mobileTimeline
        .to(".mask-clip-path", {
          clipPath: "ellipse(70% 70% at 50% 50%)",
          ease: "power1.inOut",
          duration: 1,
          scale: 1.2,
          height: values.height,
        })
        .to(".knowImg", {
          left: values.imageLeft,
          scale: values.imageScale,
          top: values.imageTop,
          ease: "power2.out",
        })
        .to(
          ".AboutFlexP",
          {
            y: values.yPosition,
            opacity: 1,
            zIndex: 1,
            duration: 1,
            scale: values.textScale,
            top: "15%",
            ease: "power2.out",
          },
          "-=0.5"
        );
    } else {
      // Desktop timeline (unchanged)
      const desktopTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "center center",
          end: "+=1500 bottom",
          scrub: 0.5,
          pin: true,
          height: "360dvh",
          pinSpacing: true,
        },
      });

      desktopTimeline.to(".mask-clip-path", {
        width: "100vw",
        height: "360dvh",
        borderRadius: 0,
      });
    }

    // Handle resize events to prevent glitches
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  return (
    <div id="about" className="min-h-[310dvh] w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <AnimatedTitle1
          title="Know Me"
          line="Does this worl?"
          containerClass="mt-5 fanky-text"
        />
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="AboutFlex mask-clip-path about-image flex-center">
          <img
            src="img/KnowMe.png"
            alt="Background"
            className="absolute left-5 top-0 size-fit object-contain z-10 knowImg"
          />
          <p className="AboutFlexP absolute mt-20 right-12 top-96 transform -translate-y-1/2 max-w-xl text-right text-lg leading-relaxed text-white">
            🚀{" "}
            <span className="font-semibold text-primary "
              style={{ color: "#007BFF" }}
            >
              About Devarshi Patel
            </span>
            <br />
            <br />
            <span className="font-semibold" style={{ color: "#FF4C29" }}>
              MTV Roadies Fame | Inspirational Comedian | Full-Time Madman With
              a Mic
            </span>
            <br />
            <br />
            I'm Devarshi — the guy who lit up MTV Roadies 6.0 and carried that
            fire into real life.
            <br />
            <br />
            I'm not your average motivational speaker. I'm the first-ever
            "Inspirational Comedian" who mixes mic drops with mind-blows, jokes
            with josh, and serves it all with a side of Gujarati swag.
            <br />
            <br />
            <span className="font-semibold" style={{ color: "#007BFF" }}>Who Am I?</span>
            <br />
            From Roadies chaos to standing ovations — I turn madness into
            motivation.
            <br />
            <em className="block mt-2 text-primary font-semibold" style={{ color: "#00E6E6" }}>
              "Be loud. Be real. Be limitless."
            </em>
            <br />
            <br />
            <span className="font-semibold" style={{ color: "#007BFF" }}>What I Do:</span>
            <br />
            🎤 Comedy that hits home.
            <br />
            📈 Talks that fire up rooms.
            <br />
            📱 Reels that slap in 30 seconds.
            <br />
            🎬 Scene Kya Hai? — Comeback anthem.
            <br />
            <br />
            <span className="font-semibold" style={{ color: "#007BFF" }}>Why Me?</span>
            <br />
            Because I don't just speak — I spark. With Roadie guts and stand-up
            soul, I turn laughter into launchpads.
            <br />
            <br />
            🚨 <span className="text-primary font-semibold" style={{ color: "#FF4C29" }}>
              Disclaimer:
            </span>{" "}
            Expect clarity, chaos, and saying
            <br />
            <em style={{ color: "#00E6E6" }}>"Bhai, yeh toh fire hai!"</em>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;