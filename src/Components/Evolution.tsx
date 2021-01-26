import React from 'react'

export const Evolution :React.FC<{name:string,source:string}> = (props) => {

     

    return (
        <div>
            <div>{props.name}</div>
            <img src={props.source}/>
        </div>
    )
}