import React, { useEffect, useState } from "react";
import Header from "./pokedex/header";
import { useParams } from "react-router-dom";
import axios from "axios";

const bordersByType = {
  grass: "border-green-300",
  fire: "border-orange-500",
  poison: "border-green-800",
  bug: "border-amber-800",
  flying: "border-cyan-300",
  water: "border-blue-300",
  normal: "border-yellow-400",
  fighter: "border-red-400",
  fighting: "border-violet-600",
  ground: "border-emerald-400",
  rock: "border-gray-600",
  ghost: "border-pink-900",
  steel: "border-lime-300",
  electric: "border-blue-800",
  psychic: "border-fuchsia-300",
  ice: "border-sky-200",
  dragon: "border-red-700",
  dark: "border-black",
  fairy: "border-pink-200",
  unknow: "border-black",
};
const backgraundByType = {
  grass: "from-green-300 to-white",
  fire: "from-orange-500 to-white",
  poison: "from-green-800 to-white",
  bug: "from-amber-800 to-white",
  flying: "from-cyan-300 to-white",
  water: "from-blue-300 to-white",
  normal: "from-yellow-400 to-white",
  fighter: "from-red-800 to-white",
  fighting: "from-violet-600 to-white",
  ground: "from-emerald-400 to-white",
  rock: "from-gray-600 to-white",
  ghost: "from-pink-900 to-white",
  steel: "from-lime-300 to-white",
  electric: "from-blue-800 to-white",
  psychic: "from-fuchsia-300 to-white",
  ice: "from-sky-200 to-white",
  dragon: "from-red-700 to-white",
  dark: "from-black to-white",
  fairy: "from-pink-200 to-white",
  unknow: "from-black to-white",
};
const shadowByType = {
  grass: "shadow-lg shadow-green-500/50",
  fire: "shadow-lg shadow-orange-500/70",
  poison: "shadow-lg shadow-green-700/80",
  bug: "shadow-lg shadow-amber-800",
  flying: "shadow-lg shadow-cyan-500/70",
  water: "shadow-lg shadow-blue-500/70",
  normal: "shadow-lg shadow-yellow-500/70",
  fighter: "shadow-lg shadow-red-500/70",
  fighting: "shadow-lg shadow-violet-600",
  ground: "shadow-lg shadow-emerald-400",
  rock: "shadow-lg shadow-gray-600",
  ghost: "shadow-lg shadow-pink-600",
  steel: "shadow-lg shadow-lime-500",
  electric: "shadow-lg shadow-blue-700",
  psychic: "shadow-lg shadow-fuchsia-500",
  ice: "shadow-lg shadow-sky-300",
  dragon: "shadow-lg shadow-red-700",
  dark: "shadow-lg shadow-black/50",
  fairy: "shadow-lg shadow-pink-200",
  unknow: "shadow-lg shadow-black",
};

const textByType = {
  grass: "text-green-300",
  fire: "text-orange-500",
  poison: "text-green-800",
  bug: "text-amber-800",
  flying: "text-cyan-300",
  water: "text-blue-300",
  normal: "text-yellow-400",
  fighter: "text-red-400",
  fighting: "text-violet-600",
  ground: "text-emerald-400",
  rock: "text-gray-400",
  ghost: "text-pink-700",
  steel: "text-lime-300",
  electric: "text-blue-700",
  psychic: "text-fuchsia-300",
  ice: "text-sky-300",
  dragon: "text-red-600",
  dark: "text-black",
  fairy: "text-pink-200",
  unknow: "text-black",
};

const PokemonId = () => {
  const [pokemon, setPokemon] = useState();

  const { id } = useParams();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getPercentStatBar = (stat_base) => {
    const percentBarProgres = Math.floor((stat_base * 100) / 255);
    return `${percentBarProgres}%`;
  };

  return (
    <section>
      <Header />

      <section className="px-2 py-16">
        <article
          className={`max-w-[768px] mx-auto shadow-xl p-2 border-b-2 ${
            bordersByType[pokemon?.types[0].type.name]
          } shadow-lg ${
            shadowByType[pokemon?.types[0].type.name]
          } rounded-2xl border-r-2 `}
        >
          {/* seccion superior*/}

          <section
            className={`rounded-2 bg-gradient-to-b  ${
              backgraundByType[pokemon?.types[0].type.name]
            }  relative h-[150px]`}
          >
            <div className=" w-[200px] mx-auto absolute left-1/2 -translate-x-1/2 -top-14">
              <img
                src={pokemon?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </div>
          </section>

          {/* Informacion General*/}
          <section>
            <div>
              <h3 className="text-center font-bold py-1 px-2 text-4xl ">
                #{pokemon?.id}
              </h3>
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
              <hr />
              <h2
                className={`capitalize text-4xl ${
                  textByType[pokemon?.types[0].type.name]
                }}  font-semibold  `}
              >
                {pokemon?.name}
                {""}
              </h2>
              <hr />
            </div>

            <div className="grid grid-cols-2 gap-6 ">
              <div className="grid grid-rows-2 p-2 justify-items-center">
                <h5 className="font-semibold">Weigth</h5>
                <span
                  className={`font-bold ${
                    textByType[pokemon?.types[0].type.name]
                  }  `}
                >
                  {pokemon?.weight}
                </span>
              </div>
              <div className="grid grid-rows-2 p-2 justify-items-center">
                <h5 className="font-semibold">heigth</h5>
                <span
                  className={`font-bold ${
                    textByType[pokemon?.types[0].type.name]
                  }`}
                >
                  {pokemon?.height}
                </span>
              </div>
            </div>

            <section className=" grid md:grid-cols-2 gap-4 ">
              {/* Tipos */}
              <section className="text-center">
                <h3
                  className={` rounded-xl text-2xl font-semibold bg-gradient-to-b ${
                    backgraundByType[pokemon?.types[0].type.name]
                  }`}
                >
                  Types
                </h3>

                <section className="grid grid-cols-2 gap-4 mt-4">
                  {pokemon?.types.map((type) => (
                    <article
                      className={`text-black border-[1px] border-gray-300 rounded-r-lg transition transform hover: -translate-y-2 font-semibold p-2 px-8 text-center capitalize truncate ${
                        bordersByType[pokemon?.types[0].type.name]
                      }`}
                      key={type.type.name}
                    >
                      {type.type.name}
                    </article>
                  ))}
                </section>
              </section>
              {/* Habilidades */}
              <section className="text-center font-semibold ">
                <h3 className=" text-2xl ">Abilities</h3>

                <section className=" grid grid-cols-2 gap-4 mt-4">
                  {pokemon?.abilities.map((ability) => (
                    <article
                      className={`border-[1px] border-gray-300 rounded-r-lg transition transform hover: -translate-y-2 font-semibold p-2 px-8 text-center capitalize truncate ${
                        bordersByType[pokemon?.types[0].type.name]
                      } `}
                      key={ability.ability.name}
                    >
                      {ability.ability.name}
                    </article>
                  ))}
                </section>
              </section>
            </section>
          </section>

          <hr className="my-6 " />

          {/* Seccion de ststs */}
          <section>
            <h3 className="font-semibold text-4xl m-2"> Stats </h3>

            <section>
              {pokemon?.stats.map((stat) => (
                <article key={stat.stat.name}>
                  <section className="flex justify-between p-1">
                    <h5 className="capitalize font-semibold">
                      {stat.stat.name}
                    </h5>

                    <span className="">{stat.base_stat}/255</span>
                  </section>

                  <div className="bg-gray-100 h-7 rounded-lg">
                    <div
                      style={{ width: getPercentStatBar(stat.base_stat) }}
                      className={` h-full bg-gradient-to-r from-yellow-300 from-20% to-orange-400 `}
                    ></div>
                  </div>
                </article>
              ))}
            </section>
          </section>
        </article>
        <section>
          <div className=" pokebola  justify-center items-center animate-bounce w-[200px] mx-w-[1200]">
            <img src="/images/poke.png" alt="" />
          </div>
        </section>
      </section>
    </section>
  );
};

export default PokemonId;
