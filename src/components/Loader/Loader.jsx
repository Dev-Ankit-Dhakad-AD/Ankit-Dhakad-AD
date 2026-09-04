import { useEffect, useState } from 'react';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 800); // Wait a bit at 100% before finishing
          return 100;
        }
        // ensure we don't go over 100
        const next = prev + Math.floor(Math.random() * 15) + 5;
        return next > 100 ? 100 : next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loader-container ${progress === 100 ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-top-text">INITIALIZING SYSTEM</div>
        <div className="loader-main-text">
          <h2>ANKIT DHAKAD</h2>
          <p>FULL-STACK & EMBEDDED ENGINEER</p>
        </div>
        <div className="loader-progress">
          <span className="progress-number">{progress}%</span>
          <span className="loading-icon">⚡</span>
        </div>
        <div className="loader-bottom-text">LOADING MODULES...</div>
      </div>
    </div>
  );
};

export default Loader;
