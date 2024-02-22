import { render } from '@testing-library/react';
import PublicFilmCard from '.';

const mockedFilm = {
  title: 'Avengers',
  filmId: '123',
  coverImg: 'http://url',
  plot: 'plot',
  nationOfProduction: 'usa',
  rating: 0.2,
  funFacts: 'none',
  filmGenre: [{ genre: { genreName: 'action' } }],
};

const renderComponent = () => render(<PublicFilmCard film={mockedFilm} />);

describe('PublicFilmCard', () => {
  test('renders film card', () => {
    const { getByAltText, getByText } = renderComponent();

    expect(getByAltText(mockedFilm.title)).toBeInTheDocument();
    expect(getByText(mockedFilm.plot)).toBeInTheDocument();
    expect(getByText('Genres: action')).toBeInTheDocument();
  });
});
