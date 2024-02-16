import { fireEvent, render, waitFor } from '@testing-library/react';
import { useMakeNewGenreMutation } from '../../services/genre/api';
import GenreInput from '.';

jest.mock('../../services/genre/api');
const mockedUseMakeGenreMutation = jest.mocked(useMakeNewGenreMutation);
const mockedMakeNewGenre = jest.fn();
const mockedUnwrap = jest.fn();
const mockedThen = jest.fn();
const mockedCatch = jest.fn();

const renderComponent = () => render(<GenreInput />);

describe('GenreInput', () => {
  beforeEach(() => {
    mockedUseMakeGenreMutation.mockReturnValue([
      mockedMakeNewGenre,
      { isLoading: false, isError: false },
    ] as never);
    mockedMakeNewGenre.mockReturnValue({
      unwrap: mockedUnwrap.mockReturnValue({
        then: mockedThen.mockRejectedValue({ catch: mockedCatch }),
      }),
    });
  });
  test('renders genreInput component', () => {
    const { getByText, getByPlaceholderText } = renderComponent();
    expect(getByText('create genre')).toBeInTheDocument();
    expect(getByPlaceholderText('genre')).toBeInTheDocument();
  });
  test('test if loader renders correctly', async () => {
    const { getByTestId, getByText, getByPlaceholderText } = renderComponent();

    fireEvent.change(getByPlaceholderText('genre'), {
      target: { value: 'Action' },
    });

    fireEvent.submit(getByText('create genre'));

    mockedUseMakeGenreMutation.mockReturnValueOnce([
      { isLoading: true },
    ] as never);
    await waitFor(() => {
      expect(getByTestId('loader')).toBeInTheDocument();
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
