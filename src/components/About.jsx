import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle1 from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    // Dynamic device detection
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const aspectRatio = screenWidth / screenHeight;
    const isMobile = screenWidth <= 768; // General mobile detection
    
    // Calculate dynamic values based on screen dimensions
    const getResponsiveValues = () => {
      const baseWidth = 375; // iPhone reference width
      const baseHeight = 667; // iPhone reference height
      
      const widthScale = screenWidth / baseWidth;
      const heightScale = screenHeight / baseHeight;
      
      // Dynamic height calculation based on screen size
      let dynamicHeight;
      if (screenHeight <= 700) {
        dynamicHeight = "400dvh";
      } else if (screenHeight <= 800) {
        dynamicHeight = "450dvh";
      } else if (screenHeight <= 900) {
        dynamicHeight = "500dvh";
      } else {
        dynamicHeight = "550dvh";
      }
      
      // Dynamic Y position for AboutFlexP based on screen height
      let dynamicY;
      if (screenHeight <= 700) {
        dynamicY = 50;
      } else if (screenHeight <= 800) {
        dynamicY = 150;
      } else if (screenHeight <= 900) {
        dynamicY = 250;
      } else {
        dynamicY = 300;
      }
      
      // Dynamic positioning for knowImg
      const dynamicLeft = Math.max(10, Math.min(15, 13 * widthScale));
      const dynamicTop = Math.max(5, Math.min(10, 7.2 * heightScale));
      
      return {
        height: dynamicHeight,
        yPosition: dynamicY,
        leftPosition: `${dynamicLeft}%`,
        topPosition: `${dynamicTop}%`,
        scale: Math.max(0.8, Math.min(1.3, widthScale))
      };
    };

    if (isMobile) {
      const responsiveValues = getResponsiveValues();
      
      gsap.set(".about-image img", { opacity: 1, scale: 1.3 });
      gsap.set(".AboutFlexP", { y: -100, zIndex: -1 });

      // Set initial clip-path as a small circle
      gsap.set(".mask-clip-path", {
        clipPath: "ellipse(40% 20% at 50% 50%)", // width: 40%, height: 20%
      });

      const mobileTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "top top",
          end: "+=500",
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      });

      mobileTimeline
        // Animate the ellipse to grow more vertically (height increases)
        .to(".mask-clip-path", {
          clipPath: "ellipse(70% 70% at 50% 50%)", // width and height both increased
          ease: "power1.inOut",
          duration: 1,
          scale: 1.2,
          height: responsiveValues.height,
        })
        .to(".knowImg", {
          left: responsiveValues.leftPosition,
          scale: responsiveValues.scale,
          top: responsiveValues.topPosition,
        })
        .to(
          ".AboutFlexP",
          {
            y: responsiveValues.yPosition,
            opacity: 1,
            zIndex: 1,
            duration: 1,
            scale: 0.9,
            top: "15%",
          },
          "-=0.5"
        );
    } else {
      // Desktop scrollTrigger animation (unchanged)
      const desktopTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#clip",
          start: "center center",
          end: "+=1500 bottom",
          scrub: 0.5,
          pin: true,
          height: "360dvh",
          pinSpacing: true,
          // markers: true,
        },
      });

      desktopTimeline.to(".mask-clip-path", {
        width: "100vw",
        height: "360dvh",
        borderRadius: 0,
      });
    }
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