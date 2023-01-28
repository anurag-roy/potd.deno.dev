/** @jsx h */
import { serve } from 'https://deno.land/std@0.155.0/http/server.ts';
import { h, html } from 'https://deno.land/x/htm@0.0.10/mod.tsx';
import { UnoCSS } from 'https://deno.land/x/htm@0.0.10/plugins.ts';

// enable UnoCSS
html.use(UnoCSS());

const handler = async (req: Request) => {
  const url = new URL(req.url);
  const pool = url.searchParams.get('pool');
  const res = await fetch(`https://pokeapi.deno.dev/pokemon/potd?pool=${pool}`);
  const pokemon = await res.json();

  return html({
    meta: {
      description: 'Pokémon of the Day',
      'theme-color': pokemon.color,
    },
    links: [
      {
        href: 'https://pokeapi.deno.dev/assets/logo/logo.webp',
        rel: 'icon',
      },
    ],
    title: `Pokémon of the Day - ${pokemon.name}`,
    styles: ['html { height: 100%; }'],
    body: (
      <body
        class="w-full h-full flex flex-col items-center"
        style={{ backgroundColor: pokemon.color }}
      >
        <main class="grow flex flex-col justify-center mt-10">
          <img src={pokemon.imageUrl} alt={pokemon.name} class="w-100 h-100" />
          <h1 class="text-4xl font-bold text-center py-4">{pokemon.name}</h1>
        </main>
        <footer class="p-2 flex items-center justify-center gap-2 text-gray-800">
          Powered by
          <a
            class="flex items-center gap-2 text-sm text-black font-semibold"
            href="https://pokeapi.deno.dev/"
          >
            <img
              alt="Poké API"
              src="https://pokeapi.deno.dev/assets/logo/logo.webp"
              class="w-5"
            />{' '}
            Poké API
          </a>
        </footer>
      </body>
    ),
  });
};

await serve(handler);
