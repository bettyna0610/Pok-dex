import { Stats } from 'fs'
import React from 'react'
import {Evolution} from './Evolution'
import {DropdownList} from './Dropdown'
import { PokemonCard } from './PokemonCard'

type MyProps = {
    match:any,
    location:any
}

type MyState = {
  abilities: string[]
 evolution : {name:string,url:string} [],
 image:string,
 name:string,
 type: string [],
 orderNumber:number,
 stats: {
   hp:number,
   attack:number,
   defense:number,
   specialAttack:number,
   specialDefense:number,
   speed:number
 },
 moves: string []
}





export class Pokemon extends React.Component<MyProps, MyState> {
   
    state = {
        image:'',
        name:'',
        abilities: [],
        type:[],
        orderNumber:0,
        stats: {
            hp:0,
            attack:0,
            defense:0,
            specialAttack:0,
            specialDefense:0,
            speed:0
        },
        evolution : [{name:'pokemon', url:''}]
        
            
        ,
        moves: []

    }

    componentDidMount() {
        let pokemonIndex  = this.props.match.url.split('/')[this.props.match.url.split('/').length-1]
        console.log(pokemonIndex)
        let image :string;
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`).then(response => response.json())
        .then(data => { 

          if(data.sprites.other.dream_world.front_default) {
            image = data.sprites.other.dream_world.front_default
        } else if (data.sprites.other["official-artwork"].front_default) {
             image= data.sprites.other["official-artwork"].front_default
     } else {
         image = data.sprites.front_default
     }
    
            
                let abilities :string[] = data.abilities.map((ability:any) => ability.ability.name)
                let name = data.name
                let type = data.types.map((pokType:any) => pokType.type.name)
                let orderNumber = data.order
                let hp = 0; let attack =0; let defense=0; let specialAttack=0; let specialDefense=0; let speed=0;
                let moves = data.moves.map((move:any) => move.move.name)
                let evolutionArray : {name:string,url:string} [] = []

                data.stats.map(
                   (stat:any)  => {
                       switch(stat.stat.name) {
                           case 'hp':
                               hp = stat['base_stat']
                               break;
                         case 'attack':
                             attack = stat['base_stat']
                             break;
                             case 'defense':
                                 defense = stat['base_stat']
                                 break;
                                 case 'special-attack':
                                     specialAttack = stat['base_stat']
                                     break;
                                     case 'special-defense':
                                         specialDefense = stat['base_stat']
                                         break;
                                         case 'speed':
                                             speed = stat['base_stat']
                                     break;
                       } 


                    
                })
                
                fetch(data.species.url).then(response => response.json())
               .then(dataEvolution => { fetch(dataEvolution.evolution_chain.url).then(response => response.json()).then(dataEvoChain => {
                   let evo1  ; let evo2; let evo3; 
                   
                    let evo1_name = dataEvoChain.chain.species.name;
                    let evo1_url;
                    fetch(`https://pokeapi.co/api/v2/pokemon/${evo1_name}`).then(response => response.json()).
         then( data => {
           
           evo1_url = `https://pokeapi.co/api/v2/pokemon/${data.id}`
           evo1 ={name:evo1_name, url: evo1_url}
           console.log(evo1)
          evolutionArray.push(evo1)
           this.setState({
             evolution:evolutionArray
           })
           
         })

                   
                         
                    if(dataEvoChain.chain.evolves_to.length > 0)
                    {
                      if(dataEvoChain.chain.evolves_to[0].species.name.length > 0) {
                    let evo2_url;
                    let evo2_name = dataEvoChain.chain.evolves_to[0].species.name;

                    fetch(`https://pokeapi.co/api/v2/pokemon/${evo2_name}`).then(response => response.json()).
                    then( data => {
                      
                      evo2_url = `https://pokeapi.co/api/v2/pokemon/${data.id}`
                      evo2 ={name:evo2_name, url: evo2_url}
                      console.log(evo2)
                      
                      evolutionArray.push(evo2)
                      this.setState({
                        evolution:evolutionArray
                      })
                    })

                      //most tettem ide
                    if(dataEvoChain.chain.evolves_to[0].evolves_to.length > 0) {
                      
                     let evo3_name = dataEvoChain.chain.evolves_to[0].evolves_to[0].species.name
                     let evo3_url;
                     fetch(`https://pokeapi.co/api/v2/pokemon/${evo3_name}`).then(response => response.json()).
                     then( data => {
                       
                       evo3_url = `https://pokeapi.co/api/v2/pokemon/${data.id}`
                       evo3 ={name:evo3_name, url: evo3_url}
                       
                       evolutionArray.push(evo3)
                       this.setState({
                        evolution:evolutionArray
                      })
                      
                     })

                    } else {
                        evo3 = null
                    }

                   } else {
                       evo2 = null
                     }
                     
                   }
                  
                  
                  

               })
               this.setState({
                image,
                abilities,
                name,
                type,
                orderNumber,
                stats: {
                    hp,
                    attack,
                    defense,
                    specialAttack,
                    specialDefense,
                    speed
                },
                moves,
                
                
                  
              })})

            
              console.log(this.state.evolution)

               
            })
           
               

            
        
    }


render() {
    
  
    
    let {image,name,abilities,type,orderNumber,stats,moves,evolution} = this.state
    
    let statMaxArray = [stats.hp,stats.attack,stats.defense,stats.specialAttack,stats.specialDefense,stats.speed]
   let statMax =  Math.max(...statMaxArray)
   let hpPercent = (stats.hp / statMax ) *100
     let attackPercent = (stats.attack / statMax ) *100
     let defensePercent = (stats.defense / statMax) *100
     let specialAttackPercent = (stats.specialAttack / statMax )*100
     let specialDefensePercent = (stats.specialDefense / statMax) *100
     let speedPercent = (stats.speed / statMax)*100

   console.log(evolution)
    return (
        <div className="col justify-content-center">
            <div >
            <div >{orderNumber}.<h2>{name.toLowerCase().split(" ").map(character => character.charAt(0).toUpperCase() + character.substring(1))}</h2></div>
              <hr></hr>
               <div className="row mt-1">
               <div className="col-4 align-items-center">
               <img width="250px" height="250px" className="img-fluid" src={image}/>
    </div>
    <div className="col-4"><div className="row justify-content-center"> <h5>Types:</h5></div> 
<div className="row justify-content-center">
{type.map((ability:string) => <div className="badge-pill badge-danger m-2">{ability}</div>)}</div></div>
<div className="col-4 align-items-left">

 <div className="row justify-content-center"><h5>Abilities: </h5> </div>  
 <div className="col">
 <div >
 {abilities.map((ability:string) => <div className="badge-pill badge-danger m-2">{ability}</div>)}
 </div>
 </div>
 


<div className="row mt-3 justify-content-center">
<DropdownList moves={moves} />
</div>
</div>
</div>
 <div >
<div className="row justify-content-center">
<div className="col-3"></div>
<div className="col-6">
<div> <h5> Stats:</h5></div>
<p className="text-center">HP:</p>
  <div className="progress m-1">
     
  <div className="progress-bar bg-danger" role="progressbar" style={{width: `${hpPercent}%`}}aria-valuenow={stats.hp} aria-valuemin={0} aria-valuemax={100}>{stats.hp}</div>
</div>
<p className="text-center">ATTACK:</p>
<div className="progress m-1">
    
  <div className="progress-bar bg-danger" role="progressbar" style={{width: `${attackPercent}%`}} aria-valuenow={stats.attack} aria-valuemin={0} aria-valuemax={100}>{stats.attack}</div>
</div>
<p className="text-center">DEFENSE:</p>
<div className="progress m-1">
   
  <div className="progress-bar bg-danger" role="progressbar" style={{width: `${defensePercent}%`}} aria-valuenow={stats.defense} aria-valuemin={0} aria-valuemax={100}>{stats.defense}</div>
</div>
<p className="text-center">SPECIAL ATTACK:</p>
<div className="progress m-1">
  <div className="progress-bar bg-danger" role="progressbar" style={{width:`${specialAttackPercent}%`}} aria-valuenow={stats.specialAttack} aria-valuemin={0} aria-valuemax={100}>{stats.specialAttack}</div>
</div>
<p className="text-center">SPECIAL DEFENSE:</p>
<div className="progress m-1">
  <div className="progress-bar bg-danger" role="progressbar" style={{width: `${specialDefensePercent}%`}} aria-valuenow={stats.specialDefense} aria-valuemin={0} aria-valuemax={100}>{stats.specialDefense}</div>
</div>
<p className="text-center">SPEED:</p>
<div className="progress m-1">
  <div className="progress-bar bg-danger" role="progressbar" style={{width: `${speedPercent}%`}} aria-valuenow={stats.speed} aria-valuemin={0} aria-valuemax={100}>{stats.speed}</div>
</div>
 
</div>
<div className="col-3"></div>


</div>

 
   {/*<div>{evolution.evo1}</div><div>{evolution.evo2 && evolution.evo2}</div><div>{evolution.evo3 && evolution.evo3}</div>*/}
  
   <div className="row justify-content-center m-3"> <h5> Evolution:</h5> </div>
   <div className="row justify-content-center m-3">
   { evolution.map ( (evo:{name:string, url:string}) => <PokemonCard name={evo.name} url={`${evo.url}/`}/>  ) } 
   </div>
    
   </div>
  
   </div>
   </div>
 
 

  
  
               
        
       
    )
   
}
}
