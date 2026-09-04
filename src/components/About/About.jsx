import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './About.css';
import profileImg from '../../assets/profile.jpg';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const els = sectionRef.current;

    // Card slides in from left
    gsap.from(els.querySelector('.about-profile-card-container'), {
      x: -80, opacity: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: els, start: 'top 75%', toggleActions: 'play none none none' }
    });

    // Text slides in from right  
    gsap.from(els.querySelector('.about-text-content'), {
      x: 80, opacity: 0, duration: 1.2, delay: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: els, start: 'top 75%', toggleActions: 'play none none none' }
    });

    // Specialty pills stagger in
    gsap.from(els.querySelectorAll('.specialty-item'), {
      y: 20, opacity: 0, duration: 0.6, stagger: 0.1, delay: 0.5, ease: 'power2.out',
      scrollTrigger: { trigger: els, start: 'top 75%', toggleActions: 'play none none none' }
    });

  }, { scope: sectionRef });

  return (
    <section id="about" className="about-video-style section-container" ref={sectionRef}>
      <div className="about-layout">
        <div className="about-profile-card-container">
          <div className="spinning-rect-about-1"></div>
          <div className="spinning-rect-about-2"></div>
          <div className="spinning-rect-about-3"></div>
          <div className="about-profile-card">
            <div className="profile-image-wrapper">
              <img src={profileImg} alt="Ankit Dhakad" className="profile-img" />
              <div className="card-inner-overlay"></div>
              <div className="status-badge">
                <span className="dot animate-pulse"></span>
                <span className="badge-text">OPEN TO OPPORTUNITIES</span>
                <span className="badge-year">2026</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about-text-content">
          <p className="system-tag">// SYSTEM PROFILE</p>
          <h2 className="greeting-large">Hello, I'm<br/>Ankit Dhakad</h2>
          <p className="bio-description">
            A passionate Full-Stack & Embedded Systems Developer dedicated to crafting clean, functional, and highly scalable applications. Specializing in high-performance architecture, low-level hardware synergy, and robust modern web experiences.
          </p>
          <div className="specialties">
            <div className="specialty-item">Full-Stack</div>
            <div className="specialty-item">Embedded & IoT</div>
            <div className="specialty-item">C / C++ / Python</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
