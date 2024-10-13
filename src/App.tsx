import { Grid, GridItem } from "@chakra-ui/react";
import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MainContent from "./components/MainContent";
import { useEffect, useState } from "react";
import {
  CategoriesResponse,
  Category,
  Pokemon,
  PokemonResponse,
} from "./types";
import useHttpData from "./hooks/useHttpData";

const url = "https://pokeapi.co/api/v2/type/";

const makePokemonUrl = (category: Category) =>
  `https://pokeapi.co/api/v2/type/${category.name}`;

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    name: "normal",
  });
  // Petición para obtener los tipos de Pokémon (categorías)
  const { data: categoriesResponse, loading: loadingCategories } =
    useHttpData<CategoriesResponse>(url);
  //Extarae los nombres de los tipos de los pokemón
  const categories = categoriesResponse?.results || [];

  //Peticion para obtener los Pokemons segun la categoria(tipo seleccionado)
  const {
    data: dataPokemons,
    loading: loadingPokemons,
    error,
  } = useHttpData<PokemonResponse>(makePokemonUrl(selectedCategory));
  useEffect(() => {
    if (!loadingPokemons && dataPokemons && "pokemon" in dataPokemons) {
      // Mapeo correcto de nombres de Pokémon
      const pokemonNames = dataPokemons.pokemon.map(
        (entry: { pokemon: Pokemon }) => entry.pokemon.name
      );
      console.log("Pokémon del tipo seleccionado:", pokemonNames);
    }
  }, [loadingPokemons, dataPokemons]);
  // Manejo de errores
  if (error) {
    return <p>Error al cargar datos: {error}</p>;
  }

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"`}
      gridTemplateRows={"60px 1fr"}
      gridTemplateColumns={{ sm: `0 1fr`, md: `250px 1fr` }}
      fontSize={14}
    >
      <GridItem pl="2" bg="orange.300" area={"header"}>
        <Header />
      </GridItem>
      <GridItem p="5" area={"nav"} height={"calc(100vh - 60px)"}>
        <SideNav
          categories={categories}
          loading={loadingCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </GridItem>
      <GridItem pl="2" bg="green.300" area={"main"}>
        <MainContent />
      </GridItem>
    </Grid>
  );
}

export default App;
