import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe(`Testa se a página NotFound é renderizada se a url
não é encontrada`, () => {
  it('deveria renderizar NotFound e mostrar o texto NotFound', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const titleNotFound = screen.getByText(/Page requested not found/);

    expect(titleNotFound).toBeInTheDocument();

    const imgPikachuCrying = screen.getAllByRole('img');
    expect(imgPikachuCrying[1]).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
