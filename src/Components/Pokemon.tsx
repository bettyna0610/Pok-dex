import React, { useState } from 'react'

export const Pokemon: React.FC<{name:string,url:string}> = (props) => {

    const [type, setType] = useState("")
     let indexURL = props.url.split('/')[props.url.split('/').length-2]
     //let pokemonURL = `https://pokeapi.co/api/v2/pokemon/${indexURL}`
     let imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${indexURL}.svg`
     
     

     fetch(props.url).then(response => response.json())
        .then(data => {
            console.log(data.types[0].type.name)
            //pokemonType = data.types[0].type.name
            setType(data.types[0].type.name)
            })
     
     
    return  (
        <div className="card" style={{display:'inline-block', margin:10}}>
            
            <div className="card-header">{indexURL} {props.name.toLowerCase().split(" ").map(character => character.charAt(0).toUpperCase() + character.substring(1))}
            {type}
           </div>
           
           <img width="150px" height="150px" src={imageSource} />
           
        
        </div>
        
    ) 
}