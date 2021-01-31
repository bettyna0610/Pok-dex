import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ReactDOM from 'react-dom';
import {PokemonContainer} from './Components/Container';
import {Pokemon} from './Components/PokemonPage/Pokemon';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json'
import {DropdownList} from './Components/PokemonPage/Dropdown'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'



test('renders the component', () => {
  const component = shallow(<App />);
  expect(toJSON(component)).toMatchSnapshot();
});

test('should render all dropdown list with moves', () => {
  const component = shallow(<DropdownList moves={["attack","defense","fly"]} />);
  expect(toJSON(component)).toMatchSnapshot();
})

test('not showing pagination when search', () => {
  let value = "pikachu"
  const component = shallow(<PokemonContainer />);
  component.find('input').simulate("change", { target: {value}})
  expect(component.find('.pagination')).toHaveLength(0)
});

test('pokemon page navigates back to homepage', () => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <Pokemon match=""/>
    </Router>
  )

  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/Back to Pokédex/i), leftClick)
  expect(screen.getByText(/Type/i)).toBeInTheDocument()

})