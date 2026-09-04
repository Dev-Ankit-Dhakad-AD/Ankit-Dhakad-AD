import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  const steps = [
    {
      step: 'ROOT 01',
      title: 'Frontend Architecture',
      desc: 'Architecting responsive, high-performance UI components with React and modern tools.'
    },
    {
      step: 'ROOT 02',
      title: 'Backend Infrastructure',
      desc: 'Building secure REST APIs and robust data pipelines with Node.js & Python.'
    },
    {
      step: 'ROOT 03',
      title: 'Embedded Integration',
      desc: 'Bridging software with hardware using C/C++ and microcontroller logic.'
    },
    {
      step: 'ROOT 04',
      title: 'Deployment & Scale',
      desc: 'Orchestrating containerized environments and ensuring zero-downtime delivery.'
    }
  ];

  useGSAP(() => {
    const el = sectionRef.current;

    gsap.from(el.querySelector('.roadmap-header'), {
      y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });

    gsap.from(el.querySelectorAll('.roadmap-card'), {
      y: 60, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: el.querySelector('.roadmap-grid'), start: 'top 85%' }
    });
  }, { scope: sectionRef });

  return (
    <section id="experience" className="roadmap-video-style section-container" ref={sectionRef}>
      <div className="roadmap-header">
        <p className="system-tag">// EXECUTION MAP</p>
        <h2 className="section-title-large">Core Execution Root Map</h2>
      </div>

      <div className="roadmap-grid">
        {steps.map((step, idx) => (
          <div key={idx} className="roadmap-card tilt-3d">
            <div className="step-number">{step.step}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
