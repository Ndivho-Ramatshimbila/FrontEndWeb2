import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import ChatHeader from "../../components/ChatHeader";
import MessageList from "../../components/MessageList";
import MessageInput from "../../components/MessageInput";
import '../../styles/components/_chat.scss';

const Inbox = () => {
  const navigate = useNavigate(); // ✅ Hook for navigation

  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! How can I help you with your event?",
      sender: "admin",
      timestamp: new Date("2024-01-15T10:30:00"),
    },
  ]);

  const handleSend = (text) => {
    const newMsg = {
      id: Date.now().toString(),
      text,
      sender: "organizer",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMsg]);

    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        text: "Thank you for your message. I will get back to you shortly.",
        sender: "admin",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 2000);
  };

  return (
    <div className="chat-container">
      <ChatHeader
        adminName="TUT Administrator"
        department="Events Department"
        onBack={() => navigate("/")} // ✅ Navigate home
      />
      <MessageList messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default Inbox;
