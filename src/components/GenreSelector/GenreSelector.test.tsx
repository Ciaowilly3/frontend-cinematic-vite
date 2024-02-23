import { fireEvent, render, waitFor } from '@testing-library/react';
import GenreSelector from '.';

const mockedGenreSelectorProps = {
  onGenresChange: jest.fn((genre) => mockedGenreProp.mockReturnValue(genre)),
};

const mockedGenresData = [
  { genreId: 1, genreName: 'Action' },
  { genreId: 2, genreName: 'Comedy' },
  { genreId: 3, genreName: 'Drama' },
];

const mockedIsFetching = jest.fn().mockReturnValue(false);
const mockedIsError = jest.fn().mockReturnValue(false);
jest.mock('../../services/genre/api', () => ({
  useRetrieveAllGenresQuery: () => ({
    isFetching: mockedIsFetching(),
    data: mockedGenresData,
    isError: mockedIsError(),
  }),
}));

const mockedGenreProp = jest.fn().mockReturnValue([]);

const renderComponent = () => {
  return render(
    <GenreSelector
      onGenresChange={mockedGenreSelectorProps.onGenresChange}
      genresProp={mockedGenreProp()}
    />
  );
};

describe('GenreSelector', () => {
  test('renders checkboxes for any genre', async () => {
    const { getByLabelText } = renderComponent();

    mockedGenresData.forEach(async ({ genreName }) => {
      await waitFor(() => {
        expect(getByLabelText(genreName)).toBeInTheDocument();
      });
    });
  });

  test('renders the loader while loading', () => {
    mockedIsFetching.mockReturnValueOnce(true);

    const { getByTestId } = renderComponent();

    expect(getByTestId('loader')).toBeInTheDocument();
  });

  test('renders error if there is an error', () => {
    mockedIsError.mockReturnValueOnce(true);

    const { getByText } = renderComponent();

    expect(
      getByText('An error occured in genres fetching')
    ).toBeInTheDocument();
  });

  test('checking onChange function for check and uncheck event', async () => {
    const genre = mockedGenresData[0];
    const { getByLabelText } = renderComponent();

    const checkbox = getByLabelText(genre.genreName);

    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(mockedGenreSelectorProps.onGenresChange).toHaveBeenCalledWith([
        { genre: { genreName: genre.genreName } },
      ]);
      expect(mockedGenreProp()).toStrictEqual([
        { genre: { genreName: genre.genreName } },
      ]);
    });
    fireEvent.click(checkbox);
    await waitFor(() => {
      expect(mockedGenreSelectorProps.onGenresChange).toHaveBeenCalledWith([]);
      expect(mockedGenreProp()).toStrictEqual([]);
    });
  });
});
