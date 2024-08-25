import  { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMic } from 'react-icons/fi';
import '../css/Translation.css';
import Transition from '../Transition';

const Translation = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleVoiceInput = () => {
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setTranslatedText(`Translated: ${e.target.value}`);
  };

  return (
    <Transition>
    <div className="translation-container">
        <motion.div
        className="translated-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {translatedText}
      </motion.div>
      <motion.div
        className="input-wrapper"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Enter text to translate..."
          className="translation-input"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="voice-button"
          onClick={handleVoiceInput}
        >
          <FiMic size={24} />
        </motion.button>
      </motion.div>
      
    </div>
    </Transition>
  );
};

export default Translation;
