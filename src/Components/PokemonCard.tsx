import { ADDRGETNETWORKPARAMS } from 'dns'
import React, { useState } from 'react'
import {Link} from 'react-router-dom'

export const PokemonCard: React.FC<{name:string,url:string}> = (props) => {

    const [imageSource,setImage] = useState('')

     let indexURL  = props.url.split('/')[props.url.split('/').length-2]
        
    console.log(indexURL)
     
        fetch(`https://pokeapi.co/api/v2/pokemon/${indexURL}`).then(response => response.json())
        .then(data => {

            
                if(data.sprites.other.dream_world.front_default) {
                    setImage(data.sprites.other.dream_world.front_default)
                } else if (data.sprites.other["official-artwork"].front_default) {
                     setImage(data.sprites.other["official-artwork"].front_default)
             } else {
                 setImage(data.sprites.front_default)
             }
            
          
       })
    
     
     //let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${indexURL}`
     /*
     if(parseInt(indexURL) >= 650) {
      imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indexURL}.png`
     } else {
         imageSource =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${indexURL}.svg`
     }

     if(!imageSource) {
         imageSource = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10080.png'
     }
     */
     
     // "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/661.png"
      /*
     fetch(props.url).then(response => response.json())
        .then(data => {
            let types = data.types.map((type:any) => type.type.name)
            console.log(data.types[0].type.name)
            //pokemonType = data.types[0].type.name
            setType(types)
            })*/
     
     
    return   (
        <div className="card border-primary" style={{display:'inline-block', margin:10}}>
            
            <div className="card-header card-title"> {props.name.toLowerCase().split(" ").map(character => character.charAt(0).toUpperCase() + character.substring(1))}
           
           </div>
           
           <img  width="150px" height="150px" src={imageSource} />
           <div className="card-footer">
           <Link  target="_blank" to={`pokemon/${indexURL}`} className="btn btn-danger">Details</Link>
           </div>
           
        
        </div>
        
    ) 
}