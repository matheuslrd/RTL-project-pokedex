import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testa por completo o componente `About`', () => {
  it('deveria conter o h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('deveria mostrar as informações sobre a pokedex', () => {
    renderWithRouter(<About />);

    const textDoesPokedex = 'This application simulates a Pokédex, a '
    + 'digital encyclopedia containing all Pokémons';
    const textAboutPokedexFilter = 'One can filter Pokémons by type, '
    + 'and see more details for each one of them';

    const howThisDoesPokedex = screen.getByText(textDoesPokedex);
    const aboutPokedexFilter = screen.getByText(textAboutPokedexFilter);

    expect(howThisDoesPokedex).toBeInTheDocument();
    expect(aboutPokedexFilter).toBeInTheDocument();
  });

  it('deveria ter uma imagem de pokédex', () => {
    renderWithRouter(<About />);

    const imagePokedex = screen.getByRole('img');
    const srcAttributeImg = (
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
    );

    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex).toHaveAttribute('src', srcAttributeImg);
  });
});
