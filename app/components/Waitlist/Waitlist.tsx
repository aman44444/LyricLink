"use client";

import { useState } from "react";
import { firestore } from "@/app/utils/firebase.config";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaitlistModal({
  isOpen,
  onClose,
}: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);

  if (!isOpen) return null;

  const joinWaitlist = async () => {
    if (!email.trim()) return;

    try {
      setLoading(true);

      await addDoc(
        collection(firestore, "waitlist"),
        {
          email,
          createdAt: serverTimestamp(),
        }
      );

      setJoined(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="bg-neutral-900 rounded-2xl p-6 max-w-md w-full text-white shadow-xl">

        {!joined ? (
          <>
            <h2 className="text-2xl font-bold mb-3">
              🎵 LyricLink Early Access
            </h2>

            <p className="text-gray-300 mb-3">
              Spotify is currently reviewing LyricLink for public access.
            </p>

            <p className="text-gray-300 mb-6">
              Only approved Spotify accounts can sign in right now.
              Join the waitlist and we will notify you when public access
              becomes available.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg p-3 text-black mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex gap-3">
              <button
                onClick={joinWaitlist}
                disabled={loading}
                className="flex-1 bg-green-600 py-3 rounded-lg"
              >
                {loading
                  ? "Joining..."
                  : "Join Waitlist"}
              </button>

              <button
                onClick={onClose}
                className="flex-1 bg-neutral-700 py-3 rounded-lg"
              >
                Continue
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-3">
              🎉 You are on the list
            </h2>

            <p className="text-gray-300 mb-6">
              We will email you when Spotify approves
              public access to LyricLink.
            </p>

            <button
              onClick={onClose}
              className="w-full bg-green-600 py-3 rounded-lg"
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
}