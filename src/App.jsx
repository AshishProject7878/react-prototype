import React, { useState, useEffect } from 'react'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import NavBar from './components/Navbar.jsx'
import Features from './components/Features.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Story from './components/Story.jsx'

const VideoLoader = ({ onComplete }) => {
  const [isVideoEnded, setIsVideoEnded] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  const handleVideoEnd = () => {
    setIsVideoEnded(true)
    // Add a small delay before starting fade out
    setTimeout(() => {
      setShowLoader(false)
      setTimeout(() => {
        onComplete()
      }, 500) // Wait for fade animation to complete
    }, 100)
  }

  const handleSkip = () => {
    setIsVideoEnded(true)
    setShowLoader(false)
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  if (!showLoader) {
    return (
      <div className={`fixed inset-0 bg-black z-50 transition-opacity duration-500 ${isVideoEnded ? 'opacity-0' : 'opacity-100'} pointer-events-none`} />
    )
  }

  return (
    <div className={`fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-500 ${isVideoEnded ? 'opacity-0' : 'opacity-100'}`}>
      <video
        className="w-screen h-full object-fill"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        onError={() => {
          console.error('Video failed to load')
          handleSkip() // Skip if video fails to load
        }}
      >
        <source src="videos/Logo1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="fixed bottom-8 right-8 bg-black bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300 text-sm font-medium z-10"
      >
        Skip
      </button>
    </div>
  )
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Prevent scrolling when loading
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup function to restore scrolling
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  const handleLoaderComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {isLoading && <VideoLoader onComplete={handleLoaderComplete} />}
      <main className='relative min-h-screen w-screen overflow-x-hidden'> 
        <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <NavBar />
          <Hero />
          <About />
          <Features />
          <Story />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  )
}

export default App