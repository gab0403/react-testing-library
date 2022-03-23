import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const detailsTitle = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(detailsTitle).toBeInTheDocument();

    const sumaryTitle = screen.getByRole('heading', { name: 'Summary' });
    expect(sumaryTitle).toBeInTheDocument();

    const paragraph = screen.getByText(/This intelligent Pokémon/i);
    expect(paragraph).toBeInTheDocument();
  });

  it('Teste há na página uma seção com os mapas com as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const locationTitle = screen.getByRole('heading', {
      name: 'Game Locations of Pikachu' });
    expect(locationTitle).toBeInTheDocument();

    const maps = screen.getAllByRole('img', {
      name: 'Pikachu location' });
    const url1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const alt = 'Pikachu location';
    expect(maps[0].src).toBe(url1);
    expect(maps[0].alt).toBe(alt);

    const url2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    expect(maps[1].src).toBe(url2);
    expect(maps[1].alt).toBe(alt);
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checkFav = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });
    userEvent.click(checkFav);
  });
});
