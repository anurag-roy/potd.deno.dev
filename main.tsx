/** @jsx h */
import { serve } from "https://deno.land/std@0.142.0/http/server.ts";
import { h, html } from "https://deno.land/x/htm@0.0.2/mod.tsx";
import seedrandom from "https://esm.sh/v86/seedrandom@3.0.5/es2022/seedrandom.min.js";

const NUMBER_OF_POKEMON = 898;

const todaysDate = new Date().toDateString();
const rng = new seedrandom(todaysDate);
const pokemonNumber = Math.round(rng() * NUMBER_OF_POKEMON);

const res = await fetch(`https://pokeapi.deno.dev/pokemon/${pokemonNumber}`);
const pokemon = await res.json();

const handler = (req: Request) => html({
  title: `POTD - Pokémon of the Day`,
  body: (
    <div
      class="flex flex-col items-center justify-center w-full h-screen"
      style={{backgroundColor: pokemon.color}}
    >
      <img src={pokemon.imageUrl} />
      <h1 class="text-4xl font-bold">{pokemon.name}</h1>
      <footer class="fixed bottom-8 w-full h-6 flex items-center justify-center gap-2 text-gray-800">
        Powered by
        <a
          class="flex items-center gap-2 text-sm text-black no-underline font-semibold"
          href="https://pokeapi.deno.dev/"
        >
          <img alt="Poké API" src="https://pokeapi.deno.dev/assets/logo/logo.webp" class="w-5" /> Poké API
        </a>
      </footer>
    </div>
  ),
});

serve(handler);    
