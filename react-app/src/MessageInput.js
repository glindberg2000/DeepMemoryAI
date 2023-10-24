import React, { useState } from 'react';

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleSendMessage = (event) => {
    event.preventDefault();  // Prevents page reload on form submission
    if (message.trim()) {   // Ensures message is not empty or just whitespace
      onSendMessage(message);
      setMessage('');       // Clears the input field
    }
  };

  return (
    <form className="message-input" onSubmit={handleSendMessage}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageInput;
