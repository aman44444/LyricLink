"use client";

import { useEffect, useState } from "react";

export function useWaitlistModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(
      "lyriclink-waitlist-dismissed"
    );

    if (dismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    localStorage.setItem(
      "lyriclink-waitlist-dismissed",
      "true"
    );

    setIsOpen(false);
  };

  return {
    isOpen,
    closeModal,
  };
}