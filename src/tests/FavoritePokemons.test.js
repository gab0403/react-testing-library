import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  it('Teste se não tiver pokémon favorito é exibido No favorite pokemon found.', () => {
    renderWithRouter(<FavoritePokemons />);
    const favoritePokemonsTitle = screen.getByText('No favorite pokemon found');
    expect(favoritePokemonsTitle).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', async () => {
    renderWithRouter(<App />);

    const details = await screen.findByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checkFav = await screen.findByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });
    userEvent.click(checkFav);

    const favorite = await screen.findByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorite);
    const fav = screen.getByText('Pikachu');
    expect(fav).toBeInTheDocument();
  });
});
