import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import NotFound from '../components/NotFound';

const URL_IMG = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('4. Teste o componente <NotFound.js />', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
  });
  test('Se página contém um heading h2 com o texto Page requested not found 😭', () => {
    const headingEl = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(headingEl).toBeInTheDocument();
  });
  test('Se página mostra a imagem', () => {
    const imgEl = screen.getByAltText('Pikachu crying because '
      + 'the page requested was not found');
    expect(imgEl.src).toContain(URL_IMG);
  });
});
