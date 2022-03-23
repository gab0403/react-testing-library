import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se página contém um heading h2 com o texto Encountered pokémons.', () => {
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

  it('Teste se mostra o próximo Pokémon da lista quando o botão verde é clicado',
    async () => {
      renderWithRouter(<App />);
      const buttonProx = screen.getByRole('button', { name: 'Próximo pokémon' });
      expect(buttonProx).toBeInTheDocument();

      userEvent.click(buttonProx);
      const pokemonTitle = await screen.findByText('Charmander');
      expect(pokemonTitle).toBeInTheDocument();
    });

  it('Teste se a Pokédex tem os botões de filtro', async () => {
    renderWithRouter(<App />);
    const buttonElectric = screen.getByRole('button', { name: 'Electric' });
    expect(buttonElectric).toBeInTheDocument();

    userEvent.click(buttonElectric);
    const pokemonTitle = await screen.findByText('Pikachu');
    expect(pokemonTitle).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    userEvent.click(buttonAll);
    const pokemonTitle = await screen.findByText('Pikachu');
    expect(pokemonTitle).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', async () => {
    renderWithRouter(<App />);
    const button = await screen.findAllByTestId('pokemon-type-button');
    expect(button[0].innerHTML).toBe('Electric');

    const buttonEle = screen.getByRole('button', { name: 'Electric' });
    expect(buttonEle).toBeInTheDocument();
    userEvent.click(buttonEle);

    const pokemonTitle = await screen.findByText('Pikachu');
    expect(pokemonTitle).toBeInTheDocument();
  });
});
