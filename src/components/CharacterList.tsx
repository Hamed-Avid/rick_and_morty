"use client";

import type { Character } from "@/types/Character";
import Loading from "./Loading";
import { CharacterCard } from "./CharacterCard";
import { useQuery } from "@apollo/client";
import { GET_ALL_CHARACTERS } from "@/lib/queries";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

type Props = {
  charactersData: Character[];
  isLoading: boolean;
};

export default function CharacterList({ charactersData, isLoading }: Props) {
  const [page, setPage] = useState<number | null>(null);
  const [characters, setCharacters] = useState(charactersData);
  const [search, setSearch] = useState("");

  const { data, loading } = useQuery(GET_ALL_CHARACTERS, {
    variables: { page, name: search },
  });

  useEffect(() => {
    if (data) {
      setCharacters(data.characters.results);
    }
  }, [data]);

  useEffect(() => {
    if (search.length) {
      setPage(1);
    }
  }, [search]);

  return (
    <>
      <Navbar
        search={search}
        handler={(value) => setSearch(value)}
        count={data?.characters.info.count}
      />
      <section>
        {isLoading || (page && loading) ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-7">
            {characters.map((item) => (
              <CharacterCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <footer className="flex items-center justify-center gap-10 my-10">
        <button
          onClick={() =>
            data?.characters.info.prev && setPage(data?.characters.info.prev)
          }
          disabled={!data?.characters.info.prev}
          className="text-slate-300 bg-slate-600 rounded-md hover:bg-slate-500 disabled:bg-slate-700 w-24 p-2"
        >
          Prev
        </button>

        <button
          onClick={() =>
            data?.characters.info.next && setPage(data?.characters.info.next)
          }
          disabled={!data?.characters.info.next}
          className="text-slate-300 bg-slate-600 rounded-md hover:bg-slate-500 disabled:bg-slate-700 w-24 p-2"
        >
          Next
        </button>
      </footer>
    </>
  );
}
