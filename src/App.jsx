import React, { useState, useEffect, useRef } from 'react';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import NavBar from './components/Navbar.jsx';
import Features from './components/Features.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Story from './components/Story.jsx';

const VideoLoader = ({ onComplete }) => {
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    setTimeout(() => {
      setShowLoader(false);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 100);
  };

  const handleSkip = () => {
    setIsVideoEnded(true);
    setShowLoader(false);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  if (!showLoader) {
    return (
      <div className={`fixed inset-0 bg-black z-50 transition-opacity duration-500 ${isVideoEnded ? 'opacity-0' : 'opacity-100'} pointer-events-none`} />
    );
  }

  return (
    <div className={`custom-div fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-500 ${isVideoEnded ? 'opacity-0' : 'opacity-100'}`}>
      <video
  className="custom-video w-full max-h-[95vh] object-cover"
  style={{
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
  }}
  autoPlay
  muted
  playsInline
  onEnded={handleVideoEnd}
  onError={() => {
    console.error('Video failed to load');
    handleSkip();
  }}
>
        <source src="videos/Logo3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="skip-btn fixed bottom-8 right-8 bg-black bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300 text-sm font-medium z-10"
      >
        Skip
      </button>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showNav, setShowNav] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNav(!entry.isIntersecting); // Show Nav when Hero is out of view
      },
      {
        threshold: 0.3, // Adjust how much of Hero needs to be visible to hide Nav
      }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <VideoLoader onComplete={handleLoaderComplete} />}
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {showNav && <NavBar />}
          <div ref={heroRef}>
            <Hero />
          </div>
          <About />
          <Features />
          <Story />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
};

export default App;
