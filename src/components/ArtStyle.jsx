import artForms from '../assets/artForms.json';
import {motion, AnimatePresence} from 'framer-motion'; 
import '../css/ArtStyle.css';
import { useState , useEffect} from 'react';




const ArtStyle = () => {
  const artFormsData = artForms.artForms; // Accessing the artForms array from the JSON file
  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);

  const paginate = (newDirection) => {
    setCurrentIndex([currentIndex + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="slider-container">
       <header>
            <h1>Explore Indian Art Forms</h1>
        </header>
        <div className='slide-bg'>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div 
          className="slider-content"
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          <div className="image-section">
            <img src={artFormsData[currentIndex % artFormsData.length].link} alt={artFormsData[currentIndex % artFormsData.length].name} />
            <div className="text-overlay">
              <h2>{artFormsData[currentIndex % artFormsData.length].name}</h2>
              <p>{artFormsData[currentIndex % artFormsData.length].description}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      </div>

      <div className="button-container">
        <button className="view-all-button">View All Artforms</button>
      </div>
    </div>
  );
};

// Animation Variants for smoother transitions
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000, // Move horizontally from the right or left
    opacity: 0,
    transition: { duration: 0.8 },
    position: 'absolute', // Ensures the new slide doesn't push down the previous one
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: 'relative', // Centered slide is relative
    transition: { duration: 0.8 }
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000, // Exit horizontally to the right or left
    opacity: 0,
    transition: { duration: 0.8 },
    position: 'absolute', // Prevents exit animation from affecting layout
  })
};

export default ArtStyle;