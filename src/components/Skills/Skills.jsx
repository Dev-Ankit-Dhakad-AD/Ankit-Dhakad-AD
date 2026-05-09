import { useEffect, useRef, useState } from 'react';
import './Skills.css';

const Skills = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);

  const skills = [
    { name: 'Embedded Logic & Arduino', level: 75 },
    { name: 'JavaScript / HTML / CSS', level: 80 },
    { name: 'Git & Agile', level: 65 },
    { name: 'C / C++ / Python', level: 75 },
    { name: 'Network Security', level: 60 },
    { name: 'Full-Stack Development', level: 70 },
    { name: 'System Architecture', level: 65 },
    { name: 'DSA & Problem Solving', level: 70 },
  ];

  const tools = [
    'Arduino', 'Microcontrollers', 'Sensors', 'Cryptography', 'PKI', 'React', 'Node.js', 'Linux', 'Vite', 'Git & GitHub', 'PostgreSQL'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setTimeout(() => {
            setAnimate(true);
          }, 150);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 } // Triggers when 15% of the section is visible
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="skills section-container">
      <h2 className="section-title">
        My <span>Skills</span>
      </h2>
      
      <div className="skills-content">
        <div className="skills-column glass tilt-3d">
          <h3>Technical Expertise</h3>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar-bg">
                  <div 
                    className="skill-bar-fill" 
                    style={{ width: animate ? `${skill.level}%` : '0%' }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="skills-column glass tools-column tilt-3d">
          <h3>Familiar Tools & Technologies</h3>
          <div className="tools-grid">
            {tools.map((tool, index) => (
              <div key={index} className="tool-badge glass">
                {tool}
              </div>
            ))}
          </div>
          
          <div className="soft-skills mt-4">
            <h3>Professional Strengths</h3>
            <ul className="soft-skills-list">
              <li>Creative Problem Solving</li>
              <li>Team Collaboration & Mentoring</li>
              <li>Strategic Time Management</li>
              <li>Agile Adaptation & Flexibility</li>
              <li>Effective Tech Communication</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
