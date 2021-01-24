import React, {useState,useEffect} from 'react';
import {Pokemon} from './Pokemon'
import axios from 'axios'
import {Pagination} from './Pagination'

type MyProps = {
  // using `interface` is also ok
  
};

type MyState = {
    pokemonAll: Data[];
    currentPage:number,
    pokemonPerPage :number;
   
  };

  type Data = {
    name:string;
    url:string
  }

export const PokemonContainer = () => {
    
  const [pokemonAll, setAllPokemon] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<any>(1)
  const [pokemonPerPage,setPokemonPerPage] = useState<any>(20)
  const [totalPok,setTotalPok] = useState<any>(0)

  useEffect (() => {
   const fetchPokemon = async () => {
     setLoading(true);
     const res = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1118')
     setAllPokemon(res.data.results)
     setTotalPok(res.data.count)
     setLoading(false)
   }

   fetchPokemon()
  }, [])
    /*
    componentDidMount() {
      fetch('https://pokeapi.co/api/v2/pokemon/?limit=60').then(response => response.json())
      .then(data => {
          console.log(data.results[0])
          let newData = data.results[0].name
       
      }
      )
      console.log("hello")
      this.setState({
        pokemanAll: "new"
    })
      console.log("hey")
    }*/
     /*
    componentDidMount () {
      fetch('https://pokeapi.co/api/v2/pokemon/?limit=100').then(response => response.json())
      .then(data => {
          console.log(data.results[0])
          let newData = data.results
          let pokemonArray = newData.map((poke :Data) => {return poke.name} )
      this.setState({
       // pokemonAll: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
       pokemonAll: newData
      })

    

    })
  }
    
    handleClick = () => {
        this.setState({
            pokemonAll: []
        })
    }*/

      const lastPokemon = currentPage * pokemonPerPage
      const firstPokemon = lastPokemon - pokemonPerPage
      const currentPokemons = pokemonAll.slice(firstPokemon,lastPokemon)

       const paginate = (pageNumber:any) => {
         setCurrentPage(pageNumber)
       }

    
      //let pokemonArray = pokemonAll
        return (
            <div className="container">
           <div className="row">
             <div className="row">
             <Pagination pokemonPerPage={pokemonPerPage} totalPokemons={totalPok} paginate={paginate}/>
             </div>
          <div className="row">
          {loading ? "Loading..." : currentPokemons.map((pokemon:any) => <Pokemon  key={pokemon.name} url={pokemon.url} name={pokemon.name} /> )}
          </div>
           <div className="col-xs-3">
           
            
            </div>
           </div>
          
           
            
           
            </div>
        )
    
}