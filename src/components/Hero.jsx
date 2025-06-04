import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "circle(20% at 50% 50%)",
      filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))",
    });
    gsap.to("#video-frame", {
      clipPath: "circle(100% at 50% 50%)",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  const getVideoSrc = (index) => `videos/Logo.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
          </div>
        </div>
      )} */}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-full bg-white"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 overflow-hidden rounded-full">
          </div>
          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-32 object-cover object-center"
            onLoadedData={handleVideoLoad}
            onError={(e) => console.error("Next video failed to load:", e)}
          />
          <video
            id="current-video"
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute-center absolute z-10 size-80 object-cover object-center"
            onLoadedData={handleVideoLoad}
            onError={(e) => console.error("Current video failed to load:", e)}
          />
        </div>

        <h1
          className=" hero-heading absolute bottom-5 right-5 z-40 text-cyan-500"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "90px",
            fontWeight: "bold",
          }}
        >
          <b>DEVkaDOSE</b>
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1
              className="mt-32 hero-heading #1C1C1C"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "90px",
                fontWeight: "bold",
              }}
            >
              <b>Devarshi Patel</b>
            </h1>

            <p className="font-robert-regular #1C1C1C">
              Motivational Comedian, Digital Storyteller, and Brand Humanizer. <br />
              Turning pain, awkward moments, and funny failures into growth for people, teams, and businesses.
            </p>
          </div>
        </div>
      </div>

      <h1
        className="hero-heading text-white"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "90px",
          fontWeight: "bold",
          position: "absolute",
          top: "18%",
          left: "2.5rem",
        }}
      >
        <b>Devarshi Patel</b>
      </h1>
      <p className="font-robert-regular text-white"
      style={{
          fontSize: "16px",
          fontWeight: "bold",
          position: "absolute",
          top: "13.9rem",
          left: "2.5rem",
        }}>
        Motivational Comedian, Digital Storyteller, and Brand Humanizer. <br />
        Turning pain, awkward moments, and funny failures into growth for people, teams, and businesses.
      </p>
      <h1
        className=" hero-heading absolute bottom-5 right-5 text-white"
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: "90px",
          fontWeight: "bold",
        }}
      >
        <b>DEVkaDOSE</b>
      </h1>
    </div>
  );
};

export default Hero;
