"use client";

import type { Episode } from "@/types/Character";
import { useState } from "react";
import Loading from "./Loading";

type Props = {
  episodes: Episode[];
};

export default function CharacterEpisodes({ episodes }: Props) {
  const [sortBy, setSortBy] = useState(true);

  let sortedEpisodes;

  if (sortBy) {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
    );
  } else {
    sortedEpisodes = [...episodes].sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );
  }

  if (!sortedEpisodes) return <Loading />;

  return (
    <section
      data-test="character-episodes"
      className="bg-slate-800 mt-10 p-3 rounded-xl m-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-slate-400 font-bold">List of Episodes:</h3>
        <button onClick={() => setSortBy((prev) => !prev)}>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`${
              sortBy ? "rotate-180" : "rotate-0"
            } transition-all duration-300 w-5 h-5 stroke-slate-400`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
      <ul className="flex flex-col gap-3 mt-3">
        {sortedEpisodes.map(({ id, name, air_date, episode }, index) => (
          <li
            key={id}
            className="flex flex-col md:flex-row items-center justify-between hover:bg-slate-700 hover:p-2 hover:rounded-lg cursor-pointer text-white text-center gap-2"
          >
            <p>
              {String(++index).padStart(2, "0")} - {episode} :
              <strong>{name}</strong>
            </p>
            <p className="bg-slate-600 px-2 rounded-xl">{air_date}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
