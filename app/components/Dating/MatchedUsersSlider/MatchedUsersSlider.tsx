"use client";
import React, { useState } from "react";
import { UserData } from "@/app/interface/types";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

interface Props {
  matchedUsers: (UserData & { similarity: number })[];
}

export default function MatchedUsersSlider({ matchedUsers }: Props) {
  const [i, setI] = useState(0);
  const user = matchedUsers[i];

  const next = () => setI((i + 1) % matchedUsers.length);
  const prev = () => setI((i - 1 + matchedUsers.length) % matchedUsers.length);

  return (
    <div className="w-full flex justify-center items-center px-3 py-16 sm:py-20">
      <div className="relative w-full max-w-[280px] sm:max-w-sm">
        {/* Liquid Glass Card */}
        <div
          className="flex flex-col rounded-[32px]  sm:rounded-[40px] bg-black/10 backdrop-blur-[2px]
                        border border-white/30  p-4 sm:p-5 text-center"
        >
          <div className="flex flex-col pb-2 pt-2 bg-white/60 backdrop-blur-[2px] w-7/8 items-center border-neutral-400/20 rounded-md justify-center">
            <img
              src={user.images?.[0]?.url}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl object-cover shadow-2xl "
            />
            <h2 className="mt-2 text-lg sm:text-2xl font-semibold text-black tracking-wide">
              {user.display_name}
            </h2>
          </div>

          <div className="mt-2">
            <div className="mt-2 w-5/6 h-2 rounded-full bg-white/20 overflow-hidden mx-auto">
              <div
                className="h-full rounded-full bg-gradient-to-r from-lime-300 via-green-400 to-emerald-500 transition-all duration-700"
                style={{ width: `${Math.round(user.similarity * 100)}%` }}
              />
            </div>

            <p className="mt-1 text-[10px] text-white/60">
              {Math.round(user.similarity * 100)}% music match
            </p>

            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {user.topArtists.slice(0, 3).map((a: any, k: number) => (
                <span
                  key={k}
                  className="px-2 py-1.5 rounded-full bg-black text-xs text-white
                             backdrop-blur-xl shadow-md border border-white/20"
                >
                  {a.name}
                </span>
              ))}
            </div>

            <button
              className="mt-6 w-full py-2.5 rounded-xl 
                               font-medium 
                               shadow-xl hover:scale-95 transition bg-black/10 hover:bg-black/50 border-[1px] border-gray-500 backdrop-blur-md "
            >
              Connect
            </button>
          </div>
        </div>
        <div className="relative w-full max-w-sm">
          <button
            onClick={prev}
            className="absolute -left-2 sm:top-[-200px] top-[-185px] -translate-y-1/2
             w-8 h-8 sm:w-7 sm:h-7 rounded-full bg-white/30 backdrop-blur-xl
             shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),
                     0_10px_30px_rgba(0,0,0,0.45)]
             text-black text-2xl hover:scale-110 active:scale-95 transition flex justify-center items-center"
          >
            <GrFormPrevious className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={next}
            className="absolute -right-2 sm:top-[-200px] top-[-185px] -translate-y-1/2
             w-8 h-8  sm:w-7 sm:h-7 rounded-full bg-white/30 backdrop-blur-xl
             shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),
                     0_10px_30px_rgba(181, 175, 175, 0.45)]
             text-black text-2xl hover:scale-110 active:scale-95 transition flex justify-center items-center"
          >
            <MdOutlineNavigateNext className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
