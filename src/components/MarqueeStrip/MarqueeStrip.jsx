import './MarqueeStrip.css';

const MarqueeStrip = ({ items, direction = 'rtl', speed = 25 }) => {
  const doubled = [...items, ...items];
  const className = direction === 'rtl' ? 'marquee-rtl' : 'marquee-ltr';
  const style = { animationDuration: `${speed}s` };

  return (
    <div className="global-marquee-strip">
      <div className={`marquee-track ${className}`} style={style}>
        {doubled.map((item, index) => (
          <span key={index} className="marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeStrip;
