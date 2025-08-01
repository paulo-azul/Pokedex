import './App.css';
import Pokecard from './Pokecard';
import icon_pesquisa from './Icon.svg'
import img_poke from './Vector.svg';
import React, { useEffect, useState } from 'react';


function App() {
  const [find, setFind] = React.useState("")
  const [pokemons, setPokemons] = useState(null);
  const [api, setApi] = useState("https://pokeapi.co/api/v2/pokemon/?&limit=151")

  const find_minusculo = find.toLocaleLowerCase()

      useEffect(() => {
          async function buscarpoke() {
              const find_pokemon = await fetch(api);
              const dados = await find_pokemon.json();      
              setPokemons(dados);
          }
          buscarpoke();
      }, [])

  function renderizaCard() {
    if (!pokemons) {
      return (<p>carregando..</p>)
    }
    else {
      return (pokemons.results.map(pokemon => <Pokecard url={pokemon.url} termoFind={find_minusculo} />))
    }
  }

  return (
    <div className="App">
      <header className='header'>
        <img src={img_poke} className='img_poke' alt="imagem da pokebola" title='Vamos pegar!' />
        <nav className='nav_pesquisa'>
          <input type="search" placeholder='Pesquisar Pokémon' className='barra_pesquisa' value={find} onChange={(e) => setFind(e.target.value)} />
        </nav>
      </header>

      <div className='div_dex'>
        {
          renderizaCard()
        }
      </div>

    </div>
  );
}

export default App;
