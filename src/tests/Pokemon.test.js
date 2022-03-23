import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações do pokémon.', async () => {
    renderWithRouter(<App />);
    const pokemonTitle = await screen.findAllByTestId('pokemon-name');
    expect(pokemonTitle[0].innerHTML).toBe('Pikachu');

    const pokemonType = await screen.findAllByTestId('pokemon-type');
    expect(pokemonType[0].innerHTML).toBe('Electric');

    const pokemonAvarege = await screen.findAllByTestId('pokemon-weight');
    expect(pokemonAvarege[0].innerHTML).toBe('Average weight: 6.0 kg');

    const img = await screen.findByAltText(/pikachu sprite/i);
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(img.src).toMatch(url);
    screen.logTestingPlaygroundURL();
  });

  it('Teste se o card do Pokémon há link de navegação para exibir detalhes', async () => {
    const { history } = renderWithRouter(<App />);
    const details = await screen.findByRole('link', { name: /more details/i });
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checkFav = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });
    userEvent.click(checkFav);
    const favorite = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite' });

    const url = 'http://localhost/star-icon.svg';
    const alt = 'Pikachu is marked as favorite';
    expect(favorite.src).toBe(url);
    expect(favorite.alt).toBe(alt);
  });
});
