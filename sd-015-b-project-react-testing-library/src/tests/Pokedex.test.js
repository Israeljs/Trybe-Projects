import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import App from '../App';
import pokemons from '../data';

describe('5. Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });
  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    const headingEl = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(headingEl).toBeInTheDocument();
  });
  test('se é exibido o próximo Pokémon da lista quando o botão Próximo '
    + 'pokémon é clicado', () => {
    const buttonEl = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(buttonEl);

    const textEl = screen.getByText('Charmander');
    expect(textEl).toBeInTheDocument();
  });
  test('Se é mostrado apenas um Pokémonpor vez', () => {
    const POKEMON_NUMBER = 1;
    const buttonEl = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(buttonEl);

    const textEl = screen.getAllByTestId('pokemon-name');
    expect(textEl.length).toBe(POKEMON_NUMBER);
  });
  test('A Pokédex tem os botões de filtro', () => {
    const BUTTON_NUMBER = 7;
    const buttonEl = screen.getAllByTestId('pokemon-type-button');
    expect(buttonEl.length).toBe(BUTTON_NUMBER);

    const buttonAllEl = screen.getByRole('button', { name: 'All' });
    expect(buttonAllEl).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const pokemonType = screen.getByRole('button', { name: pokemon.type });
      expect(pokemonType).toBeInTheDocument();
    });
  });

  test('A Pokédex contém um botão para resetar o filtro', () => {
    const buttonResetEl = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonResetEl);

    const textEl = screen.getByTestId('pokemon-name');
    expect(textEl).toHaveTextContent('Pikachu');
  });
});
