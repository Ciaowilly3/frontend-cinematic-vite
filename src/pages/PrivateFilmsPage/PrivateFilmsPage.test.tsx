import { fireEvent, render, waitFor } from '@testing-library/react';
import PrivateFilmPage from './PrivateFilmsPage';

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

const mockedIsError = jest.fn().mockReturnValue(false);
const mockedIsFetching = jest.fn().mockReturnValue(false);
jest.mock('../../components/GenreInput', () =>
  jest.fn().mockReturnValue(<div>Genre</div>)
);
jest.mock('../../components/PrivateFilmCard', () =>
  jest.fn().mockReturnValue(<div>Avengers</div>)
);
jest.mock('../../components/FilmForm', () =>
  jest.fn().mockReturnValue(<div>Form</div>)
);
jest.mock('../../services/film/api', () => ({
  useRetrieveAllFilmsQuery: () => ({
    data: mockedData,
    isError: mockedIsError(),
    isFetching: mockedIsFetching(),
  }),
}));

// const mockedHandleFilmFormVisibility = jest.fn();
const renderComponent = () => render(<PrivateFilmPage />);

describe('PrivateFilmPage', () => {
  test('should render', () => {
    const view = renderComponent();

    expect(view).toMatchSnapshot();
  });
  test('should display error when query fails', async () => {
    mockedIsError.mockReturnValueOnce(true);
    const { getByText } = renderComponent();

    await waitFor(() => {
      expect(getByText('ERROR')).toBeInTheDocument();
    });
  });
  test('should render loader when is fetching', async () => {
    mockedIsFetching.mockReturnValueOnce(true);
    const { getByTestId } = renderComponent();

    await waitFor(() => {
      expect(getByTestId('loader')).toBeInTheDocument();
    });
  });
  test('should render filmForm when btn is clicked', async () => {
    const { getByText } = renderComponent();

    fireEvent.click(getByText('Create a film'));

    await waitFor(() => {
      expect(getByText('Form')).toBeInTheDocument();
      // expect(mockedHandleFilmFormVisibility).toHaveBeenCalled();
    });
  });
});
