import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle1 from "./AnimatedTitle";


gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=900 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <AnimatedTitle1
          title="Know Me"
          line="Does this worl?"
          containerClass="mt-5 !text-black text-center"
        />
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image flex-center">
          <img
            src="img/dp.png"
            alt="Background"
            className="absolute left-5 top-0 size-fit object-cover z-10"
          />
          <p className="absolute right-12 top-1/2 transform -translate-y-1/2 max-w-xl text-right text-lg leading-relaxed text-gray-800 ">
            I'm <span className="font-semibold text-primary">DevKaDose</span> — the guy who jumped into a coffin on MTV Roadies Season 6
            and turned it into a career. My viral 2009 audition, with epic hair and bold vibes, didn't win the show but stole hearts and screen time.
            <br /><br />
            That sparked my journey as a <strong>Motivational Comedian</strong>, <strong>Digital Storyteller</strong>, and <strong>Brand Humanizer</strong>.
            I turn pain, awkward moments, and funny failures into growth for people, teams, and businesses.
            <br /><br />
            From 5-minute talks that ignite rooms to content your cousin, boss, or grandma vibes with, my motto is:
            <em className="block mt-2 text-primary font-semibold">Keep it real. Make it funny. Leave a mark.</em>
          </p>

        </div>
      </div>
    </div>
  );
};

export default About;