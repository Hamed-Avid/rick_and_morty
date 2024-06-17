"use client";

import CharacterEpisodes from "@/components/CharacterEpisodes";
import Loading from "@/components/Loading";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Get_Character } from "@/lib/queries";
import type { Character } from "@/types/Character";
import { useQuery } from "@apollo/client";
import Link from "next/link";

type Props = {
  params: {
    slug: string;
  };
};

export default function Character({ params }: Props) {
  const { data, loading } = useQuery(Get_Character, {
    variables: { id: params.slug },
  });

  const [favorites, setFavorites] = useLocalStorage<Character[]>(
    "Favorites",
    []
  );

  const {
    id,
    name,
    image,
    gender,
    status,
    species,
    location,
    episode,
  }: Character = data?.character || {};

  if (loading) return <Loading />;

  const addFavoriteHandler = () => {
    setFavorites([...favorites, data?.character]);
  };

  const isAdded = favorites.some((item: Character) => item.id === id);

  return (
    <>
      <section
        data-id="character-info"
        className="col-span-2 flex-1 flex items-center justify-between bg-slate-800 rounded-xl m-5 pr-5"
      >
        <div className="flex-1 flex items-center gap-5 rounded-xl">
          <img src={image} alt={name} className="w-40 rounded-xl" />
          <div className="flex flex-col gap-2">
            <h3>
              <span>{gender === "Male" ? "👦" : "👧"}</span>
              <span className="text-white text-xl">&nbsp;{name}</span>
            </h3>
            <div>
              <span>{status === "Dead" ? "🔴" : "🟢"}</span>
              <span className="text-white">&nbsp;{status}</span>
              <span className="text-white"> - &nbsp;{species}</span>
            </div>
            <div>
              <p className="text-slate-500">Last known location:</p>
              <p className="text-white">{location.name}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-end justify-between gap-20">
          <Link
            data-id="back-to-home"
            href={"/"}
            className="bg-slate-700 text-white font-bold py-1 px-4 rounded-xl"
          >
            Back to home
          </Link>
          {isAdded ? (
            <p className="bg-slate-700 text-white font-bold py-1 px-4 rounded-xl">
              Already Added to Favorites ✅
            </p>
          ) : (
            <button
              data-id="add-favorite"
              onClick={addFavoriteHandler}
              className="bg-slate-700 text-white font-bold py-1 px-4 rounded-xl"
            >
              Add to Favorite
            </button>
          )}
        </div>
      </section>
      {episode && <CharacterEpisodes episodes={episode} />}
    </>
  );
}
