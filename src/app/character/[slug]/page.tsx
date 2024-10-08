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
        data-test="character-info"
        className="col-span-2 flex-1 flex flex-col md:flex-row items-center justify-between bg-slate-800 rounded-xl m-5"
      >
        <div className="flex-1 flex items-center gap-5 rounded-xl w-full text-white text-sm md:text-base">
          <img src={image} alt={name} className="w-40 rounded-xl" />
          <div className="flex flex-col gap-2">
            <h3>
              <span>{gender === "Male" ? "👦" : "👧"}</span>
              <span className="text-white md:text-xl">&nbsp;{name}</span>
            </h3>
            <div>
              <span>{status === "Dead" ? "🔴" : "🟢"}</span>
              <span>&nbsp;{status}</span>
              <span> - &nbsp;{species}</span>
            </div>
            <div>
              <p className="text-slate-500">Last known location:</p>
              <p>{location.name}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 flex md:flex-col items-end justify-between w-full md:gap-20 py-4 px-2 whitespace-nowrap">
          <Link
            data-test="back-to-home"
            href={"/"}
            className="bg-slate-700 text-white text-sm md:text-base md:font-bold py-1 px-4 rounded-xl"
          >
            Back to home
          </Link>
          {isAdded ? (
            <p className="bg-slate-700 text-white text-sm md:text-base md:font-bold py-1 px-4 rounded-xl">
              Already Added ✅
            </p>
          ) : (
            <button
              onClick={addFavoriteHandler}
              className="bg-slate-700 text-white text-sm md:text-base md:font-bold py-1 px-4 rounded-xl"
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
