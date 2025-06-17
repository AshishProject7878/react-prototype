import React from "react";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Top Left - Brand Name */}
      <div className="topSection absolute top-36 left-12 z-20">
        <img className="w-60 h-auto LogoImg" src="img/lgwh.png" alt="Logo" />
        <p className="mt-4 max-w-sm text-gray-300 font-medium">
          Let’s catch up! If you have ideas, projects, or just want to chat
          about creativity and coding, I’m all ears.
        </p>

        <button
          onClick={() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="mt-4 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-105 animated-gradient"
        >
          Let’s Catch Up?
        </button>
      </div>

      <div className="topSection2 absolute top-36 right-12 z-20 text-right">
        <h1 className="text-5xl font-extrabold text-white leading-tight drop-shadow-md">
          Every{" "}
          <span
            style={{
              color: "#00E6E6",
            }}
          >
            Laugh
          </span>{" "}
          Has a{" "}
          <span
            style={{
              color: "#FF4C29",
            }}
          >
            Backstory
          </span>
        </h1>

        <p className="mt-4 text-gray-300 max-w-md ml-auto">
          From awkward beginnings to powerful punchlines — here’s how I turned
          passion into purpose, and purpose into impact.
        </p>

        <button
          onClick={() => {
            const journeySection = document.getElementById("journey");
            if (journeySection) {
              journeySection.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="journey-button mt-6 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-105 animated-gradient"
        >
          Explore My Journey
        </button>
      </div>

      {/* Bottom Right - Text Content */}
      <div className="bottomRight absolute bottom-8 right-8 z-20 max-w-md">
        <h2
          className="KnowName text-2xl font-bold mb-4 text-gray-300"
          style={{
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Devarshi Patel
        </h2>
        <p
          className="knowText text-base leading-relaxed mb-4"
          style={{ color: "#fff" }}
        >
          Inspirational Comedian, Actor, and Influencer. Translation? I use
          real-life pain, awkward moments, and funny failures to spark growth —
          in people, teams, and businesses.
        </p>
        <div className="mt-6">
          <button
            className="animated-gradient hover:opacity-90 hover:scale-105 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300"
            onClick={() => {
              const section = document.getElementById("about");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Know More
          </button>
        </div>
      </div>

      {/* Bottom Center - Image */}
      <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 z-10">
        <div className="relative">
          <div className="w-max h-max rounded-t-full flex items-end justify-center text-white text-lg font-medium">
            <div className="bottom-image-section text-center">
              <img
                src="img/hero.png"
                alt="Devarshi's Image"
                className="w-auto h-auto max-h-[600px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
