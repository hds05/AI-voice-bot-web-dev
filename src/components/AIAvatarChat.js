'use client';
import React, { useEffect, useState } from 'react';

const AIAvatarChat = ({
  lastUserMsg,
  lastAIMsg,
  timer,
  onStartConversation,
  isConversationActive,
}) => {
  const [displayTimer, setDisplayTimer] = useState(timer || 0);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const ELEVEN_API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;

  // ⏱ Update timer display
  useEffect(() => {
    let interval;
    if (timer !== undefined) {
      setDisplayTimer(timer);
      interval = setInterval(() => {
        setDisplayTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // 📜 Load ElevenLabs Widget Script
  useEffect(() => {
    if (!ELEVEN_API_KEY) return;

    const existingScript = document.querySelector(
      'script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]'
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }
  }, [ELEVEN_API_KEY]);

  return (
    <div className="avatar-chat-center">
      <div className="avatar-glow">
        <div className="glow-ring ring1" />
        <div className="glow-ring ring2" />
        <div className="glow-ring ring3" />
        <img
          src="https://cdn.kwork.com/files/portfolio/t3/24/a5bf8465becd2274bd38894122c7020e96115673-1711803733.jpg"
          alt="AI Avatar"
          className="avatar-img"
        />
      </div>

      <div className="avatar-status mt-4">
        {ELEVEN_API_KEY ? (
          isScriptLoaded ? (
            <elevenlabs-convai
              agent-id="agent_01k0p8fq0vf6nb47h24sap5x01"
              onClick={onStartConversation}
            ></elevenlabs-convai>
          ) : (
            <p className="text-yellow-400">Loading voice assistant...</p>
          )
        ) : (
          <p className="text-red-500 text-center">
            Voice assistant is disabled. 
            {/* Please define{' '}
            <code>NEXT_PUBLIC_ELEVENLABS_API_KEY</code> in your{' '}
            <code>.env.local</code>. */}
          </p>
        )}
      </div>
    </div>
  );
};

export default AIAvatarChat;
