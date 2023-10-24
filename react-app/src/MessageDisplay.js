import React, { useEffect, useRef } from 'react';

function MessageDisplay({ messages }) {
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="message-display">
            {messages.map((message, index) => (
                <div key={index} className={`message-container ${message.sender}`}>
                    <div className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                </div>
            ))}
            <div ref={endOfMessagesRef}></div>
        </div>
    );
}

export default MessageDisplay;
