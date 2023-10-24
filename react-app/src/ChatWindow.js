import React, { useState } from 'react';
import MessageDisplay from './MessageDisplay';
import MessageInput from './MessageInput';
import axios from 'axios';  // Import axios to send HTTP requests

function ChatWindow() {
    //const [messages, setMessages] = useState([]);
    const [messages, setMessages] = useState([{ text: 'Welcome to the chat!', sender: 'bot' }]);


    const handleSendMessage = (newMessage) => {
        const updatedMessages = [...messages, { text: newMessage, sender: 'user' }];
        setMessages(updatedMessages);
        axios.post('http://localhost:8000/respond', { message: newMessage })
            .then(response => {
                const botMessage = response.data;
                setMessages([...updatedMessages, botMessage]);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };



    return (
        <div className="chat-window">
            <MessageDisplay messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
}

export default ChatWindow;
