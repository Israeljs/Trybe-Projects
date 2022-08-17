import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

const NINE_NUMBER = 4;

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon '
    + 'found, se a pessoa não tiver pokémons favoritos.', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );
    const textEl = screen.getByText(/No favorite pokemon found/i);
    expect(textEl).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const buttonEl = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonEl);

    const linkEl = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkEl);

    const checkboxEl = screen.getByRole('checkbox');
    userEvent.click(checkboxEl);

    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const imgEl = screen.getAllByRole('img');
    expect(imgEl.length).toBe(NINE_NUMBER);
  });
});
