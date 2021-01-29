import React, {useState,useEffect} from 'react';
import {PokemonCard} from './PokemonCard'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { MDBRow, MDBIcon } from "mdbreact";

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

export const PokemonContainer = (props:any) => {
    
  const [pokemonAll, setAllPokemon] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState<any>(1)
  const [pokemonPerPage,setPokemonPerPage] = useState<any>(20)
  const [totalPok,setTotalPok] = useState<any>(0)
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("")

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

    const handleSearchChange = (e:any) => {
      setFilter(e.target.value)
    }

      const lastPokemon = currentPage * pokemonPerPage
     const firstPokemon = lastPokemon - pokemonPerPage
      const currentPokemons = pokemonAll.slice(firstPokemon,lastPokemon)

       const paginate = (pageNumber:any) => {
         setCurrentPage(pageNumber)
       }

    
      //let pokemonArray = pokemonAll
        return (
            <div className="container">
        
        <div className="row justify-content-center">
        <MDBRow md="6" className="m-5">
      <div className="input-group md-form form-sm form-1 pl-0">
        <div className="input-group-prepend">
          <span className="input-group-text page-item-color" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input className="form-control my-0 py-1" type="text" placeholder="Type pokemon..." aria-label="Search" onChange={handleSearchChange} />
      </div>
    </MDBRow>

        </div>

   

           <div className="row justify-content-center">
             <div className="row ">
               {!filter && 
               <ReactPaginate pageCount={Math.ceil(totalPok/pokemonPerPage)} pageRangeDisplayed={2} marginPagesDisplayed={1} onPageChange={(data) => paginate(data.selected + 1)} containerClassName="pagination"
                pageClassName="page-item" pageLinkClassName="page-link" previousClassName="page-link" nextClassName="page-link" activeClassName="active page-item-color" /> }
            {/* <Pagination pokemonPerPage={pokemonPerPage} totalPokemons={totalPok} paginate={paginate}/>*/}
             </div>
          <div className="row justify-content-center">
          
          
           <div className="col">
            
            {/* {loading ? "Loading..." : currentPokemons.map((pokemon:any) =>  < PokemonCard  key={pokemon.name} url={pokemon.url} name={pokemon.name} /> )} */}
            
            {filter ? (
       
          pokemonAll.map(
            (pokemon: any) =>
              pokemon.name.includes(filter) &&
              < PokemonCard  key={pokemon.name} url={pokemon.url} name={pokemon.name} />
          )
        
      ) : (
        currentPokemons.map((pokemon:any) =>  <PokemonCard  key={pokemon.name} url={pokemon.url} name={pokemon.name} /> )
      )}
         
            
            </div>
           </div>
          
           
            </div>
           
            </div>
        )
    
}