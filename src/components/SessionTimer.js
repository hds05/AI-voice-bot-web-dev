import React, { useEffect, useState, useRef } from 'react';

export default function SessionTimer({ duration = 180, isActive, onSessionEnd }) {
  const [remaining, setRemaining] = useState(duration);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      setRemaining(duration); // Reset timer when activated
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, duration]);

  // Call onSessionEnd when remaining reaches 0
  useEffect(() => {
    if (remaining === 0 && onSessionEnd) {
      onSessionEnd();
    }
  }, [remaining, onSessionEnd]);

  // Progress for circular indicator
  const percent = ((duration - remaining) / duration) * 100;
  const radius = 40;
  const stroke = 3;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="w-full flex flex-col items-center justify-center mb-6">
      <div className="relative flex items-center justify-center">
        <svg
          height={radius * 2}
          width={radius * 2}
          className="block"
        >
          <circle
            stroke="#22223b"
            fill="none"
            strokeWidth={stroke}
            cx={radius}
            cy={radius}
            r={normalizedRadius}
          />
          <circle
            stroke="#7f5af0"
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s linear' }}
            cx={radius}
            cy={radius}
            r={normalizedRadius}
          />
        </svg>
        <span className="absolute text-lg md:text-xl font-extrabold text-[#fffffe] select-none" style={{fontVariantNumeric:'tabular-nums'}}>
          {String(Math.floor(remaining / 60)).padStart(2, '0')}:{String(remaining % 60).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-sm md:text-[10px] text-[#a7a9be] tracking-wide uppercase font-semibold">Session Time Left</span>
    </div>
  );
} 