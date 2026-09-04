import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Hero.css';
import spinningVideo from '../../assets/spinning_video.mp4';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      }
    });

    // Smooth role text transitions on scroll - using ONLY opacity, no y movement to avoid jitter
    tl.to('.role-1', { autoAlpha: 0, duration: 1 })
      .to('.role-2', { autoAlpha: 1, duration: 1 }, '<0.3')
      .to('.hero-bg-video', { scale: 1.1, duration: 1, ease: 'none' }, '<')

      .to('.role-2', { autoAlpha: 0, duration: 1 })
      .to('.role-3', { autoAlpha: 1, duration: 1 }, '<0.3')
      .to('.hero-bg-video', { scale: 1.2, duration: 1, ease: 'none' }, '<');

    // Entrance animations (non-scrub, just on load)
    gsap.fromTo('.hero-content-layer', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, delay: 0.3, ease: 'power3.out' }
    );
    gsap.fromTo('.hero-bottom-bar', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power3.out' }
    );
  }, { scope: containerRef });

  return (
    <section id="home" className="hero-video-style" ref={containerRef}>
      <div className="hero-layout">
        
        {/* FULL SCREEN BACKGROUND VIDEO */}
        <div className="hero-bg-video-container">
          <video 
            src={spinningVideo} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="hero-bg-video" 
          />
          <div className="hero-vignette"></div>
        </div>

        {/* FOREGROUND CONTENT */}
        <div className="hero-content-layer">
          
          {/* LEFT: Name + Roles */}
          <div className="hero-left">
            <p className="greeting-small">HI, I'M <span className="highlight-name">ANKIT</span></p>
            <div className="dynamic-roles">
              <h1 className="role-text role-1">CREATIVE<br/>DEVELOPER</h1>
              <h1 className="role-text role-2">FULL STACK<br/>ENGINEER</h1>
              <h1 className="role-text role-3">EMBEDDED<br/>SYSTEMS</h1>
            </div>
          </div>

          {/* RIGHT: Bio */}
          <div className="hero-right-content">
            <p className="bio-subtitle">// TURNING IDEAS INTO REALITY</p>
            <p className="bio-text">Available for hire. Building fast, responsive web applications using modern tech stacks.</p>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="hero-bottom-bar">
          <div className="scrub-indicator">
            <span className="arrow-down">↓</span> SCROLL TO SCRUB TIMELINE
          </div>
          <div className="action-buttons">
            <a href="#projects" className="btn btn-hire">View My Work</a>
            <a href="#contact" className="btn btn-subscribe">Contact Me</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
