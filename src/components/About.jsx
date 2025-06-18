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
    const isMobile = screenWidth <= 768;

    // Calculate dynamic values based on screen dimensions
    const getResponsiveValues = () => {
      const baseWidth = 375; // iPhone reference width
      const baseHeight = 667; // iPhone reference height

      const widthScale = screenWidth / baseWidth;
      const heightScale = screenHeight / baseHeight;

      // Dynamic height calculation based on screen size
      const dynamicHeight = `clamp(350, ${450 * heightScale}, 550)dvh`;

      // Dynamic Y position for AboutFlexP based on screen height
      const dynamicY = Math.max(50, Math.min(300, 50 + (screenHeight - 700) * 0.5));

      // Dynamic positioning for knowImg
      const dynamicLeft = `clamp(10, ${13 * widthScale}, 15)%`;
      const dynamicTop = `clamp(5, ${7.2 * heightScale}, 10)%`;

      return {
        height: dynamicHeight,
        yPosition: dynamicY,
        leftPosition: dynamicLeft,
        topPosition: dynamicTop,
        scale: Math.max(0.8, Math.min(1.3, widthScale)),
        widthScale,
        heightScale,
      };
    };

    if (isMobile) {
      const responsiveValues = getResponsiveValues();

      gsap.set(".about-image img", { opacity: 1, scale: responsiveValues.scale });
      gsap.set(".AboutFlexP", { y: -100, zIndex: -1 });

      // Set initial clip-path as a small circle
      gsap.set(".mask-clip-path", {
        clipPath: `ellipse(clamp(30, ${40 * responsiveValues.widthScale}, 50)% clamp(15, ${20 * responsiveValues.heightScale}, 25)% at 50% 50%)`,
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
        .to(".mask-clip-path", {
          clipPath: `ellipse(clamp(60, ${70 * responsiveValues.widthScale}, 80)% clamp(60, ${70 * responsiveValues.heightScale}, 80)% at 50% 50%)`,
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
            scale: Math.max(0.8, Math.min(0.9, responsiveValues.scale * 0.9)),
            top: `clamp(10, ${15 * responsiveValues.heightScale}, 20)%`,
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
          containerClass="mt-5 funky-text" // Fixed typo from 'fanky-text'
        />
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="AboutFlex mask-clip-path about-image flex-center">
          <img
            src="img/KnowMe.png"
            alt="Background"
            className="absolute left-5 top-0 size-fit object-contain z-10 knowImg"
          />
          <p className="AboutFlexP absolute mt-[clamp(2rem,5vw,5rem)] right-[clamp(0.5rem,3vw,0.75rem)] top-[clamp(20rem,50vh,24rem)] transform -translate-y-1/2 max-w-[clamp(20rem,80vw,32rem)] text-right text-[clamp(0.9rem,3vw,1.125rem)] leading-relaxed text-white">
            🚀{" "}
            <span className="font-semibold text-primary" style={{ color: "#007BFF" }}>
              About Devarshi Patel
            </span>
            <br />
            <br />
            <span className="font-semibold" style={{ color: "#FF4C29" }}>
              MTV Roadies Fame | Inspirational Comedian | Full-Time Madman With a Mic
            </span>
            <br />
            <br />
            I'm Devarshi — the guy who lit up MTV Roadies 6.0 and carried that fire into real life.
            <br />
            <br />
            I'm not your average motivational speaker. I'm the first-ever "Inspirational Comedian" who mixes mic drops with mind-blows, jokes with josh, and serves it all with a side of Gujarati swag.
            <br />
            <br />
            <span className="font-semibold" style={{ color: "#007BFF" }}>Who Am I?</span>
            <br />
            From Roadies chaos to standing ovations — I turn madness into motivation.
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
            Because I don't just speak — I spark. With Roadie guts and stand-up soul, I turn laughter into launchpads.
            <br />
            <br />
            🚨{" "}
            <span className="text-primary font-semibold" style={{ color: "#FF4C29" }}>
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