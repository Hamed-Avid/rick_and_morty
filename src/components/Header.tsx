"use client";

import { useState } from "react";
import Modal from "@/components/Modal";
import { CharacterModal } from "./CharacterModal";
import type { Character } from "@/types/Character";
import useLocalStorage from "@/hooks/useLocalStorage";

type Props = {
  search: string;
  handler: (value: string) => void;
  count: number | null;
};

export default function Header({ search, handler, count }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [favorites, setFavorites] = useLocalStorage<Character[]>(
    "Favorites",
    []
  );

  const deleteFavoriteHandler = (id: number) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  return (
    <header className="flex flex-col md:flex-row bg-slate-800 px-5 py-3 md:p-5 rounded-xl gap-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-slate-400 text-xl font-bold">Rick and Morty 😍</h1>
        <input
          type="text"
          value={search}
          onChange={(e) => handler(e.target.value)}
          placeholder="search ..."
          className="hidden md:block bg-slate-600 text-white py-1 px-2 rounded-xl"
        />
        {!!search.length && count && (
          <p className="hidden md:block text-slate-400">
            found {count} characters
          </p>
        )}
        <button
          data-test="favorites-btn"
          className="relative"
          onClick={() => setIsOpen(true)}
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="w-6 h-6 stroke-red-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span className="absolute -top-2 right-[1px] text-white">
            {favorites?.length > 0 && favorites.length}
          </span>
        </button>
      </div>
      <input
        type="text"
        value={search}
        onChange={(e) => handler(e.target.value)}
        placeholder="search ..."
        className="md:hidden bg-slate-600 text-white py-1 px-2 rounded-xl mb-2"
      />
      {!!search.length && count && (
        <p className="md:hidden text-slate-400 text-center outline-none focus:outline-none focus:border-none">
          found {count} characters
        </p>
      )}
      {isOpen && (
        <Modal handler={() => setIsOpen(false)} title="List of Favorites">
          <CharacterModal
            favorites={favorites}
            onDelete={deleteFavoriteHandler}
          />
        </Modal>
      )}
    </header>
  );
}
