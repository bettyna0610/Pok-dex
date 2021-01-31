

type statProps = {
    stats: {
        hp: number,
        attack:number,
        defense: number,
        specialAttack: number,
        specialDefense: number,
        speed: number
    },
    hpPercent: number,
    attackPercent:number,
    defensePercent: number,
    specialAttackPercent: number,
    specialDefensePercent: number,
    speedPercent: number
}


export const Stats = (props:statProps) => {

return (
    <>
    <p className="text-center">HP:</p>
    <div className="progress m-1">    
      <div className="progress-bar bg-danger" role="progressbar" style={{width: `${props.hpPercent}%`}}aria-valuenow={props.stats.hp} aria-valuemin={0} aria-valuemax={100}>{props.stats.hp}</div>
    </div>
    <p className="text-center">ATTACK:</p>
    <div className="progress m-1">   
      <div className="progress-bar bg-danger" role="progressbar" style={{width: `${props.attackPercent}%`}} aria-valuenow={props.stats.attack} aria-valuemin={0} aria-valuemax={100}>{props.stats.attack}</div>
    </div>
    <p className="text-center">DEFENSE:</p>
    <div className="progress m-1">  
      <div className="progress-bar bg-danger" role="progressbar" style={{width: `${props.defensePercent}%`}} aria-valuenow={props.stats.defense} aria-valuemin={0} aria-valuemax={100}>{props.stats.defense}</div>
    </div>
    <p className="text-center">SPECIAL ATTACK:</p>
    <div className="progress m-1">
      <div className="progress-bar bg-danger" role="progressbar" style={{width:`${props.specialAttackPercent}%`}} aria-valuenow={props.stats.specialAttack} aria-valuemin={0} aria-valuemax={100}>{props.stats.specialAttack}</div>
    </div>
    <p className="text-center">SPECIAL DEFENSE:</p>
    <div className="progress m-1">
      <div className="progress-bar bg-danger" role="progressbar" style={{width: `${props.specialDefensePercent}%`}} aria-valuenow={props.stats.specialDefense} aria-valuemin={0} aria-valuemax={100}>{props.stats.specialDefense}</div>
    </div>
    <p className="text-center">SPEED:</p>
    <div className="progress m-1">
      <div className="progress-bar bg-danger" role="progressbar" style={{width: `${props.speedPercent}%`}} aria-valuenow={props.stats.speed} aria-valuemin={0} aria-valuemax={100}>{props.stats.speed}</div>
    </div>
 </>
)
}