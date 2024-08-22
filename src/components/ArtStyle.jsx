import artForms from '../assets/artForms.json'
import { motion } from 'framer-motion' 
import '../css/ArtStyle.css' 
import { useState } from 'react';


const ArtStyle = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artForms.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === artForms.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="slider-container">
      <h1>Art Forms of India</h1>
      <button className="nav-button prev" onClick={goToPrevious}>❮</button>
      <div className="slider">
        <motion.div
          className="slides-wrapper"
          initial={{ x: "-100%" }}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {artForms.artForms.map((art, index) => (
            <motion.div key={index} className="slide">
              <div className="slide-image-container">
                <img src={art.image} alt={art.name} className="slide-image" />
              </div>
              <div className="slide-content">
                <h2>{art.name}</h2>
                <p>{art.description}</p>
                <a href={art.link} className="learn-more">Learn More</a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <button className="nav-button next" onClick={goToNext}>❯</button>
    </div>
  );
};

export default ArtStyle;