export type Category = {
  name: string;
};

export type Pokemon = {
  name: string;
  url: string;
};

export type PokemonResponse = {
  pokemon: {
    pokemon: Pokemon;
  }[];
};
