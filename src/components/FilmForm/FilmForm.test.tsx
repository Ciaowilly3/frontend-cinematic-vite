import { fireEvent, render, waitFor } from '@testing-library/react';
import FilmForm from './';

jest.mock('../GenreSelector', () =>
  jest.fn().mockReturnValue(<div>Genre</div>)
);

const mockedIsError = jest.fn().mockReturnValue(false);
const mockedIsLoading = jest.fn().mockReturnValue(false);
const mockedCreateFilm = jest.fn();
const mockedUpdateFilm = jest.fn();
const mockedUnwrap = jest.fn();
const mockedThen = jest.fn().mockImplementation((payload) => {
  console.log(payload);
  mockedHandleFormvisibility();
});

jest.mock('../../services/film/api', () => ({
  useMakeNewFilmMutation: () => [
    mockedCreateFilm,
    { isLoading: mockedIsLoading(), isError: mockedIsError() },
  ],
  useUpdateFilmByIdMutation: () => [
    mockedUpdateFilm,
    { isLoading: mockedIsLoading(), isError: mockedIsError() },
  ],
}));

const mockedNewFilm = {
  title: 'Avengers',
  coverImg: 'http://url',
  plot: 'plot',
  nationOfProduction: 'usa',
  rating: 0.2,
  funFacts: 'none',
  filmGenre: [],
};
const mockedFilm = {
  ...mockedNewFilm,
  filmId: '123',
};

const mockedFilmToUpdate = jest.fn().mockReturnValue(undefined);
const mockedHandleFormvisibility = jest.fn();
const renderComponent = () =>
  render(
    <FilmForm
      handleFilmFormVisibility={mockedHandleFormvisibility}
      filmToUpdate={mockedFilmToUpdate()}
    />
  );

describe('FilmForm', () => {
  test('component renders correctly for create', () => {
    const { getByText, getByPlaceholderText } = renderComponent();

    expect(getByText('Create')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();
    expect(getByPlaceholderText('url')).toBeInTheDocument();
    expect(getByPlaceholderText('title')).toBeInTheDocument();
    expect(getByPlaceholderText('nation of production')).toBeInTheDocument();
    expect(getByPlaceholderText('plot')).toBeInTheDocument();
    expect(getByPlaceholderText('rating (0-5)')).toBeInTheDocument();
    expect(getByPlaceholderText("film' fun facts")).toBeInTheDocument();
  });
  test('component renders correctly for edit', async () => {
    mockedFilmToUpdate.mockReturnValueOnce(mockedFilm);
    const { getByText, getByPlaceholderText } = renderComponent();

    await waitFor(() => {
      expect(getByText('Edit')).toBeInTheDocument();
      expect(getByText('Close')).toBeInTheDocument();
      expect(getByPlaceholderText('url')).toBeInTheDocument();
      expect(getByPlaceholderText('title')).toBeInTheDocument();
      expect(getByPlaceholderText('nation of production')).toBeInTheDocument();
      expect(getByPlaceholderText('plot')).toBeInTheDocument();
      expect(getByPlaceholderText('rating (0-5)')).toBeInTheDocument();
      expect(getByPlaceholderText("film' fun facts")).toBeInTheDocument();
    });
  });

  test('loader renders while loading is true', () => {
    mockedIsLoading.mockReturnValueOnce(true);

    const { getByTestId } = renderComponent();

    expect(getByTestId('loader')).toBeInTheDocument();
  });
  test('error renders if isError is true', () => {
    mockedIsError.mockReturnValueOnce(true);

    const { getByText } = renderComponent();

    expect(getByText('An error occured')).toBeInTheDocument();
  });

  test('OnSubmit function for a new film', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    fireEvent.change(getByPlaceholderText('url'), {
      target: { value: 'http://url' },
    });
    fireEvent.change(getByPlaceholderText('title'), {
      target: { value: 'Avengers' },
    });
    fireEvent.change(getByPlaceholderText('nation of production'), {
      target: { value: 'usa' },
    });
    fireEvent.change(getByPlaceholderText('plot'), {
      target: { value: 'plot' },
    });
    fireEvent.change(getByPlaceholderText('rating (0-5)'), {
      target: { value: 0.2 },
    });
    fireEvent.change(getByPlaceholderText("film' fun facts"), {
      target: { value: 'none' },
    });

    fireEvent.submit(getByText('Create'));

    mockedCreateFilm.mockReturnValueOnce({
      unwrap: mockedUnwrap.mockResolvedValue({
        then: mockedThen,
      }),
    });

    await waitFor(() => {
      expect(mockedCreateFilm).toHaveBeenCalledWith(mockedNewFilm);
      expect(mockedHandleFormvisibility).toHaveBeenCalled();
    });
  });
  test('OnSubmit function for a film to update', async () => {
    mockedFilmToUpdate.mockReturnValueOnce(mockedFilm);
    const { getByPlaceholderText, getByText } = renderComponent();

    fireEvent.change(getByPlaceholderText('url'), {
      target: { value: 'http://url' },
    });
    fireEvent.change(getByPlaceholderText('title'), {
      target: { value: 'Avengers' },
    });
    fireEvent.change(getByPlaceholderText('rating (0-5)'), {
      target: { value: 0.2 },
    });
    fireEvent.change(getByPlaceholderText("film' fun facts"), {
      target: { value: 'none' },
    });

    fireEvent.submit(getByText('Edit'));

    mockedUpdateFilm.mockReturnValueOnce({
      unwrap: mockedUnwrap.mockResolvedValue({
        then: mockedThen,
      }),
    });

    await waitFor(() => {
      expect(mockedUpdateFilm).toHaveBeenCalledWith({
        body: mockedNewFilm,
        id: '123',
      });
      expect(mockedHandleFormvisibility).toHaveBeenCalled();
    });
  });
  test('OnSubmit function renders single fiels error', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    fireEvent.change(getByPlaceholderText('rating (0-5)'), {
      target: { value: 7 },
    });

    fireEvent.submit(getByText('Create'));

    await waitFor(() => {
      expect(getByText('Insert a valid url')).toBeInTheDocument();
      expect(getByText('film title is mandatory')).toBeInTheDocument();
      expect(
        getByText('nation of production is mandatory')
      ).toBeInTheDocument();
      expect(getByText('plot is mandatory')).toBeInTheDocument();
      expect(getByText('rating must be between 0 and 5')).toBeInTheDocument();
    });
  });
});
