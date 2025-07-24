import React from "react";
import MessageBubble from "./MessageBubble";
import InputBox from "./InputBox";
import VoiceInput from "./VoiceInput";

const ChatContainer = ({ messages, onSend, onVoiceInput, isListening }) => (
  <div className="flex flex-col w-full max-w-2xl h-[60vh] md:h-[70vh] bg-[#232946] rounded-xl shadow-lg p-4 md:p-6 overflow-hidden">
    <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2">
      {messages.map((msg, idx) => (
        <MessageBubble key={idx} message={msg} />
      ))}
    </div>
    <div className="flex flex-row gap-2 items-center mt-auto">
      <InputBox onSend={onSend} />
      <VoiceInput onVoiceInput={onVoiceInput} isListening={isListening} />
    </div>
  </div>
);

export default ChatContainer; 