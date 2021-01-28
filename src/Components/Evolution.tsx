import React, {useState} from 'react'

export const Evolution :React.FC<{name:string}> = (props) => {
    let [imageSource, setImage] = useState<any>('')
  
     
     
        fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`).then(response => response.json())
        .then(data => {
            if(data.sprites.other.dream_world.front_default) {
                setImage(data.sprites.other.dream_world.front_default)
            } else if (data.sprites.other["official-artwork"].front_default) {
                 setImage(data.sprites.other["official-artwork"].front_default)
         } else {
             setImage(data.sprites.front_default)
         }
            
        })
        
   

    return (
        <div className="col-4 m-3">
            {props.name && <div className="card">
            <div className="card-header">{props.name}</div>
            <img src={imageSource}/>
            </div>}
            
            
        </div>
    )
}