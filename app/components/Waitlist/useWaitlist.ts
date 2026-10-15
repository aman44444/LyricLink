"use client";

import { useState } from "react";

export function useWaitlistModal() {
  const [isOpen, setIsOpen] = useState(true); // open on first render

  const closeModal = () => setIsOpen(false);

  return { isOpen, closeModal };
}
