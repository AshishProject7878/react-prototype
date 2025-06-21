import Logo from "../img/Logo.png";
import { useEffect, useRef, useState } from "react";

const navItems = ["About", "Journey", "Podcast", "Contact"];

const NavBar = () => {
  const navContainerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <style>
        {`
          .no-scroll {
            overflow: hidden;
            height: 100vh;
          }
        `}
      </style>
      <div
        ref={navContainerRef}
        className="fixed inset-x-0 top-4 z-50 h-16 border-none sm:inset-x-6"
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between p-4">
            {/* Logo */}
            <div className="flex items-center gap-7">
              <img
                src={Logo}
                alt="logo"
                className="w-20 h-auto"
              />
            </div>

            {/* Hamburger Menu Button */}
            <button
              className="z-50"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-8 h-0.5 bg-white my-1.5 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-8 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </button>

            {/* Full-Screen Menu */}
            <div
              className={`fixed inset-0 h-screen w-screen bg-[radial-gradient(circle_at_center,_#007BFF,_#FF4C29,_#6C757D,_#00E6E6)] flex flex-col items-center justify-center transition-all duration-500 z-40 ${
                isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
              }`}
            >
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="text-white text-2xl font-bold mb-6 hover:text-gray-200 transition-colors"
                  onClick={toggleMenu}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        </header>
      </div>
    </>
  );
};

export default NavBar;