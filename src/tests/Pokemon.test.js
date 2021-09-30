import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o component Pokemon', () => {
  it('deveria mostrar as informações corretas do pokemon Pikachu', () => {
    renderWithRouter(<App />);
    const pikachuName = screen.getByTestId('pokemon-name');
    const pikachuType = screen.getByTestId('pokemon-type');
    const pikachuWeight = screen.getByTestId('pokemon-weight');
    const pikachuSprite = screen.getAllByRole('img')[0];

    expect(pikachuName).toBeInTheDocument();
    expect(pikachuName.textContent).toBe('Pikachu');

    expect(pikachuType).toBeInTheDocument();
    expect(pikachuType.textContent).toBe('Electric');

    expect(pikachuWeight).toBeInTheDocument();
    expect(pikachuWeight.textContent).toBe('Average weight: 6.0 kg');

    expect(pikachuSprite).toBeInTheDocument();
    expect(pikachuSprite).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pikachuSprite).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it(`deveria ter um link para mais detalhes do pokemon e deve ter o caminho com o
    id do pokemon`, () => {
    renderWithRouter(<App />);

    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });

    expect(linkMoreDetails).toBeInTheDocument();
    expect(linkMoreDetails).toHaveAttribute('href', '/pokemons/25');
  });
});
