import React from 'react';
import { screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../util/renderWithRouter';
import App from '../App';

const NAME_LINK = 'More details';

describe('6. Testa o componente <Pokemon.js />', () => {
  // beforeEach(() => {
  //   renderWithRouter(<App />);
  // });
  test('É renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const POKEMON_IMG = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeigth = screen.getByTestId('pokemon-weight');
    expect(pokemonWeigth).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImg = screen.getByRole('img');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', POKEMON_IMG);
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test('O card do Pokémon indicado na Pokédex contém um link de navegação'
    + 'para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>,'
    + ' onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);

    // const pokemonLink = screen.getByRole('link', { name: 'More details' });
    const pokemonLink = screen.getByText(NAME_LINK);
    expect(pokemonLink).toHaveAttribute('href', '/pokemons/25');
  });
  test('Ao clicar no link de navegação do Pokémon, vai para detalhes de Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: NAME_LINK });
    userEvent.click(pokemonLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const pokemonLink = screen.getByRole('link', { name: NAME_LINK });
    userEvent.click(pokemonLink);

    const checkBoxEl = screen.getByRole('checkbox');
    userEvent.click(checkBoxEl);

    const starImgEl = screen.getByAltText('Pikachu is marked as favorite');
    expect(starImgEl.src).toContain('/star-icon.svg');
  });
});
