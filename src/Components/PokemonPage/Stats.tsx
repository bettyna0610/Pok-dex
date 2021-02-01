

export const Stats = (props:any) => {

  let hp = 0; let attack =0; let defense=0; let specialAttack=0; let specialDefense=0; let speed=0;

 
if (props.data.stats) {
  props.data.stats.map(
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
}
  // counting max stat and ratio of stats comparing to the max one
  
        let statMaxArray = [hp,attack,defense,specialAttack,specialDefense,speed]
        let statMax =  Math.max(...statMaxArray)
        let hpPercent = (hp / statMax ) *100
        let attackPercent = (attack / statMax ) *100
        let defensePercent = (defense / statMax) *100
        let specialAttackPercent = (specialAttack / statMax )*100
        let specialDefensePercent = (specialDefense / statMax) *100
        let speedPercent = (speed / statMax)*100

return (
  <>
    <p className="text-center">HP:</p>
    <div className="progress m-1">    
      <div className="progress-bar bg-danger" role="progressbar" style={{width: `${hpPercent}%`}}aria-valuenow={hp} aria-valuemin={0} aria-valuemax={100}>{hp}</div>
    </div>
    <p className="text-center">ATTACK:</p>
    <div className="progress m-1">   
      <div className="progress-bar bg-danger" role="progressbar" style={{width: `${attackPercent}%`}} aria-valuenow={attack} aria-valuemin={0} aria-valuemax={100}>{attack}</div>
    </div>
    <p className="text-center">DEFENSE:</p>
    <div className="progress m-1">  
      <div className="progress-bar bg-danger" role="progressbar" style={{width: `${defensePercent}%`}} aria-valuenow={defense} aria-valuemin={0} aria-valuemax={100}>{defense}</div>
    </div>
    <p className="text-center">SPECIAL ATTACK:</p>
    <div className="progress m-1">
      <div className="progress-bar bg-danger" role="progressbar" style={{width:`${specialAttackPercent}%`}} aria-valuenow={specialAttack} aria-valuemin={0} aria-valuemax={100}>{specialAttack}</div>
    </div>
    <p className="text-center">SPECIAL DEFENSE:</p>
    <div className="progress m-1">
      <div className="progress-bar bg-danger" role="progressbar" style={{width: `${specialDefensePercent}%`}} aria-valuenow={specialDefense} aria-valuemin={0} aria-valuemax={100}>{specialDefense}</div>
    </div>
    <p className="text-center">SPEED:</p>
    <div className="progress m-1">
      <div className="progress-bar bg-danger" role="progressbar" style={{width: `${speedPercent}%`}} aria-valuenow={speed} aria-valuemin={0} aria-valuemax={100}>{speed}</div>
    </div>
 </>
)
}