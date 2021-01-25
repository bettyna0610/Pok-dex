import React from 'react';
import './App.css';
import {PokemonContainer} from './Components/Container'
import {NavBarEl} from './Components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Pokemon} from './Components/Pokemon'

function App() {
  return (
    <Router>
     <div className="App">
      <NavBarEl />
      <Switch>
      <Route exact path="/" component={PokemonContainer} />
              <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />
      <PokemonContainer  />
      </Switch>
     
    </div>
    </Router>
    
  );
}

export default App;
