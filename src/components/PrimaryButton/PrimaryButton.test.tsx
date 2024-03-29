import { render, fireEvent } from '@testing-library/react';
import PrimaryButton from '.';
import { BtnStyles } from './PrimaryButton';

const style: BtnStyles = ['btnDanger'];

const mockedOnClick = jest.fn();

const btnProps = {
  onClickFunction: mockedOnClick,
  icon: undefined,
  content: 'contenuto',
  style: style,
  disable: false,
};
describe('PrimaryButton', () => {
  test('Button should be defined', () => {
    const { getByText } = render(<PrimaryButton {...btnProps} />);
    const btn = getByText('contenuto');
    expect(btn).toBeDefined();
  });
  test('Button should call the function when pressed', () => {
    const { getByText } = render(<PrimaryButton {...btnProps} />);
    fireEvent.click(getByText('contenuto'));
    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });
});

//TODO: creare funzione esterna che faccia il render
