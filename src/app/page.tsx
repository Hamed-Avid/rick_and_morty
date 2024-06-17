import CharacterList from "@/components/CharacterList";
import Loading from "@/components/Loading";
import client from "@/lib/client";
import { GET_ALL_CHARACTERS } from "@/lib/queries";
import { Suspense } from "react";

export default async function Home() {
  const { data, loading } = await client.query({
    query: GET_ALL_CHARACTERS,
    variables: { page: 1 },
  });

  return (
    <main className="flex flex-col gap-5 mx-5 pt-5 rounded-xl min-h-screen h-full">
      <Suspense fallback={<Loading />}>
        <CharacterList
          charactersData={data.characters.results}
          isLoading={loading}
        />
      </Suspense>
    </main>
  );
}
