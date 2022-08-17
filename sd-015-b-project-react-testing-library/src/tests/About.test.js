import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import About from '../components/About';

const URL_IMG = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
const TWICE = 2;

describe('2. Teste o componente <About.js />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
  });
  test('a página contém um heading h2 com o texto About Pokédex', () => {
    const headingEl = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(headingEl).toBeInTheDocument();
  });
  test('a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const text = screen.getAllByText(/Pokémons/i);
    expect(text.length).toBe(TWICE);
  });
  test('a página contém a seguinte imagem de uma Pokédex', () => {
    const imgEl = screen.getByRole('img');
    expect(imgEl).toHaveAttribute('src', URL_IMG);
  });
});
