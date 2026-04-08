import React, { useState } from 'react';
import { Scissors } from 'lucide-react';
import './ScissorsIntro.css';

export default function ScissorsIntro({ onComplete }) {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (clicked) return;
    setClicked(true);
    setTimeout(() => onComplete && onComplete(), 600);
  };

  return (
    <div className={`scissors-overlay ${clicked ? 'exit' : ''}`}>
      <div className="scissors-stage" onClick={handleClick}>
        <Scissors
          size={120}
          color="#ff4d4d"
          className="scissors-icon"
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
}
