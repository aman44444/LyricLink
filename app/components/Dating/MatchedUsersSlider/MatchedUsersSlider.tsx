"use client";
import React, { useState } from "react";
import { UserData } from "@/app/interface/types";

interface Props {
  matchedUsers: UserData[];
}

export default function MatchedUsersSlider({ matchedUsers }: Props) {
  const [i, setI] = useState(0);
  const user = matchedUsers[i];

  return (
    <div className="w-full flex justify-center items-center px-4 py-20">
      <div className="relative w-full max-w-sm">

        {/* Liquid Glass Card */}
        <div className="flex flex-col rounded-[40px] bg-white-400/20 backdrop-blur-[2px]
                        border border-white/30  p-5 text-center">
          <div className="flex flex-col pb-2 pt-2 bg-white w-7/8 items-center border-neutral-400/20 rounded-md justify-center">
            <img
              src={user.images?.[0]?.url}
              className="w-36 h-36 rounded-md object-cover shadow-2xl "
            />
                <h2 className="text-2xl font-semibold text-black tracking-wide">
              {user.display_name}
            </h2>
          </div>

          <div className="mt-2">
        
            <p className="text-white/70 text-xs">Shared Music Energy</p>

            <div className="mt-2 h-2 w-full rounded-full bg-white/20 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-white/90 animate-pulse" />
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {user.topArtists.slice(0, 3).map((a: any, k: number) => (
                <span key={k}
                  className="px-2 py-1.5 rounded-full bg-white/25 text-xs text-white
                             backdrop-blur-xl shadow-md border border-white/20">
                  {a.name}
                </span>
              ))}
            </div>

            <button className="mt-7 w-full py-3 rounded-2xl 
                               bg-white/80 text-black font-medium 
                               shadow-xl hover:scale-[1.03] transition">
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
