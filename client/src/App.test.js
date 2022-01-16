import { render, screen } from '@testing-library/react';
import App from './App';
import Card from './components/Card'
// import React from 'react';
// import Home from './components/Home';

const pokemon = {
  name: 'pokemoncito',
  image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/217.png'
}

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Landing Page', () => {
  render(<App />);
  const button = screen.getByRole('button');
  it('should render a button to enter Home', () => {
    expect(button).toBeInTheDocument();
  });
});


describe('Pokemon Card', () => {
  render(<Card {...pokemon} />);
  const name = screen.getByTestId('name');
  const image = screen.getByTestId('image');
  it('should render the name', () => {
    expect(name.innerHTML).toBe(('pokemoncito').toUpperCase());
  });
  it('should render the image', () => {
    expect(image.src).toBe('https://assets.pokemon.com/assets/cms2/img/pokedex/full/217.png')
  });
})

// test('render about link', () => {
//   // render(<Home />);
//   const { getByText } = render(<Home />);
//   it('should render a link to create a pokemon', () => {
//     expect(screen.getByText(/CREATE A POKEMON/)).toBeInTheDocument();
//   })
// })