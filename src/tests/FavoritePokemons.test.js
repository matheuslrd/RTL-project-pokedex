import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o component `Favorite Pokemons`', () => {
  it(`testa se, não adicionado nenhum pokemon,renderiza o componente
  No Favorite Pokemon`, () => {
    renderWithRouter(<FavoritePokemons />);

    const noFavoritePokemon = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoritePokemon).toBeInTheDocument();
  });

  it('deveria mostrar o pokemon pikachu nos favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const linkPokemonDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkPokemonDetails).toBeInTheDocument();
    userEvent.click(linkPokemonDetails);

    const inputAddFavorite = screen.getByRole('checkbox');
    expect(inputAddFavorite).toBeInTheDocument();
    userEvent.click(inputAddFavorite);

    history.push('/favorites');
    const headingFavoritePokemons = screen.getByRole('heading',
      {
        name: 'Favorite pokémons',
      });
    expect(headingFavoritePokemons).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
