import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle1 from "./AnimatedTitle";


gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
  const isMobile = window.matchMedia("(max-width: 640px)").matches;

  if (isMobile) {
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
        end: "+=1000",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        // markers: true,
      },
    });

    mobileTimeline
      // Animate the ellipse to grow more vertically (height increases)
      .to(".mask-clip-path", {
        clipPath: "ellipse(70% 70% at 50% 50%)", // ⬅️ width and height both increased
        ease: "power1.inOut",
        duration: 1,
        scale: 1.2, 
      })
      .to(".knowImg", {
        marginTop: "50%", 
        left: "13%",
        scale: 1.2, 
      })
      .to(
        ".AboutFlexP",
        {
          y: 150,
          opacity: 1,
          zIndex: 1,
          duration: 1,
          scale: .9,

        },
        "-=0.5"
      );

  } else {
    // 🔹 Desktop scrollTrigger animation
    const desktopTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=500 bottom",
        scrub: 0.5,
        pin: true,
        pinSpacing: false,
        // markers: true,
      },
    });

    desktopTimeline.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  }
});



  return (
    <div id="about" className="min-h-screen w-screen">
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
          <p className="AboutFlexP absolute right-12 top-1/2 transform -translate-y-1/2 max-w-xl text-right text-lg leading-relaxed text-white">
            I'm <span className="font-semibold text-primary">Devarshi</span> — the guy who jumped into a coffin on MTV Roadies Season 6
            and turned it into a career. My viral 2009 audition, with epic hair and bold vibes, didn't win the show but stole hearts and screen time.
            <br /><br />
            That sparked my journey as a <strong>Inspirational Comedian</strong>, <strong>Actor</strong>, and <strong>Influencer</strong>.
            <span className="extra-text">
            I turn pain, awkward moments, and funny failures into growth for people, teams, and businesses.
            <br /><br />
            From 5-minute talks that ignite rooms to content your cousin, boss, or grandma vibes with, my motto is:
            <em className="block mt-2 text-primary font-semibold">Keep it real. Make it funny. Leave a mark.</em>
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default About;