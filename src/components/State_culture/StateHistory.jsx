import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../css/StateHistory.css';

gsap.registerPlugin(ScrollTrigger);

export default function StateHistory() {
  const windowImageRef = useRef(null);
  const sunriseImageRef = useRef(null);

  useEffect(() => {
    // Zoom effect for window image
    gsap.fromTo(
      windowImageRef.current,
      { scale: 1 }, // Initial state (no zoom)
      {
        scale: 2, // Zoom in state
        ease: 'power1.out',
        scrollTrigger: {
          trigger: windowImageRef.current,
          start: 'top top', // Start when top of the image reaches the top of the viewport
          end: '+=300', // Continue the zoom for 300px of scrolling
          scrub: true,  // Smooth transition based on scroll
        },
      }
    );

    // Fade in the sunrise image after the zoom effect
    gsap.to(sunriseImageRef.current, {
      opacity: 1, // Make the sunrise image visible
      ease: 'power1.out',
      scrollTrigger: {
        trigger: windowImageRef.current,
        start: 'bottom top', // Start showing the sunrise when window image zooms out
        scrub: true, // Smooth transition based on scroll
      },
    });
  }, []);

  return (
    <div className="s">
      {/* Window Image */}
      <img
        ref={windowImageRef}
        src="/try/window.png"
        alt="Window"
        className="window-image"
        id="windowImage"
      />
      
      {/* Sunrise Image */}
      <img
        ref={sunriseImageRef}
        src="/try/sunrise.jpg"
        alt="Sunrise"
        className="sunrise-image"
        id="sunriseImage"
      />
    </div>
  );
}
