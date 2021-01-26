import React from 'react'
import {Evolution} from './Evolution'

type MyProps = {
    match:any
}

type MyState = {
 
}

export class Pokemon extends React.Component<MyProps, MyState> {
   
    state = {
        image:'',
        name:'',
        abilities: [],
        type:[],
        orderNumber:0,
        stats: {
            hp:'',
            attack:'',
            defense:'',
            specialAttack:'',
            specialDefense:'',
            speed:''
        },
        evolution: []
        
            
        ,
        moves: []

    }

    componentDidMount() {
        let {pokemonIndex}  = this.props.match.params
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`).then(response => response.json())
        .then(data => { 
            let imageSource;
            if(parseInt(pokemonIndex) >= 650) {
             imageSource = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIndex}.png`
            } else {
                imageSource =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonIndex}.svg`
            }
            
                let abilities = data.abilities.map((ability:any) => ability.ability.name)
                let name = data.name
                let type = data.types.map((pokType:any) => pokType.type.name)
                let orderNumber = data.order
                let hp; let attack; let defense; let specialAttack; let specialDefense; let speed;
                let moves = data.moves.map((move:any) => <li>{move.move.name}</li>)

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
                   let evo1  ; let evo2; let evo3; let evolutionArray = []
                   
                    evo1 = dataEvoChain.chain.species.name;
                   
                         
                    if(dataEvoChain.chain.evolves_to.length > 0)
                    {
                      if(dataEvoChain.chain.evolves_to[0].species.name.length > 0) {

                    evo2 = dataEvoChain.chain.evolves_to[0].species.name;

                      //most tettem ide
                    if(dataEvoChain.chain.evolves_to[0].evolves_to.length > 0) {
                     evo3 = dataEvoChain.chain.evolves_to[0].evolves_to[0].species.name
                    } else {
                        evo3 = null
                    }

                   } else {
                       evo2 = null
                     }
                   }
                   evolutionArray.push(evo1,evo2,evo3)
                  
                   this.setState({
                    evolution: evolutionArray
                })})})

                   

               this.setState({
                    image: imageSource,
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
                    moves

               })

               
            })
           
               

            
        
    }


render() {
    
    let imgSource:string;
    let {image,name,abilities,type,orderNumber,stats,moves,evolution} = this.state
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => response.json())
    .then(data => {
        imgSource = data.sprites.front_default
        console.log(imgSource)
    })
    
    return (
        <div><img src={image}/>
       <div>
       {name}
           </div>
         {abilities}
         <div>{type}</div>
         <div>{orderNumber}</div>
         {stats.hp}<div>{stats.attack}</div><div>{stats.defense}
         </div><div>{stats.specialAttack}</div><div>{stats.specialDefense}</div><div>{stats.speed}</div>
         Moves:<ul>{moves}</ul>
          {/*<div>{evolution.evo1}</div><div>{evolution.evo2 && evolution.evo2}</div><div>{evolution.evo3 && evolution.evo3}</div>*/}
         {evolution.map( ( evo:string) => <Evolution name={evo} source={imgSource}/>)}
         </div>
    )
   
}
}
