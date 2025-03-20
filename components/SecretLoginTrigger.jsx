"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SecretLoginTrigger() {
  const [konami, setKonami] = useState([]);
  const [secretClicks, setSecretClicks] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const router = useRouter();

  // The Konami Code sequence
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  // Secret click pattern on your name/logo
  const handleSecretClick = () => {
    const now = Date.now();

    // Reset counter if more than 2 seconds between clicks
    if (now - lastClickTime > 2000) {
      setSecretClicks(1);
    } else {
      setSecretClicks(secretClicks + 1);
    }

    setLastClickTime(now);

    // After 5 rapid clicks, go to login
    if (secretClicks >= 4) {
      router.push("/admin/login");
      setSecretClicks(0);
    }
  };

  useEffect(() => {
    // Keyboard sequence detector
    const handleKeyDown = (e) => {
      // Update the state with the latest key
      setKonami((prev) => [...prev, e.key]);

      // Keep only the last N keys where N is the length of the code
      setKonami((prev) => prev.slice(-konamiCode.length));
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Check if the Konami code has been entered
  useEffect(() => {
    if (konami.length === konamiCode.length) {
      const isKonamiCode = konami.every(
        (key, index) => key === konamiCode[index]
      );

      if (isKonamiCode) {
        router.push("/admin/login");
      }
    }
  }, [konami, router]);

  // This component doesn't render anything visible
  return (
    <div
      onClick={handleSecretClick}
      id="secret-trigger"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "1px",
        height: "1px",
        opacity: 0,
      }}
    />
  );
}
