"use client";

import { useState } from "react";
import { firestore } from "@/app/utils/firebase.config";
import { addDoc, collection, serverTimestamp} from "firebase/firestore";

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
  <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-3xl
          border
          border-white/20
          bg-white/10
          backdrop-blur-2xl
          shadow-[0_8px_32px_rgba(0,0,0,0.35)]
          p-6
        "
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent" />

        <div className="relative z-10 text-white">
          {!joined ? (
            <>
              <h2 className="text-2xl font-bold mb-3">
                🎵 LyricLink Early Access
              </h2>

              <p className="text-white/80 mb-3">
                Spotify is currently reviewing LyricLink for public access.
              </p>

              <p className="text-white/70 mb-6">
                Only approved Spotify accounts can sign in right now.
                Join the waitlist and we will notify you when public access
                becomes available.
              </p>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  px-4
                  py-3
                  text-white
                  placeholder:text-white/50
                  outline-none
                  focus:border-green-500
                  mb-4
                "
              />

              <div className="flex gap-3">
                <button
                  onClick={joinWaitlist}
                  disabled={loading}
                  className="
                    flex-1
                    rounded-xl
                    bg-green-600
                    py-3
                    font-semibold
                    transition
                    hover:bg-green-500
                    disabled:opacity-50
                  "
                >
                  {loading ? "Joining..." : "Join Waitlist"}
                </button>

                <button
                  onClick={onClose}
                  className="
                    flex-1
                    rounded-xl
                    border
                    border-white/20
                    bg-white/10
                    py-3
                    font-semibold
                    hover:bg-white/20
                    transition
                  "
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

              <p className="text-white/80 mb-6">
                We will email you when Spotify approves public access to
                LyricLink.
              </p>

              <button
                onClick={onClose}
                className="
                  w-full
                  rounded-xl
                  bg-green-600
                  py-3
                  font-semibold
                  hover:bg-green-500
                  transition
                "
              >
                Continue
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}