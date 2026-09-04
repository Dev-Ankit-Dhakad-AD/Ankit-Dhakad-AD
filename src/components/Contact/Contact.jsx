import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;

    gsap.from(el.querySelector('.contact-left'), {
      x: -60, opacity: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 75%' }
    });

    gsap.from(el.querySelector('.contact-right'), {
      x: 60, opacity: 0, duration: 1.2, delay: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 75%' }
    });
  }, { scope: sectionRef });

  return (
    <section id="contact" className="contact-video-style section-container" ref={sectionRef}>
      <div className="contact-layout">
        
        {/* Left Side */}
        <div className="contact-left">
          <p className="system-tag">// LIVE SERVER RESPONSE</p>
          <h2 className="greeting-large">Let's Build Something<br/>Exceptional.</h2>
          
          <div className="terminal-box">
            <p className="term-line"><span className="term-prompt">~</span> <span className="term-cmd">payload.json</span></p>
            <p className="term-line"><span className="term-key">status:</span> <span className="term-val">"Awaiting Input"</span></p>
            <p className="term-line"><span className="term-key">sys:</span> <span className="term-val">"Ready to execute"</span></p>
            <p className="term-line animate-blink">_</p>
          </div>
        </div>

        {/* Right Side */}
        <div className="contact-right">
          <form className="glass-form tilt-3d">
            <div className="form-row">
              <div className="input-group">
                <label>First Name</label>
                <input type="text" placeholder="Rahul" />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input type="text" placeholder="Sharma" />
              </div>
            </div>
            
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="rahul@example.com" />
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea rows="4" placeholder="Type your message here..."></textarea>
            </div>

            <button type="button" className="submit-btn">Send Message</button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
