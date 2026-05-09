import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <a href="#home" className="logo">
          Ankit<span className="text-gradient">Dhakad</span>
        </a>

        <div className="desktop-menu">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
          <div className="social-links">
            <a href="https://github.com/ankit0173" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={20} /></a>
            <a href="https://www.linkedin.com/in/ankit-dhakad-27938a2a3/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
            <a href="https://x.com/AnkitDh00383757" target="_blank" rel="noreferrer" aria-label="Twitter"><FaXTwitter size={20} /></a>
            <a href="https://www.instagram.com/ankitdhakad_.mp_33/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={20} /></a>
            <a href="https://www.facebook.com/profile.php?id=61574571536532" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebook size={20} /></a>
          </div>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={toggleMenu}>{link.name}</a>
            </li>
          ))}
        </ul>
        <div className="mobile-social-links">
          <a href="https://github.com/ankit0173" target="_blank" rel="noreferrer"><FaGithub size={24} /></a>
          <a href="https://www.linkedin.com/in/ankit-dhakad-27938a2a3/" target="_blank" rel="noreferrer"><FaLinkedin size={24} /></a>
          <a href="https://x.com/AnkitDh00383757" target="_blank" rel="noreferrer"><FaXTwitter size={24} /></a>
          <a href="https://www.instagram.com/ankitdhakad_.mp_33/" target="_blank" rel="noreferrer"><FaInstagram size={24} /></a>
          <a href="https://www.facebook.com/profile.php?id=61574571536532" target="_blank" rel="noreferrer"><FaFacebook size={24} /></a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
