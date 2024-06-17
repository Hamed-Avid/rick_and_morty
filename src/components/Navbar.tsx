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

export default function Navbar({ search, handler, count }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const [favorites, setFavorites] = useLocalStorage<Character[]>(
    "Favorites",
    []
  );

  const deleteFavoriteHandler = (id: number) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  return (
    <nav className="flex items-center justify-between bg-slate-800 p-5 rounded-xl">
      <p className="text-slate-400 text-xl font-bold">Rick and Morty 😍</p>
      <input
        type="text"
        value={search}
        onChange={(e) => handler(e.target.value)}
        placeholder="search ..."
        className="bg-slate-600 text-white py-1 px-2 rounded-xl"
      />
      {!!search.length && (
        <p data-id="search-results" className="text-slate-400">
          found {count} characters
        </p>
      )}
      <Modal
        isOpen={isOpen}
        handler={() => setIsOpen(false)}
        title="List of Favorites"
      >
        <CharacterModal
          favorites={favorites}
          onDelete={deleteFavoriteHandler}
        />
      </Modal>
      <button
        data-id="favorites-btn"
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
        {favorites && (
          <span className="absolute -top-2 right-[1px] text-white">
            {favorites.length > 0 ? favorites.length : ""}
          </span>
        )}
      </button>
    </nav>
  );
}
