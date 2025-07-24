import React, { useEffect, useRef, useState } from "react";

const AIAvatarChat = ({ lastUserMsg, lastAIMsg, timer, onStartConversation, isConversationActive }) => {
  const [displayTimer, setDisplayTimer] = useState(timer || 0);
  const intervalRef = useRef();
  const widgetInjectedRef = useRef(false);

  useEffect(() => {
    if (timer !== undefined) {
      setDisplayTimer(timer);
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDisplayTimer((t) => t + 1);
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [timer]);

  useEffect(() => {
    if (isConversationActive && !widgetInjectedRef.current) {
      const widget = document.createElement("elevenlabs-convai");
      widget.setAttribute("agent-id", "agent_01k0p8fq0vf6nb47h24sap5x01");
  
      // Make sure it's completely hidden but in DOM
      widget.style.position = "absolute";
      widget.style.width = "0";
      widget.style.height = "0";
      widget.style.overflow = "hidden";
      widget.style.opacity = "0";
      widget.style.pointerEvents = "none";
  
      document.body.appendChild(widget);
  
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
  
      widgetInjectedRef.current = true;
    }
  }, [isConversationActive]);
  

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

      <div className="avatar-status">
        {/* <button className="avatar-title" >
          {isConversationActive ? "End Conversation" : "Start a Conversation"}
        </button> */}
        <elevenlabs-convai onClick={onStartConversation} agent-id="agent_01k0p8fq0vf6nb47h24sap5x01"></elevenlabs-convai><script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
      </div>
    </div>
  );
};

export default AIAvatarChat;
