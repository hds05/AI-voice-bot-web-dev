import React from "react";

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-[80%] text-base md:text-lg shadow-md break-words
          ${isUser ? 'bg-[#7f5af0] text-[#fffffe] rounded-br-none' : 'bg-[#121629] text-[#a7a9be] rounded-bl-none'}`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble; 