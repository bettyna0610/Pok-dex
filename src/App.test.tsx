import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
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

test('should render Pokemon page', () => {
  const component = shallow(<Pokemon match=""/>);
  expect(toJSON(component)).toMatchSnapshot();
})

test('should render dropdown list with moves', () => {
  const component = shallow(<DropdownList moves={["attack","defense","fly"]} />);
  expect(toJSON(component)).toMatchSnapshot();
})


test('pokemon page navigates back to homepage', () => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <Pokemon match=""/>
    </Router>
  )

  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/Back to Pokédex/i), leftClick)
  expect(screen.getByText(/Search/i)).toBeInTheDocument()

})