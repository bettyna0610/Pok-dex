import React from 'react'

export const Pokemon: React.FC<{name:string,url:string}> = (props) => {
     let indexURL = props.url.split('/')[props.url.split('/').length-2]
     let imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${indexURL}.svg`
     
    return  (
        <div className="card" style={{display:'inline-block', margin:10}}>
            <div className="card-header">{props.name}</div>
           <img width="150px" height="150px" src={imageSource} />
        
        </div>
        
    ) 
}