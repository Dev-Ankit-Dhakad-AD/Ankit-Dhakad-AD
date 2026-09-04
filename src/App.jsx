import { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Loader from './components/Loader/Loader'
import MarqueeStrip from './components/MarqueeStrip/MarqueeStrip'

const marquee1 = ['CREATIVE DEVELOPER', '•', 'FULL STACK ENGINEER', '•', 'EMBEDDED SYSTEMS', '•', 'UI/UX DESIGN', '•', 'OPEN SOURCE', '•'];
const marquee2 = ['REACT', '•', 'NODE.JS', '•', 'C / C++', '•', 'PYTHON', '•', 'ARDUINO', '•', 'POSTGRESQL', '•', 'TAILWIND', '•', 'LINUX', '•'];

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // --- 3D Interactive Mouse Tilt Matrix ---
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.tilt-3d');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        
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

          const normalizedX = mouseX / (cardWidth / 2);
          const normalizedY = mouseY / (cardHeight / 2);

          const maxRotation = 10;
          const rotateY = normalizedX * maxRotation;
          const rotateX = -normalizedY * maxRotation;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02) translateZ(15px)`;
          card.style.boxShadow = `
            0 25px 50px rgba(0, 0, 0, 0.5), 
            0 0 35px rgba(255, 255, 255, 0.05)
          `;
        } else {
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

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      
      <div className="app-container" style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <Navbar />
        
        <main>
          <Hero />
          <MarqueeStrip items={marquee1} direction="rtl" speed={20} />
          <About />
          <MarqueeStrip items={marquee2} direction="ltr" speed={22} />
          <Skills />
          <Projects />
          <MarqueeStrip items={marquee1} direction="rtl" speed={18} />
          <Experience />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </>
  )
}

export default App
