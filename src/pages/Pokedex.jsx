import React, { useEffect, useRef, useState } from "react";
import Header from "./pokedex/header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonsCard from "./pokedex/PokemonsCard";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [cuerrenType, setcuerrenType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const input = useRef(null);

  const nameTrainerSlice = useSelector((store) => store.nameTrainerSlice);

  const hanldeSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const pokemonsByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );

  const pagination = () => {
    //Cantidad de pokemons por pagina
    const POKEMONS_PER_PAGE = 12;

    //pokemons que se mostraran en la pagina actual
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;

    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd);

    //ultima pagina
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1;

    //bloque actual
    const PAGES_PER_BLOCK = 3;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);

    //paginas que se muestran en el bloque actual
    const pagesInBlock = [];
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    }

    return { pokemonInPage, lastPage, pagesInBlock };
  };

  const { lastPage, pagesInBlock, pokemonInPage } = pagination();

  const handleClickPreviusPage = () => {
    const newCurrentPage = currentPage - 1;
    if (newCurrentPage >= 1) {
      setCurrentPage(newCurrentPage);
    }
  };

  const handleClickNextPage = () => {
    const newCurrentPage = currentPage + 1;
    if (newCurrentPage <= lastPage) {
      setCurrentPage(newCurrentPage);
    }
  };

  useEffect(() => {
    if (!cuerrenType) {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [cuerrenType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";

    axios
      .get(URL)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name);
        setTypes(newTypes);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (cuerrenType) {
      const URL = `https://pokeapi.co/api/v2/type/${cuerrenType}/`;

      axios
        .get(URL)
        .then((res) => {
          const pokemonsbytype = res.data.pokemon.map(
            (pokemon) => pokemon.pokemon
          );
          setPokemons(pokemonsbytype);
        })
        .catch((err) => console.log(err));
    }
  }, [cuerrenType]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemonName, cuerrenType]);

  useEffect(() => {
    setPokemonName("");
    input.current.value = "";
  }, [cuerrenType]);

  return (
    <section className="min-h-screen">
      <Header />
      <section className="py-6 px-2">
        <h3 className=" text-center text-2xl font-semibold">
          <b className="text-3xl font-bold text-red-600">
            Welcome {nameTrainerSlice},{" "}
          </b>{" "}
          here you can fine your favorite pokemon
        </h3>

        <form
          className=" flex flex-col items-center mb-10 sm:mx-auto sm:max-w-sm lg:max-w-md justify-center"
          onSubmit={hanldeSubmit}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-5 mb-5">
            <input
              ref={input}
              className="outline-none shadow-md shadow-gray-500/20 px-4 py-3 w-[120px] h-[60px] flex-grow rounded-[15px] "
              id="pokemonName"
              type="text"
              placeholder="Search your pokemon"
            />
            <button className="px-2 h-[60px] w-[60px] bg-red-600 font-semibold rounded-xl hover:animate-bounce">
              Search
            </button>
          </div>

          <select
            className=" flex mt-2 justify-end :animate-bounce mx-auto max-w-full"
            onChange={(e) => setcuerrenType(e.target.value)}
          >
            <option value="">All</option>
            {types.map((type) => (
              <option className="capitalize" value={type} key={type}>
                {type}
              </option>
            ))}
          </select>
        </form>
      </section>

      {/* paginacion */}

      <ul className="flex gap-2 justify-center mb-10 px-2 flex-wrap">
        {/* primera pagina */}
        <li
          onClick={() => setCurrentPage(1)}
          className="p-3 text-white bg-black rounded-lg hover:bg-red-600 hover:text-white  transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 cursor-pointer"
        >
          <i className="bx bx-first-page"></i>
        </li>

        {/* pagina anterior */}
        <li
          onClick={handleClickPreviusPage}
          className="p-3 text-white bg-black rounded-lg hover:bg-red-600 hover:text-white  transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 cursor-pointer"
        >
          <i className="bx bxs-left-arrow"></i>
        </li>

        {/* lista de paginas */}
        {pagesInBlock.map((numberPage) => (
          <li
            onClick={() => setCurrentPage(numberPage)}
            className={`p-3 text-white bg-black rounded-lg hover:bg-red-600 hover:text-white  transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 cursor-pointer ${
              numberPage === currentPage && "bg-gray-600"
            }`}
            key={numberPage}
          >
            {numberPage}{" "}
          </li>
        ))}

        {/* pagina siguiente */}
        <li
          onClick={handleClickNextPage}
          className="p-3 text-white bg-black rounded-lg hover:bg-red-600 hover:text-white  transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 cursor-pointer "
        >
          <i className="bx bxs-right-arrow"></i>{" "}
        </li>

        {/* ultima pagina */}
        <li
          onClick={() => setCurrentPage(lastPage)}
          className="p-3 text-white bg-black rounded-lg hover:bg-red-600 hover:text-white  transition transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none duration-300 cursor-pointer "
        >
          <i className="bx bx-last-page"></i>{" "}
        </li>
      </ul>

      {/* seccion lista de pokemons*/}
      <section className=" px-2 grid gap-6 grid-cols-[340px] place-content-center mb-10 sm:grid sm:grid-cols-2 sm:gap-6 sm:p-2 sm:w-[640px] sm:mx-auto lg:grid-cols-3 lg:w-[1024px] ">
        {pokemonInPage.map((pokemon) => (
          <PokemonsCard key={pokemon.url} pokemonUrl={pokemon.url} />
        ))}
      </section>
    </section>
  );
};

export default Pokedex;
