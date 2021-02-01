import React, {useEffect, useState} from 'react'
import {PokemonCard} from '../PokemonCard'



export const Evolution = (props:any) => {

    const [evolution, setEvolution] = useState<{name:string,url:string}[]>([])
    
    useEffect (() => {
        const fetchEvolution = async () => {
        let evolutionArray : {name:string,url:string} [] = []
        
        if(props.data.species) {
        
        const dataSpecies =  await fetch(props.data.species.url)
        const dataEvolutionJSON =  await dataSpecies.json();
       
        const dataEvolution = await fetch(dataEvolutionJSON.evolution_chain.url)
        const dataEvoChain = await dataEvolution.json()
        let evo1; let evo2; let evo3; 
            
          let evo1_name = dataEvoChain.chain.species.name;
          const evo1DataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo1_name}`)
          const evo1Data = await evo1DataFetch.json()
                
          let evo1_url = `https://pokeapi.co/api/v2/pokemon/${evo1Data.id}`
          evo1 ={name:evo1_name, url: evo1_url}
          evolutionArray.push(evo1)
         
                
            if (dataEvoChain.chain.evolves_to.length > 0) {
              if(dataEvoChain.chain.evolves_to[0].species.name.length > 0) {
                let evo2_url;
                let evo2_name = dataEvoChain.chain.evolves_to[0].species.name;
                const evo2DataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo2_name}`)
                const evo2Data = await evo2DataFetch.json()
                evo2_url = `https://pokeapi.co/api/v2/pokemon/${evo2Data.id}`
                evo2 ={name:evo2_name, url: evo2_url}
                evolutionArray.push(evo2)
               

                if(dataEvoChain.chain.evolves_to[0].evolves_to.length > 0) {
              
                  let evo3_name = dataEvoChain.chain.evolves_to[0].evolves_to[0].species.name
                  let evo3_url;
                  const evo3DataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo3_name}`)
                  const evo3Data = await evo3DataFetch.json()
                  evo3_url = `https://pokeapi.co/api/v2/pokemon/${evo3Data.id}`
                  evo3 ={name:evo3_name, url: evo3_url}
                  evolutionArray.push(evo3)
                  
                } else {
                evo3 = null
                }
    
              } else {
                evo2 = null
              }   
              
            }
            setEvolution(evolutionArray)
          }
        }
          fetchEvolution() },
    [])
   
         

    return (
        <>
        { evolution.map( (evo:{name:string, url:string}) => <PokemonCard key={evo.name} name={evo.name} url={`${evo.url}/`}/>) }
         </>
    )
}