import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se o topo da aplic tem um conjunto fixo de links de navegação.', () => {
  it('Verifica se o primeiro link possui o texto Home.', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeTitle = screen.getByRole('heading',
      { name: 'Encountered pokémons' });
    expect(homeTitle).toBeInTheDocument();
  });

  it('Verifica se o primeiro link possui o texto About.', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTitle = screen.getByRole('heading',
      { name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Verifica se o primeiro link possui o texto Favorite Pokémons.', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritePokemonsLink).toBeInTheDocument();
    userEvent.click(favoritePokemonsLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const favoritePokemonsTitle = screen.getByRole('heading',
      { name: 'Favorite pokémons' });
    expect(favoritePokemonsTitle).toBeInTheDocument();
  });
});
