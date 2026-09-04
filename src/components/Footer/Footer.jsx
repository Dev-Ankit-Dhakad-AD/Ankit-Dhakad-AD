import { Sparkles, Heart } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer glass">
      <div className="footer-content">
        <div className="footer-brand">
          <a href="#home" className="logo">
            <Sparkles size={18} className="terminal-icon" /> Ankit<span className="text-gradient">Dhakad</span>
          </a>
          <p>Bridging low-level hardware environments with robust full-stack software.</p>
        </div>
        
        <div className="footer-social">
          <a href="https://github.com/ankit0173" aria-label="GitHub" target="_blank" rel="noreferrer"><FaGithub size={20} /></a>
          <a href="https://www.linkedin.com/in/ankit-dhakad-27938a2a3/" aria-label="LinkedIn" target="_blank" rel="noreferrer"><FaLinkedin size={20} /></a>
          <a href="https://x.com/AnkitDh00383757" aria-label="Twitter" target="_blank" rel="noreferrer"><FaXTwitter size={20} /></a>
          <a href="https://www.instagram.com/ankitdhakad_.mp_33/" aria-label="Instagram" target="_blank" rel="noreferrer"><FaInstagram size={20} /></a>
          <a href="https://www.facebook.com/profile.php?id=61574571536532" aria-label="Facebook" target="_blank" rel="noreferrer"><FaFacebook size={20} /></a>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="made-with">
          Designed &amp; Built with <Heart size={15} fill="#00e5ff" color="#00e5ff" className="heart-icon" /> by{' '}
          <a href="https://github.com/Dev-Ankit-Dhakad-AD" target="_blank" rel="noreferrer" className="author-name">
            Ankit Dhakad (AD)
          </a>
        </p>
        <p className="copyright-text">
          &copy; {currentYear} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
