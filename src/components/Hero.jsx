import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Top Left - Brand Name */}
      <div className="topSection absolute top-36 left-12 z-20">
        {/* <h1 
          className="text-4xl font-bold tracking-wide"
          style={{ 
            color: '#00E6E6',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          <span className="funky-text-4 text-6xl">DEV</span>
          <span className="funky-text">ka</span>
          <span
            className="funky-text-4 text-6xl"
            style={{
              backgroundColor: '#FF4C29',
              padding: '10px 20px',
              clipPath: 'polygon(10% 0%, 100% 5%, 90% 100%, 0% 100%)',
              display: 'inline-block',
              color: 'white',
            }}
          >
            DOSE
          </span>
        </h1> */}
        <img
        className='w-60 h-auto LogoImg'
        src="img/lgwh.png" alt=""/>
        <p className="mt-4 max-w-sm text-white font-medium">
          Let’s catch up! If you have ideas, projects, or just want to chat about creativity and coding, I’m all ears.
        </p>

        <button
          onClick={() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="mt-4 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-105 animated-gradient"
          style={{ backgroundColor: '#FF4C29' }}
        >
          Let’s Catch Up?
        </button>
      </div>


      {/* Top Right - Logo */}
      {/* <div className="absolute top-36 right-12 z-20">
        <div 
          className="w-44 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
        >
          <img src='img/lgwh.png' alt='Logo'/>
        </div>
      </div> */}

      {/* Bottom Right - Text Content */}
      <div className="bottomRight absolute bottom-8 right-8 z-20 max-w-md">
        <h2 
          className="KnowName text-2xl font-bold mb-4"
          style={{ 
            color: '#fff',
            fontFamily: "'Poppins', sans-serif"
          }}
        >
          Devarshi Patel
        </h2>
        <p 
          className="knowText text-base leading-relaxed mb-4"
          style={{ color: '#6C757D' }}
        >
          Inspirational Comedian, Actor, and Influencer. 
          Translation? I use real-life pain, awkward moments, and funny failures to spark growth — in people, teams, and businesses.
        </p>
        <div className="mt-6">
        <button
          className="animated-gradient hover:opacity-90 hover:scale-105 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300"
          style={{ backgroundColor: '#FF4C29' }}
          onClick={() => {
            const section = document.getElementById('about');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          Know More
        </button>
        </div>
      </div>

      {/* Bottom Center - Image */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
        <div className="relative">
          {/* Placeholder for actual image */}
          <div 
            className="w-max h-96 rounded-t-full flex items-end justify-center text-white text-lg font-medium"
          >
            <div className="bottom-image-section text-center">
                <img src='img/dp2.png' alt="Devarshi's Image"/>
            </div>
          </div>
          
          {/* Decorative elements */}
        </div>
      </div>

      {/* Background decorative elements */}
    </div>
  );
};

export default Hero;