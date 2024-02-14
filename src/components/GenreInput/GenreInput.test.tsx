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
    mockedUseMakeGenreMutation.mockReturnValue([mockedMakeNewGenre] as never);
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
  test('testing onChange Function', () => {
    const { getByPlaceholderText } = renderComponent();
    const inputElement = getByPlaceholderText('genre') as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'Action' } });

    expect(inputElement.value).toBe('Action');
  });
  test('testing handleSubmit function', async () => {
    const { getByPlaceholderText, getByText } = renderComponent();
    const inputElement = getByPlaceholderText('genre');
    const submitElement = getByText('create genre');

    fireEvent.change(inputElement, { target: { value: 'Action' } });
    fireEvent.submit(submitElement);

    await waitFor(() => {});
    expect(mockedMakeNewGenre).toHaveBeenCalledWith({ genreName: 'Action' });
  });
});
