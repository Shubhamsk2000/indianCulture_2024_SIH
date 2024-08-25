import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import '../css/Chat.css';
import ReactMarkdown from 'react-markdown';
function Chatbot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([{ type: 'bot', text: 'Namaste! Let’s dive into the vibrant world of Indian culture together. Feel free to ask me anything about our traditions, festivals, art, and heritage!' }]);
  const [isOpen, setIsOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  

  async function generateAnswer() {
    if (query.trim()) {
      // Add user's message to the chat
      setMessages([...messages, { type: 'user', text: query }]);

      // Clear input field
      setQuery('');

      // Show typing animation
      setIsThinking(true);

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
        console.log(error.message);
      } finally {
        // Hide typing animation
        setIsThinking(false);
      }
    }
  }

  return (
    <>
      <div className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <CloseButton/> : 'Chat'}
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
                {message.text.length > 200 ? (
                  <TruncatedMessage text={message.text} />
                ) : (
                  message.text
                )}
              </div>
            ))}
            {isThinking && (
              <div className="chat-bubble bot typing">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            )}
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

function TruncatedMessage({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isExpanded) {
    return (  
      <>
        {text.substring(0, 200)}...
        <button className="read-more" onClick={() => setIsExpanded(true)}>Read more</button>
      </>
    );
  } else {
    return (
      <>
        <ReactMarkdown>{text}</ReactMarkdown>
        <button className="read-less" onClick={() => setIsExpanded(false)}>Read less</button>
      </>
    );
  }
}
function CloseButton(){
  return(
    <div className="close-button">
    <div className="close-line"></div>
    <div className="close-line"></div>
  </div>
  )
}
export default Chatbot;
