import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef(null);
  
  const tools = [
    'C / C++', 'Python', 'Arduino', 'Microcontrollers', 'Sensors',
    'Cryptography', 'PKI', 'React', 'Node.js', 'Linux', 
    'Vite', 'Git & GitHub', 'PostgreSQL', 'Express.js',
    'Tailwind CSS', 'Embedded IoT', 'Agile'
  ];

  // Duplicate for seamless marquee
  const marqueeItems = [...tools, ...tools];

  useGSAP(() => {
    const el = sectionRef.current;
    gsap.from(el.querySelector('.skills-header'), {
      y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });
  }, { scope: sectionRef });

  return (
    <section id="skills" className="skills-video-style section-container" ref={sectionRef}>
      <div className="skills-header">
        <p className="system-tag">// TECHNICAL ARSENAL</p>
        <h2 className="section-title-large">Technologies I Work With</h2>
        <p className="skills-subtitle">
          Full-stack expertise across modern web development, backend architecture, and embedded systems.
        </p>
      </div>
      
      {/* Marquee Row 1 - moves right to left */}
      <div className="marquee-strip">
        <div className="marquee-track marquee-rtl">
          {marqueeItems.map((tool, index) => (
            <div key={index} className="skill-pill">{tool}</div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - moves left to right (reverse) */}
      <div className="marquee-strip">
        <div className="marquee-track marquee-ltr">
          {marqueeItems.map((tool, index) => (
            <div key={index} className="skill-pill">{tool}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
