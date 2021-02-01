
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export const PokemonCard: React.FC<{name:string,url:string}> = (props) => {

    const [imageSource,setImage] = useState('')
    let indexURL  = props.url.split('/')[props.url.split('/').length-2]

    useEffect (() => {

        const fetchPokemon = async () => {
          const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${indexURL}`)
          if(indexURL) {
            if (res.data.sprites.other.dream_world.front_default) {
                setImage(res.data.sprites.other.dream_world.front_default)
                } 
                else if (res.data.sprites.other["official-artwork"].front_default) {
                 setImage(res.data.sprites.other["official-artwork"].front_default)
                }
                else {
                 setImage(res.data.sprites.front_default)
                }
            }
          } 
        fetchPokemon()
    },[])
     
     
    return   (
              <Link target="_blank" to={ `/pokemon/${indexURL}`} >
                <div className="card border-primary" style={{display:'inline-block', margin:10}}>
                  <div className="card-header card-title"> 
                  {props.name.toLowerCase().split(" ").map(character => character.charAt(0).toUpperCase() + character.substring(1))}
                  </div>
                  <img  width="150px" height="150px" src={imageSource} /> 
                  <div className="card-footer">
                    <Link  target="_blank" to={ `/pokemon/${indexURL}`} className="btn btn-danger">Details</Link>
                 </div>
               </div>
              </Link>
    ) 
}