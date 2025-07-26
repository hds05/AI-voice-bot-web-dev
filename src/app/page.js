'use client';
import React, { useState } from "react";
import AIAvatarChat from "../components/AIAvatarChat";
import SessionTimer from "../components/SessionTimer";

export default function Home() {
  const [isConversationActive, setIsConversationActive] = useState(false);
  const [timer, setTimer] = useState(undefined);

  const handleStartConversation = () => {
    if (!isConversationActive) {
      setIsConversationActive(true);
      setTimer(0); // Start timer
      console.log("Conversation started");
    } else {
      setIsConversationActive(false);
      setTimer(undefined); // Reset timer
      console.log("Conversation ended");
    }
  };

  const handleSessionEnd = () => {
    setIsConversationActive(false);
    setTimer(undefined); // Reset timer
    console.log("Session timer ended, conversation stopped");
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      <section className="hero-section w-full flex flex-col md:flex-row justify-between items-center mb-10 px-6">
        {/* Left content - centered */}
        <div className="md:relative left-15 flex-1 flex flex-col items-center text-center">
          <h1 className="hero-title text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Your AI Voice Agent
          </h1>
          <p className="hero-subtitle text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-medium mb-2">
            Speak to interact. The agent will listen and respond until session ends.
          </p>
        </div>

        {/* Right - Session Timer */}
        <div className="ml-4">
          <SessionTimer
            duration={180}
            isActive={isConversationActive}
            onSessionEnd={handleSessionEnd}
          />
        </div>
      </section>

      <AIAvatarChat
        onStartConversation={handleStartConversation}
        isConversationActive={isConversationActive}
        timer={timer}
      />
    </div>
  );
}
