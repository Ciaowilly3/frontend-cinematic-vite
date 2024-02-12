import { fireEvent, render } from '@testing-library/react';
import GenreInputText from './GenreInputText';

const onChangeFunction = jest.fn();

const renderComponent = () => {
  return render(<GenreInputText onChangeFunction={onChangeFunction} />);
};

describe('GenreInputText', () => {
  test('renders the input', () => {
    const { getByPlaceholderText } = renderComponent();
    expect(getByPlaceholderText('genre')).toBeInTheDocument();
  });
  test('method onChange is called', () => {
    const { getByPlaceholderText } = renderComponent();
    const input = getByPlaceholderText('genre');

    fireEvent.change(input, { target: { value: 'action' } });
    expect(onChangeFunction).toHaveBeenCalled();
  });
});
