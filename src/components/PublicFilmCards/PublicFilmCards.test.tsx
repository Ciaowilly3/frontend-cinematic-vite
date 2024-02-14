import { render } from '@testing-library/react';
import PublicFilmCards from '.';

const mockedData = [
  {
    title: 'Avengers',
    filmId: '123',
    coverImg: 'cover',
    plot: 'plot',
    nationOfProduction: 'usa',
    rating: 0.2,
    funFacts: 'none',
    filmGenre: [],
  },
];
const mockedIsFetching = jest.fn().mockReturnValue(false);
const mockedIsError = jest.fn().mockReturnValue(false);
jest.mock('../../services/film/api', () => ({
  useRetrieveAllFilmsQuery: () => ({
    isFetching: mockedIsFetching(),
    data: mockedData,
    isError: mockedIsError(),
  }),
}));

const renderComponent = () => render(<PublicFilmCards />);

describe('PublicFilmCards', () => {
  test('renders spinner during loading', () => {
    mockedIsFetching.mockReturnValueOnce(true);

    const { getByTestId } = renderComponent();

    expect(getByTestId('loader')).toBeInTheDocument();
  });
  test('renders error if isError', () => {
    mockedIsError.mockReturnValueOnce(true);

    const { getByText } = renderComponent();

    expect(getByText('Error')).toBeInTheDocument();
  });
  test('renders datas correctly', () => {
    const { getByText, getByAltText } = renderComponent();

    expect(getByText('Avengers')).toBeInTheDocument();
    expect(getByText('plot')).toBeInTheDocument();

    expect(getByAltText('Avengers')).toHaveAttribute('src', 'cover');
  });
});
