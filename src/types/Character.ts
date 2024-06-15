export type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  image: string;
  location: {
    name: string;
  };
  episode?: Episode[];
};

export type Episode = {
  id: number;
  name: string;
  created: string;
  air_date: string;
  episode: string;
};
