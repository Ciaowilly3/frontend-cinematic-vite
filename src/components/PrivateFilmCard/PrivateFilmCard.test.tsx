import { fireEvent, render } from '@testing-library/react';
import { useDeleteFilmByIdMutation } from '../../services/film/api';

import PrivateFilmCard from '.';

jest.mock('../../services/film/api');
const mockedUseDeleteFilmByIdMutation = jest.mocked(useDeleteFilmByIdMutation);

const mockedData = {
  title: 'Avengers',
  filmId: '123',
  coverImg: 'cover',
  plot: 'plot',
  nationOfProduction: 'usa',
  rating: 0.2,
  funFacts: 'none',
  filmGenre: [],
};
const privateFilmCardProps = {
  film: mockedData,
  handleFilmFormVisibility: jest.fn(),
};
const renderComponent = () => {
  return render(
    <PrivateFilmCard
      film={privateFilmCardProps.film}
      handleFilmFormVisibility={privateFilmCardProps.handleFilmFormVisibility}
    />
  );
};
const mockDeleteFilm = jest.fn();

describe('PrivateFilmCard', () => {
  beforeEach(() => {
    mockedUseDeleteFilmByIdMutation.mockReturnValue([mockDeleteFilm] as never);
  });
  test('renders film send by prop', () => {
    const { getByText, getByAltText } = renderComponent();

    expect(getByText('Avengers')).toBeInTheDocument();
    expect(getByText('plot')).toBeInTheDocument();
    expect(getByText('0.2 usa none')).toBeInTheDocument();

    expect(getByAltText('...')).toHaveAttribute('src', 'cover');
  });

  test('testing edit function', () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText('Edit'));

    expect(privateFilmCardProps.handleFilmFormVisibility).toHaveBeenCalledWith(
      privateFilmCardProps.film
    );
  });
  test('testing delete function', () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText('Delete'));

    expect(mockDeleteFilm).toHaveBeenCalledWith(
      privateFilmCardProps.film.filmId
    );
  });
});
