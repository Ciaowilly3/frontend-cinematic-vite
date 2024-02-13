import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInput from './FormInput';

const FormInputProps = {
  id: 'input',
  label: 'input',
  placeholder: 'input',
  type: 'text',
  style: [],
};

const renderComponent = () => {
  return render(
    <FormInput
      id={FormInputProps.id}
      label={FormInputProps.label}
      placeholder={FormInputProps.placeholder}
      style={FormInputProps.style}
      type={FormInputProps.type}
    />
  );
};
describe('FormInput', () => {
  test('renders input and label correctly', () => {
    const { getByLabelText, getByPlaceholderText } = renderComponent();

    expect(getByLabelText('input')).toBeInTheDocument();
    expect(getByPlaceholderText('input')).toBeInTheDocument();
  });

  test('tests  if user input is taken', () => {
    const { getByPlaceholderText } = renderComponent();

    const input = getByPlaceholderText('input');
    userEvent.type(input, 'Input Text');
    expect(input).toHaveValue('Input Text');
  });
});
