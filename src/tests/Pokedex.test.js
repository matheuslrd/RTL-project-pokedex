import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente `Pokedex`', () => {
  it('deveria mostrar um h2 com o texto `Encountered pokémons`', () => {
    renderWithRouter(<App />);

    const titlePokedex = screen.getByRole('heading',
      { level: 2, name: 'Encountered pokémons' });

    expect(titlePokedex).toBeInTheDocument();
  });

  it(`deveria mostrar o pŕoximo pokemon quando clicado no botão 'Próximo pokémon'
    um a um`,
  () => {
    renderWithRouter(<App />);

    pokemons.forEach(({ name }, index) => {
      const pokemonName = screen.getByTestId('pokemon-name');
      const btnNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });

      expect(pokemonName.textContent).toBe(name);

      if (index !== pokemons.length - 1) {
        userEvent.click(btnNextPokemon);
      } else {
        userEvent.click(btnNextPokemon);
        expect(pokemonName.textContent).toBe('Pikachu');
      }
    });
  });

  it('deveria mostrar todos botões de filtro', () => {
    renderWithRouter(<App />);

    const allButtonsFilters = screen.getAllByTestId('pokemon-type-button');
    allButtonsFilters.forEach((button) => expect(button).toBeInTheDocument());
  });

  it('deveria circular apenas por um tipo quando clicar em um botão de filtro', () => {
    renderWithRouter(<App />);
    const btnFilterFire = screen.getByRole('button', { name: 'Fire' });
    expect(btnFilterFire).toBeInTheDocument();
    userEvent.click(btnFilterFire);

    const nameCharmander = screen.getByText('Charmander');
    expect(nameCharmander).toBeInTheDocument();

    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(btnNextPokemon);

    const nameRapidash = screen.getByText('Rapidash');
    expect(nameRapidash).toBeInTheDocument();

    const typePokemon = screen.getByText('Electric');
    expect(btnFilterFire.innerText === typePokemon.innerText).toBe(true);

    const showAllPokemons = screen.getByRole('button', { name: 'All' });
    expect(showAllPokemons.disabled).toBe(false);
  });

  it('deveria conter o botão de resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnAllPokemons = screen.getByRole('button', { name: 'All' });
    expect(btnAllPokemons).toBeInTheDocument();
    userEvent.click(btnAllPokemons);
  });
});
