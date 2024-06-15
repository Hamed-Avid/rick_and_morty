import type { Character } from "@/types/Character";
import Image from "next/image";
import Link from "next/link";

type Props = {
  item: Character;
  children?: React.ReactNode;
};

export function CharacterCard({ item, children }: Props) {
  const { id, name, gender, image, status, species, location } = item;
  return (
    <Link
      href={`/character/${id}`}
      className="flex flex-col items-center justify-between text-white bg-slate-800 hover:scale-105 cursor-pointer rounded-xl gap-5 p-5"
    >
      <Image
        src={image}
        width={300}
        height={300}
        alt={name}
        className="aspect-square rounded-xl"
      />
      <div className="flex flex-col items-center gap-2">
        <h3>
          <span>{gender === "Male" ? "👦" : "👧"}</span>
          <span>{name}</span>
        </h3>
        <p>
          <span>{status === "Dead" ? "🔴" : "🟢"}</span>
          <span>{status}</span>
          <span> - {species}</span>
        </p>
        <p className="flex flex-col items-center">
          <span className="text-slate-500">Last known location:</span>
          <span className="text-white">{location.name}</span>
        </p>
      </div>
      {children}
    </Link>
  );
}
