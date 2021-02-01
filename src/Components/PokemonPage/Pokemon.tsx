
import React from 'react'
import {DropdownList} from './Dropdown'
import {Link} from 'react-router-dom'
import {Stats} from './Stats'
import {Evolution} from './Evolution'

type MyProps = {
    match:any
}

type MyState = {
 abilities: string[],
 image:string,
 name:string,
 type: string [],
 orderNumber:number,
 moves: string [],
 loading: boolean,
 dataPokemon: any
}


export class Pokemon extends React.Component<MyProps, MyState> {
   
    state = {
        image:'',
        name:'',
        abilities: [],
        type:[],
        orderNumber:0,
        moves: [],
        loading:false,
        dataPokemon: []
    }

    async componentDidMount() {

        let pokemonIndex  = this.props.match.url.split('/')[this.props.match.url.split('/').length-1]
        let image;
        this.setState({
          loading: true
        })
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`)
        const data =  await response.json();

        this.setState({
          dataPokemon: data
        })

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
            let moves = data.moves.map((move:any) => move.move.name)
          
               
               this.setState({
                image,
                abilities,
                name,
                type,
                orderNumber,
                moves,
                loading:false            
              })   
    }


render() {
    
     let {image,name,abilities,type,orderNumber,moves} = this.state
     
     
    return (

    <div className="container">
      {this.state.loading  ? "Loading..." :
      <div className="col justify-content-center">
        <div>  
          <div className="row mt-3 mb-0">
            <div className="col-lg-4 col-sm-4 col-xs">
              <Link to='/' className="btn btn-danger">Back to Pokédex</Link>
            </div>
            <div className="col-lg-4 col-sm-4 col-xs center-block">
              <div className="row justify-content-center">{orderNumber}.</div>
              <div className="row justify-content-center ">
               <h2>{name.toLowerCase().split(" ").map(character => character.charAt(0).toUpperCase() + character.substring(1))}</h2>
              </div> 
            </div>
            <div className="col-4"></div>  
          </div>
      <hr></hr>
      <div className="row mt-1">
        <div className="col-lg-4 col-sm-4 align-items-center col-xs">
          <img width="200px" height="200px" className="img-fluid" src={image}/>
        </div>
        <div className="col-lg-4 col-sm-4 col-xs">
          <div className="row justify-content-center col-xs">
            <h5>Types:</h5>
          </div> 
          <div className="row justify-content-center">
            {type.map((type:string) => <div key={type} className="btn btn-danger m-2">{type}</div>)}
          </div>
        </div>
        <div className="col-lg-4 col-sm-4 align-items-left col-xs">
          <div className="row justify-content-center">
            <h5>Abilities:</h5> 
          </div>  
          <div className="col">
            {abilities.map((ability:string) => <div key={ability} className="btn btn-danger m-2">{ability}</div>)}
          <div>
        </div>
       </div>
          <div className="row mt-3 justify-content-center">
            <DropdownList moves={moves} />
          </div>
        </div>
      </div>
     <div>
    <div className="row justify-content-center">
      <div className="col-lg-3 col-sm-3"></div>
      <div className="col-lg-6 col-sm-6 col-xs">
        <div>
           <h5> Stats:</h5>
        </div>
          <Stats  data={this.state.dataPokemon}
           />
      </div>
      <div className="col-lg-3 col-sm-3"></div>
   </div>
  
    <div className="row justify-content-center m-3"> 
      <h5> Evolution:</h5> 
    </div>
    <div className="row justify-content-center m-3">
      <Evolution data={this.state.dataPokemon}/>
      
    </div> 
   </div>
  </div>
 </div>
}
</div>         
    )
   
}
}
