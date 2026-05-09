import { Cpu, Terminal, Database } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about section-container">
      <h2 className="section-title">
        About <span>Me</span>
      </h2>
      
      <div className="about-content">
        <div className="about-text glass tilt-3d">
          <div className="terminal-body">
            <p>
              Hello! I'm <strong>Ankit Dhakad</strong>, a passionate Computer Science & Engineering specialist. I focus on optimizing hardware-software synergy, bridging low-level embedded hardware environments with robust modern web backends.
            </p>
            <p>
              I specialize in high-efficiency C programming, microcontroller optimization, and architecting low-latency software solutions. I consistently deliver industrial-grade automation pipelines and responsive, clean full-stack systems tailored to real-world performance needs.
            </p>
          </div>
          
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-number">7.49</span>
              <span className="stat-text">Diploma CGPA</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">20%+</span>
              <span className="stat-text">Automation Boost</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Top 5%</span>
              <span className="stat-text">Dept Rank</span>
            </div>
          </div>
        </div>

        <div className="services-grid">
          <div className="service-card glass tilt-3d">
            <div className="service-icon">
              <Cpu size={32} />
            </div>
            <h3>Embedded Systems & IoT</h3>
            <p>Designing robust automation systems using Arduino, microcontrollers, and high-precision physical sensor arrays.</p>
          </div>
          
          <div className="service-card glass tilt-3d">
            <div className="service-icon">
              <Terminal size={32} />
            </div>
            <h3>Backend Architecture</h3>
            <p>Building high-speed, secure, and low-latency database engines, APIs, and data pipelines using Python and C/C++.</p>
          </div>

          <div className="service-card glass tilt-3d">
            <div className="service-icon">
              <Database size={32} />
            </div>
            <h3>Full-Stack Ecosystems</h3>
            <p>Creating specialized full-stack platforms from responsive, pixel-perfect frontends to highly optimized backends.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
