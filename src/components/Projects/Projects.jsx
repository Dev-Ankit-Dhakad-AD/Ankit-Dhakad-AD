import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Annapurna Daily Needs',
    description: 'A fully functional grocery delivery ecosystem consisting of a high-performance mobile application engineered with Flutter, Kotlin, and Dart, alongside a robust management dashboard built in Next.js and React.',
    tech: ['Flutter', 'Kotlin', 'Next.js', 'React'],
    github: 'https://github.com/ankit0173',
    live: 'https://annapurnadailyneeds.vercel.app/'
  },
  {
    title: 'MB Tractors FinTech',
    description: 'A custom finance and loan management platform designed for a tractor and multi-vehicle financing enterprise located at Fatehpur Tiraha, Shivpuri, M.P.',
    tech: ['Fintech', 'React', 'Database'],
    github: 'https://github.com/ankit0173',
    live: 'https://mbtractorshivpuri.vercel.app/'
  },
  {
    title: 'Maa Rajrajeshwari Dhaba',
    description: 'A gorgeous, responsive business website crafted for my father\'s hotel and dhaba located on Highway NH46, 45 km from Shivpuri, featuring active menus and digital bookings.',
    tech: ['Web Tech', 'CSS Grid', 'Frontend'],
    github: 'https://github.com/ankit0173',
    live: 'https://maarajrajeshwarihotel.vercel.app/'
  },
  {
    title: 'Attendance Manager',
    description: 'A college minor academic tracking system consisting of dedicated faculty logging interfaces and subject-wise student attendance reporting.',
    tech: ['Java / PHP', 'SQL', 'Academic Logic'],
    github: 'https://github.com/ankit0173',
    live: '#'
  },
  {
    title: 'DevineLens',
    description: 'A modern, visually immersive web application and showcase platform focused on digital storytelling and interactive user experience.',
    tech: ['React', 'Web Tech', 'UI/UX'],
    github: 'https://github.com/ankit0173',
    live: 'https://devinelens.vercel.app/'
  }
];

const Projects = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    
    gsap.from(el.querySelector('.projects-header'), {
      y: 50, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%' }
    });

    gsap.from(el.querySelectorAll('.project-card'), {
      y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: el.querySelector('.projects-grid'), start: 'top 85%' }
    });
  }, { scope: sectionRef });

  return (
    <section id="projects" className="projects-video-style section-container" ref={sectionRef}>
      <div className="projects-header">
        <p className="system-tag">// PROOF OF WORK</p>
        <h2 className="section-title-large">Featured Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <div key={index} className="project-card tilt-3d glass">
            <div className="project-id">0{index + 1}</div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            
            <div className="project-tech">
              {project.tech.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>
            
            <div className="project-links">
              <a href={project.github} target="_blank" rel="noreferrer" className="project-link">
                <FaGithub size={18} /> Code
              </a>
              {project.live !== '#' && (
                <a href={project.live} target="_blank" rel="noreferrer" className="project-link">
                  <ExternalLink size={18} /> Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
