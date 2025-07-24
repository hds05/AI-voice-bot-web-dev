import React, { useEffect, useRef } from "react";

const VoicePlayer = ({ audioUrl, onEnded, isSpeaking, setIsSpeaking }) => {
  const audioRef = useRef(null);
  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      if (setIsSpeaking) setIsSpeaking(true);
    }
  }, [audioUrl]);
  const handleEnded = () => {
    if (onEnded) onEnded();
    if (setIsSpeaking) setIsSpeaking(false);
  };
  return (
    <>
      {isSpeaking && (
        <div className="voice-wave">
          <span className="voice-wave-bar" />
          <span className="voice-wave-bar" />
        </div>
      )}
      <audio ref={audioRef} onEnded={handleEnded} />
    </>
  );
};

export default VoicePlayer; 