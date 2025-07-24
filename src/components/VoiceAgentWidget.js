// import React from "react";

// const VoiceInput = ({ onVoiceInput, isListening }) => (
//   <button
//     className={`px-4 py-2 rounded-lg font-semibold text-base md:text-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[#7f5af0] 
//       ${isListening ? 'bg-[#7f5af0] text-[#fffffe]' : 'bg-[#232946] text-[#7f5af0] border border-[#7f5af0]'}`}
//     onClick={onVoiceInput}
//   >
//     {isListening ? "Stop Listening" : "Speak"}
//   </button>
// );

// export default VoiceInput; 
// components/VoiceAgentWidget.js
import { useEffect } from 'react';

const VoiceAgentWidget = ({ agentId }) => {
  useEffect(() => {
    // Avoid duplicate script injection
    const existingScript = document.getElementById('elevenlabs-widget');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      script.id = 'elevenlabs-widget';
      document.body.appendChild(script);
    }

    // Add the custom element dynamically
    const existingWidget = document.querySelector('elevenlabs-convai');
    if (!existingWidget) {
      const widget = document.createElement('elevenlabs-convai');
      widget.setAttribute('agent-id', agentId);
      document.body.appendChild(widget);
    }

    return () => {
      const widget = document.querySelector('elevenlabs-convai');
      if (widget) widget.remove(); // Cleanup on unmount
    };
  }, [agentId]);

  return null;
};

export default VoiceAgentWidget;
