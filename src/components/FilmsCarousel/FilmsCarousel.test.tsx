import { useRetrieveAllFilmsQuery } from '../../services/film/api';
import { render } from '@testing-library/react';
import FilmsCarousel from '.';

jest.mock('../../services/film/api');
const mockedUseRetrieveAllFilmsQuery = jest.mocked(useRetrieveAllFilmsQuery);
const renderComponent = () => render(<FilmsCarousel />);

describe('FilmsCarousel', () => {
  test('renders spinner during loading', () => {
    mockedUseRetrieveAllFilmsQuery.mockReturnValue({
      isLoading: true,
    } as never);

    const { getByTestId } = renderComponent();

    expect(getByTestId('loader')).toBeInTheDocument();
  });
  test('renders error if isError', () => {
    mockedUseRetrieveAllFilmsQuery.mockReturnValue({
      isError: true,
    } as never);

    const { getByText } = renderComponent();

    expect(getByText('Error')).toBeInTheDocument();
  });
  test('renders datas correctly', () => {
    mockedUseRetrieveAllFilmsQuery.mockReturnValue({
      data: [
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
      ],
    } as never);

    const { getByText } = renderComponent();

    expect(getByText('Avengers')).toBeInTheDocument();
  });
});
