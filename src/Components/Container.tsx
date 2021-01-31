import React, {useState,useEffect} from 'react';
import {PokemonCard} from './PokemonCard'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { MDBRow, MDBIcon } from "mdbreact";



export const PokemonContainer = () => {
    
  const [pokemonAll, setAllPokemon] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPok,setTotalPok] = useState(0)
  const [filter, setFilter] = useState("")

  const pokemonPerPage = 20

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
   
  const handleSearchChange = (e :React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value)
  }

  const lastPokemon = currentPage * pokemonPerPage
  const firstPokemon = lastPokemon - pokemonPerPage
  const currentPokemons = pokemonAll.slice(firstPokemon,lastPokemon)

  const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber)
  }

  
    return (
            <div className="container mx-auto">      
              <div className="row justify-content-center">
                <MDBRow md="6" className="m-3">
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
                <div className="row"> 
                <ReactPaginate pageCount={Math.ceil(totalPok/pokemonPerPage)} pageRangeDisplayed={2} marginPagesDisplayed={1} onPageChange={(data) => paginate(data.selected + 1)} containerClassName="pagination"
                  pageClassName="page-item" pageLinkClassName="page-link" previousClassName="page-link" nextClassName="page-link" activeClassName="active" /> 
                </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col">
                            {filter ? (
                            pokemonAll.map(
                                           (pokemon: {name:string,url:string}) =>
                                            pokemon.name.includes(filter) &&
                                          < PokemonCard  key={pokemon.name} url={pokemon.url} name={pokemon.name} />
                                          ))
                                          : (
                                            loading ? "Loading..." : currentPokemons.map((pokemon:{name:string,url:string}) =>  <PokemonCard  key={pokemon.name} url={pokemon.url} name={pokemon.name} /> )
                              )}
                  
                </div>
              </div> 
            </div>
        )    
}