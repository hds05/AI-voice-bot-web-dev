import React, { useState } from "react";

const InputBox = ({ onSend }) => {
  const [input, setInput] = useState("");
  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };
  return (
    <div className="flex flex-row w-full gap-2">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
        className="flex-1 px-4 py-2 rounded-lg bg-[#121629] text-[#fffffe] border border-[#7f5af0] focus:outline-none focus:ring-2 focus:ring-[#7f5af0] text-base md:text-lg"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 rounded-lg bg-[#7f5af0] text-[#fffffe] font-semibold text-base md:text-lg shadow-md hover:bg-[#6246ea] transition-colors"
      >
        Send
      </button>
    </div>
  );
};

export default InputBox; 