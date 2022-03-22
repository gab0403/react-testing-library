import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading',
      { name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const parag1 = screen.getByText(/this application /i);
    const parag2 = screen.getByText(/One can filter /i);
    expect(parag1).toBeInTheDocument();
    expect(parag2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex:', async () => {
    renderWithRouter(<About />);
    const image = await screen.findByAltText('Pokédex');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toMatch(url);
  });
});
