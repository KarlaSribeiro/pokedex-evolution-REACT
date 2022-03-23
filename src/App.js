import { useEffect, useState } from "react";
import PokemonThumnail from "./components/PokemonThumnail";  /*importando as caracteristicas dos pokemons que aparecem no card*/

function App() {

  const [allPokemons, setAllPokemons] = useState ([]) 
  const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=150') /*puxando a API de info-Pokemons*/

  const getAllPokemons = async () => { /*espera o resultado para trazer mais*/
    const res = await fetch(loadMore)
    const data = await res.json() 

    setLoadMore(data.next) /*objeto que vem dentro do data*/

    function createPokemonObject (result) { /*passando dentro do resultado e requisita o pokemon*/
      result.forEach( async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json()

        setAllPokemons(currentList => [...currentList, data]) /*pegando a variavel da listagem e adiciona o pokemon novo na lista*/

      });
    }
    createPokemonObject(data.results) /*ta execuutando a funçao pra criar o objeto do pokemon*/
    await console.log(allPokemons)
  }

  useEffect(() => { /*recarrega o estagio da likstagem para pokemon novo*/
    getAllPokemons()
  }, [])

  return (
    <div className="app-container"> 
      <h1>Listagem de Pokemons</h1>
        <div className="pokemon-container">
        <div className="all-container">
          { allPokemons.map((pokemon, index) => /*Todas as informações que estou solicitando para a API e tendo o retorno*/
            <PokemonThumnail 
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.sprites.other.dream_world.front_default}
            type={pokemon.types[0].type.name}
            key={index}
            /> 
          )}
        </div> 
        <button className="load-more" onClick={() => getAllPokemons()}>Load More</button>
      </div>
    </div>
  );
}

export default App;
