import { Stats } from 'fs'
import React from 'react'
import {Evolution} from './Evolution'
import {DropdownList} from './Dropdown'
import { PokemonCard } from './PokemonCard';
import {Link} from 'react-router-dom'

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
 moves: string [],
 loading: boolean
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
        moves: [],
        loading:false

    }

    async componentDidMount() {
        let pokemonIndex  = this.props.match.url.split('/')[this.props.match.url.split('/').length-1]
        console.log(pokemonIndex)
        let image :string;
        this.state.loading = true
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
        const data =  await response.json();

        await console.log(data)
   

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
                const dataSpecies =  await fetch(data.species.url)
                const dataEvolutionJSON =  await dataSpecies.json();
               
                const dataEvolution = await fetch(dataEvolutionJSON.evolution_chain.url)
                const dataEvoChain = await dataEvolution.json()
                await console.log(dataEvoChain)
                   let evo1  ; let evo2; let evo3; 
                   
                    let evo1_name = dataEvoChain.chain.species.name;
                    let evo1_url;
                    const evo1DataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo1_name}`)
                    const evo1Data = await evo1DataFetch.json()
                     console.log(evo1Data)
           
           evo1_url = `https://pokeapi.co/api/v2/pokemon/${evo1Data.id}`
           evo1 ={name:evo1_name, url: evo1_url}
           console.log(evo1)
          evolutionArray.push(evo1)
           this.setState({
             evolution:evolutionArray
           })
           
         

                   
                         
                    if(dataEvoChain.chain.evolves_to.length > 0)
                    {
                      if(dataEvoChain.chain.evolves_to[0].species.name.length > 0) {
                    let evo2_url;
                    let evo2_name = dataEvoChain.chain.evolves_to[0].species.name;
                     const evo2DataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo2_name}`)
                    const evo2Data = await evo2DataFetch.json()
                    
                      
                      evo2_url = `https://pokeapi.co/api/v2/pokemon/${evo2Data.id}`
                      evo2 ={name:evo2_name, url: evo2_url}
                      console.log(evo2)
                      
                      evolutionArray.push(evo2)
                      this.setState({
                        evolution:evolutionArray
                      })
                    

                      //most tettem ide
                    if(dataEvoChain.chain.evolves_to[0].evolves_to.length > 0) {
                      
                     let evo3_name = dataEvoChain.chain.evolves_to[0].evolves_to[0].species.name
                     let evo3_url;
                     const evo3DataFetch = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo3_name}`)

                    const evo3Data = await evo3DataFetch.json()
                    
                       
                       evo3_url = `https://pokeapi.co/api/v2/pokemon/${evo3Data.id}`
                       evo3 ={name:evo3_name, url: evo3_url}
                       
                       evolutionArray.push(evo3)
                       this.setState({
                        evolution:evolutionArray
                      })
                      
                     

                    } else {
                        evo3 = null
                    }

                   } else {
                       evo2 = null
                     }
                     
                   }
                  
                  
                  

               
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
                loading:false
                
                
                  
              })

            
              console.log(this.state.evolution)

               
            
           
               

            
        
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
      <div className="container">
        {this.state.loading  ? "Loading..." :
        <div className="col justify-content-center">
            <div >
              
            <div className="row mt-3 mb-0">
              <div className="col-4">
              <Link to='/' className="btn btn-danger">Back to Pokédex</Link>
              </div>
           <div className="col-4">
           <div className="row justify-content-center">{orderNumber}.</div>
           <div className="row justify-content-center ">
           <h2>{name.toLowerCase().split(" ").map(character => character.charAt(0).toUpperCase() + character.substring(1))}</h2>
            </div> 
           </div>
         
           <div className="col-4"></div>
            
              </div>
              <hr></hr>
               <div className="row mt-1">
               <div className="col-4 align-items-center">
               <img max-width="250px" max-height="250px" className="img-fluid" src={image}/>
    </div>
    <div className="col-4"><div className="row justify-content-center"> <h5>Types:</h5></div> 
<div className="row justify-content-center">
{type.map((ability:string) => <div className="btn btn-danger m-2">{ability}</div>)}</div></div>
<div className="col-4 align-items-left">

 <div className="row justify-content-center"><h5>Abilities: </h5> </div>  
 <div className="col">
 <div >
 {abilities.map((ability:string) => <div className="btn btn-danger m-2">{ability}</div>)}
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
   { evolution &&  evolution.map ( (evo:{name:string, url:string}) => <PokemonCard name={evo.name} url={`${evo.url}/`}/>  ) } 
   </div>
    
   </div>
  
   </div>
   </div>
}
   </div>


  
               
        
       
    )
   
}
}
