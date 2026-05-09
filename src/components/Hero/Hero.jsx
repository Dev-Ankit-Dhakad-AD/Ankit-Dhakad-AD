import { ArrowRight, Download, Sparkles } from 'lucide-react';
import './Hero.css';
import profileImg from '../../assets/profile.jpg';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content section-container">
        <div className="hero-text">
          <div className="system-status">
            <Sparkles size={13} /> <span>CREATIVE SOFTWARE ENGINEER</span>
          </div>
          <h2 className="greeting">Hello, I'm</h2>
          <h1 className="name">
            Ankit <span className="text-gradient">Dhakad</span>
          </h1>
          <h3 className="role">Embedded & Full-Stack Engineer</h3>
          <div className="bio-container">
            <p className="bio">
              I specialize in high-performance C optimization, microcontrollers, and architecting robust full-stack software solutions. I bridge the gap between low-level hardware environments and modern web frameworks to build seamless end-to-end products.
            </p>
          </div>
          
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View Projects <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Download Resume <Download size={16} />
            </a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="image-container glass">
            {/* Ambient Background Glow and Tech Orbit Rings */}
            <div className="avatar-glow-orb" />
            <div className="avatar-orbit-ring ring-dashed" />
            <div className="avatar-orbit-ring ring-solid" />

            <div className="avatar-wrapper">
              <img src={profileImg} alt="Ankit Dhakad" className="hero-avatar" />
            </div>
            
            {/* Floating badges */}
            <div className="floating-badge badge-1 glass">
              <span>C / C++ // Python</span>
            </div>
            <div className="floating-badge badge-2 glass">
              <span>Embedded IoT</span>
            </div>
            <div className="floating-badge badge-3 glass">
              <span>React // Node.js</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
