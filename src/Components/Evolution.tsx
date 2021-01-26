import React, {useState} from 'react'

export const Evolution :React.FC<{name:string}> = (props) => {
    const [imageSource, setImage] = useState<any>('')
     
    
        fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`).then(response => response.json())
        .then(data => {
            setImage(data.sprites.front_default)
            
        })
        
    

    return (
        <div>
            <div>{props.name}</div>
            <img src={imageSource}/>
        </div>
    )
}