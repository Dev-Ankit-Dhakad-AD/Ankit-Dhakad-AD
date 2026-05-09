import { Mail, MapPin, Phone, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
    const whatsappUrl = `https://wa.me/916267319670?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    e.target.reset(); // Clear the form
  };

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
        
        <form className="contact-form glass tilt-3d" onSubmit={handleWhatsAppSubmit}>
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="name" required className="form-input" />
          </div>
          <div className="form-group">
            <label>Your Email</label>
            <input type="email" name="email" required className="form-input" />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input type="text" name="subject" required className="form-input" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea rows="5" name="message" required className="form-input"></textarea>
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
