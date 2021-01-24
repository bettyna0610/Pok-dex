import React from 'react';
import './App.css';
import {PokemonContainer} from './Components/Container'
import {NavBarEl} from './Components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBarEl />
     <PokemonContainer  />
    </div>
  );
}

export default App;
