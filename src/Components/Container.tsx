import React from 'react';
import {Pokemon} from './Pokemon'

type MyProps = {
  // using `interface` is also ok
  
};

type MyState = {
    pokemonAll: Data[];
   
  };

  type Data = {
    name:string;
    url:string
  }

export class PokemonContainer extends React.Component<MyProps,MyState> {
    state: MyState = {
        // optional second annotation for better type inference
        pokemonAll: [],
        
      };
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
    }

    render() {
      let pokemonArray = this.state.pokemonAll
        return (
            <div className="container">
           <div className="row">
           <div className="col-xs-3">
            {pokemonArray.map(pokemon => <Pokemon  key={pokemon.name} url={pokemon.url} name={pokemon.name} /> )}
            </div>
           </div>
          
           
            
           
            </div>
        )
    }
}