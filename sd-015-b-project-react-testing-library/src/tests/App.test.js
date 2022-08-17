import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('1. Teste o componente <App.js />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
  });
  test('o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const homeEl = screen.getByRole('link', { name: 'Home' });
    const aboutEl = screen.getByRole('link', { name: 'About' });
    const favoriteEl = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(homeEl).toBeInTheDocument();
    expect(aboutEl).toBeInTheDocument();
    expect(favoriteEl).toBeInTheDocument();
  });
  test('a aplicação vai para a página inicial ao clicar no link Home', () => {
    const homeEl = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeEl);
    expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
  });
  test('a aplicação vai para a página de About ao clicar no link About', () => {
    const aboutEl = screen.getByRole('link', { name: 'About' });
    userEvent.click(aboutEl);
    expect(screen.getByText('About Pokédex')).toBeInTheDocument();
  });
  test('vai para a página de Favoritados ao clicar no link Favorite Pokémons', () => {
    const favoriteEl = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteEl);
    expect(screen.getByText('Favorite pokémons')).toBeInTheDocument();
  });
  test('a aplicação vai para Not Found ao entrar em uma URL desconhecida', () => {
    const customHistory = createMemoryHistory();

    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/qualquercoisa');

    const notFoundEl = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(notFoundEl).toBeInTheDocument();
  });
});
