import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji' });
    expect(title).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', async () => {
    renderWithRouter(<NotFound />);
    const img = await
    screen.findByAltText('Pikachu crying because the page requested was not found');
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toMatch(url);
  });
});
