import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function Chatbot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  async function generateAnswer() {
    if (query.trim()) {
      // Add user's message to the chat
      setMessages([...messages, { type: 'user', text: query }]);
      
      // Clear input field
      setQuery('');

      // API request
      try {
        const response = await axios({
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCjw3_PGNpIUxXH47xw4LErbXDgpclIlYg`,
          method: 'post',
          data: {
            contents: [{ parts: [{ text: query }] }],
          },
        });

        // Add API response to the chat
        setMessages([...messages, { type: 'user', text: query }, { type: 'bot', text: response.data.candidates[0].content.parts[0].text }]);
      } catch (error) {
        // Handle error if API request fails
        setMessages([...messages, { type: 'user', text: query }, { type: 'bot', text: 'Sorry, something went wrong. Please try again.' }]);
      }
    }
  }

  return (
    <>
      <div className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        Chat
      </div>

      {isOpen && (
        <motion.div
          className="chatbot"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1>Chat Bot</h1>
          <div className="chat-window">
            {messages.map((message, index) => (
              <div key={index} className={`chat-bubble ${message.type}`}>
                {message.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your message..."
            ></textarea>
            <button onClick={generateAnswer}>Send</button>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default Chatbot;
