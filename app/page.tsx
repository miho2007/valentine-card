"use client";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import styles from "./app.module.css";
import PayPalButton from "../components/PayPalButton";

export default function HomePage() {
  const [senderName, setSenderName] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [revealText, setRevealText] = useState("");
  const [cardLink, setCardLink] = useState("");
  const [paid, setPaid] = useState(false);

  const handlePaymentSuccess = async () => {
    // Call your API to create card after payment
    const res = await fetch("/api/create-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sender_name: senderName,
        question_text: questionText,
        reveal_text: revealText,
      }),
    });

    const data = await res.json();
    if (data.url) setCardLink(data.url);
    setPaid(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>💌 Create Your Valentine’s Card 💌</h1>
      <p className={styles.subtitle}>
        Fill out the form below, pay, and get a unique link + QR code to share your card!
      </p>

      <div className={styles.cardForm}>
        <input
          className={styles.input}
          placeholder="Your Name"
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Question / Message (ex: will u be my vlentine)"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Reveal Text (ex: meet me at 17:00)"
          value={revealText}
          onChange={(e) => setRevealText(e.target.value)}
        />

        {!paid && (
          <div style={{ marginTop: "1rem" }}>
            <PayPalButton onSuccess={handlePaymentSuccess} />
          </div>
        )}

        {cardLink && (
          <div style={{ marginTop: "1rem", textAlign: "center", color: "#999" }}>
            <p>Your card link:</p>
            <a href={cardLink} target="_blank" rel="noreferrer">
              {cardLink}
            </a>

            <div style={{ marginTop: "1rem", marginLeft: "120px"}}>
              <QRCodeCanvas value={cardLink} size={180} bgColor="#ffffff" fgColor="#ff4b61" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
