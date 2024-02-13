import { useRetrieveAllFilmsQuery } from '../../services/film/api';
import { render } from '@testing-library/react';
import PublicFilmCards from '.';
import { filmMock } from '../../mocks/FilmMock';

jest.mock('../../services/film/api');
const mockedUseRetrieveAllFilmsQuery = jest.mocked(
  useRetrieveAllFilmsQuery
) as jest.MockedFunction<typeof useRetrieveAllFilmsQuery>;
const renderComponent = () => render(<PublicFilmCards />);

describe('PublicFilmCards', () => {
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
      data: [filmMock],
    } as never);

    const { getByText, getByAltText } = renderComponent();

    expect(getByText('Avengers')).toBeInTheDocument();
    expect(getByText('plot')).toBeInTheDocument();

    expect(getByAltText('Avengers')).toHaveAttribute('src', 'cover');
  });
});
