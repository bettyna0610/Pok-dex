import React, { useState } from 'react'
import {Link} from 'react-router-dom'

export const PokemonCard: React.FC<{name:string,url:string}> = (props) => {

    const [type, setType] = useState([])
     let indexURL  = props.url.split('/')[props.url.split('/').length-2]
     //let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${indexURL}`
     let imageSource;
     if(parseInt(indexURL) >= 650) {
      imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${indexURL}.png`
     } else {
         imageSource =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${indexURL}.svg`
     }
     
     
     // "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/661.png"
      /*
     fetch(props.url).then(response => response.json())
        .then(data => {
            let types = data.types.map((pokType:any) => pokType.type.name)
            console.log(data.types[0].type.name)
            //pokemonType = data.types[0].type.name
            setType(types)
            })*/
     
     
    return  (
        <div className="card" style={{display:'inline-block', margin:10}}>
            
            <div className="card-header">{indexURL} {props.name.toLowerCase().split(" ").map(character => character.charAt(0).toUpperCase() + character.substring(1))}
           {/* {type}*/}
           </div>
           
           <img width="150px" height="150px" src={imageSource} />
           <Link target="_blank" to={`pokemon/${indexURL}`}>Details</Link>
        
        </div>
        
    ) 
}