"use client";

import { useEffect, useState } from "react";


export default function CardPage({ senderName, questionText, revealText }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    function createHeart() {
      const heart = document.createElement("img");
      heart.src = "/heart.png";
      heart.className = "heart";

      // Random horizontal position and size
      heart.style.left = Math.random() * 100 + "vw";
      const size = 20 + Math.random() * 20;
      heart.style.width = size + "px";

      // Random horizontal drift
      const driftX = (Math.random() - 0.5) * 50; // ±25px

      // Random duration
      const duration = 5 + Math.random() * 5;

      // Fixed position, bottom start
      heart.style.position = "fixed";
      heart.style.bottom = "0";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "-1";

      // Inline animation with random drift
      heart.style.animation = `floatUp ${duration}s linear forwards`;
      heart.style.setProperty("--driftX", driftX + "px");

      document.body.appendChild(heart);

      // Remove after animation
      setTimeout(() => heart.remove(), duration * 1000);
    }

    const interval = setInterval(createHeart, 400);
    return () => clearInterval(interval);
  }, []);

  function handleClick() {
    setRevealed(true);
  }

  return (
    <div className="container">
      <div className="cats">
        <img src="/1.png" alt="cat" />
        <img src="/2.png" alt="cat" />
        <img src="/3.png" alt="cat" />
      </div>

      <h1>{questionText}</h1>

      {!revealed && (
        <button id="yesBtn" onClick={handleClick}>
          YES 😳💘
        </button>
      )}

      {revealed && <div className="revealText">{revealText}</div>}

      <div className="signature" style={{ fontFamily: "'Great Vibes', cursive" }}>Sincerely, {senderName}</div>
 

      <style jsx>{`
        body {
          margin: 0;
          height: 100%;
          background: #ffe0e5;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: Arial, sans-serif;
        }




        .container {
          margin-top: 150px;
          text-align: center;
          position: relative;
          z-index: 2;
          padding: 20px;
        }

        .cats img {
          width: 120px;
          margin: 0 10px;
        }

        h1 {
          font-size: 36px;
          margin-bottom: 30px;
        }

        button {
          font-size: 28px;
          padding: 18px 50px;
          border: none;
          border-radius: 50px;
          background: #ff5fa2;
          color: white;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
          transition: transform 0.2s ease;
        }

        button:hover {
          transform: scale(1.08);
        }

        .signature {
          margin-top: 30px;
          fontFamily: "'Great Vibes', cursive"
          font-size: 26px;
          color: #444;
        }

        .revealText {
          font-family: 'Great Vibes', cursive;
          font-size: 32px;
          color: #ff5fa2;
          margin: 30px 0;
        }

        /* Floating hearts */
        .heart {
          will-change: transform;
          pointer-events: none;
        }

        @keyframes floatUp {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0.9;
          }
          50% {
            transform: translateX(calc(var(--driftX) / 2)) translateY(-50vh);
            opacity: 0.7;
          }
          100% {
            transform: translateX(var(--driftX)) translateY(-120vh);
            opacity: 0;
          }
        }
      `}</style>


    </div>
  );
}
