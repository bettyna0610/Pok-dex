import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'



export const DropdownList : React.FC <{moves:string[]}> = (props) => {
   return (
   <DropdownButton
      alignRight
      title="Moves"
      variant="danger"
        >
            {props.moves.map((move:string) =>  <Dropdown.ItemText key={move} >{move}</Dropdown.ItemText> )}
                     
    </DropdownButton>
   )
};
