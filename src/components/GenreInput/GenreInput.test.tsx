import { fireEvent, render, waitFor } from '@testing-library/react';
import GenreInput from '.';

const mockedIsError = jest.fn().mockReturnValue(false);
const mockedIsLoading = jest.fn().mockReturnValue(false);
jest.mock('../../services/genre/api', () => ({
  useMakeNewGenreMutation: () => [
    mockedMakeNewGenre,
    { isError: mockedIsError(), isLoading: mockedIsLoading() },
  ],
}));
const mockedMakeNewGenre = jest.fn();

const renderComponent = () => render(<GenreInput />);

describe('GenreInput', () => {
  test('renders genreInput component', () => {
    const { getByText, getByPlaceholderText } = renderComponent();
    expect(getByText('create genre')).toBeInTheDocument();
    expect(getByPlaceholderText('genre')).toBeInTheDocument();
  });
  test('test if loader renders correctly', async () => {
    mockedIsLoading.mockReturnValueOnce(true);
    const { getByTestId } = renderComponent();

    await waitFor(() => {
      expect(getByTestId('loader')).toBeInTheDocument();
    });
  });
  test('test if error renders correctly', async () => {
    mockedIsError.mockReturnValueOnce(true);
    const { getByText } = renderComponent();

    await waitFor(() => {
      expect(
        getByText('an error occured please reload the page')
      ).toBeInTheDocument();
    });
  });
  test('testing onChange Function', async () => {
    const { getByPlaceholderText } = renderComponent();
    const inputElement = getByPlaceholderText('genre') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'Action' } });

    await waitFor(() => {
      expect(inputElement.value).toBe('Action');
    });
  });
  test('testing handleSubmit function', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();

    fireEvent.change(getByPlaceholderText('genre'), {
      target: { value: 'Action' },
    });
    fireEvent.submit(getByText('create genre'));

    await waitFor(() => {});
    expect(mockedMakeNewGenre).toHaveBeenCalledWith({ genreName: 'Action' });
  });
});
