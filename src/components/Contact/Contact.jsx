import { Mail, MapPin, Phone, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact section-container">
      <h2 className="section-title">
        Get In <span>Touch</span>
      </h2>
      
      <div className="contact-content">
        <div className="contact-info glass tilt-3d">
          <h3>Contact Details</h3>
          <p>
            I am always open to discussing new embedded engineering projects, modern web development opportunities, or hardware automation architectures. Feel free to drop a message!
          </p>
          
          <div className="info-items">
            <div className="info-item">
              <div className="icon-box">
                <Mail size={20} />
              </div>
              <div>
                <h4>Email</h4>
                <p>andhakad36@gmail.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon-box">
                <Phone size={20} />
              </div>
              <div>
                <h4>Phone</h4>
                <p>+91 6267319670</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="icon-box">
                <MapPin size={20} />
              </div>
              <div>
                <h4>Location</h4>
                <p>Shivpuri, M.P. (India)</p>
              </div>
            </div>
          </div>
        </div>
        
        <form className="contact-form glass tilt-3d" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" required placeholder="John Doe" className="form-input" />
          </div>
          <div className="form-group">
            <label>Your Email</label>
            <input type="email" required placeholder="john@example.com" className="form-input" />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" required placeholder="Project Inquiry / Job Opening" className="form-input" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows="5" required placeholder="How can I help you?" className="form-input"></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary submit-btn">
            Send Message <Send size={15} />
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
