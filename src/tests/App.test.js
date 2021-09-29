import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe(`Testa se encontra e redireciona
  os links de navegação Home, About, Favorite Pokemon e NotFound`, () => {
  it('deveria encontrar o link `Home` e redirecionar a `/`', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();

    userEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });

  it('deveria encontrar o link `About` e redirecionar a `/about`', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();

    userEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });

  it('deveria encontrar o link `Favorite Pokemon`', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemons = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoritePokemons).toBeInTheDocument();

    userEvent.click(favoritePokemons);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('deveria redirecionar a página NotFound', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/algumaCoisa');
    const textNotFound = screen.getByText('Page requested not found');
    expect(textNotFound).toBeInTheDocument();
  });
});
