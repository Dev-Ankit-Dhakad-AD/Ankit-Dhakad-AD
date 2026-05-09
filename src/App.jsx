import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import BackgroundFish from './components/Hero/BackgroundFish'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
  useEffect(() => {
    // --- 3D Interactive Mouse Tilt Matrix ---
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.tilt-3d');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        
        // Verify if cursor is over current card
        const isHovered = (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        );

        if (isHovered) {
          const cardWidth = rect.width;
          const cardHeight = rect.height;
          const centerX = rect.left + cardWidth / 2;
          const centerY = rect.top + cardHeight / 2;
          
          const mouseX = e.clientX - centerX;
          const mouseY = e.clientY - centerY;

          // Normalize mouse offset to [-1, 1] range
          const normalizedX = mouseX / (cardWidth / 2);
          const normalizedY = mouseY / (cardHeight / 2);

          // Rotate up to 10 degrees max for a sleek subtle 3D response
          const maxRotation = 10;
          const rotateY = normalizedX * maxRotation;
          const rotateX = -normalizedY * maxRotation;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateZ(15px)`;
          card.style.boxShadow = `
            0 25px 50px rgba(0, 0, 0, 0.5), 
            0 0 35px rgba(168, 85, 247, 0.12)
          `;
        } else {
          // Reset transform smoothly with CSS transition
          card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)`;
          card.style.boxShadow = '';
        }
      });
    };

    const handleMouseLeave = () => {
      const cards = document.querySelectorAll('.tilt-3d');
      cards.forEach(card => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateZ(0)`;
        card.style.boxShadow = '';
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // --- 3D Scrolling Hologram Entrance Observer ---
    const observerOptions = {
      threshold: 0.08,
      rootMargin: '0px 0px -80px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
        } else {
          entry.target.classList.remove('section-visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => scrollObserver.observe(section));

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      sections.forEach(section => scrollObserver.unobserve(section));
    };
  }, []);

  return (
    <div className="app-container">
      {/* Ambient Fluid Background Orbs */}
      <div className="glowing-orb orb-1"></div>
      <div className="glowing-orb orb-2"></div>
      <div className="glowing-orb orb-3"></div>

      <BackgroundFish />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      
      <Footer />
    </div>
  )
}

export default App
