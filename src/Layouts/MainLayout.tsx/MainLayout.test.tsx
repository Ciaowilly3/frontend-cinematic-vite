import { render } from '@testing-library/react';
import MainLayout from './MainLayout';

const mockedChildren = <div>Children</div>;
jest.mock('../../components/Header', () =>
  jest.fn().mockReturnValue(<div>Header</div>)
);

const renderComponent = () => render(<MainLayout children={mockedChildren} />);

describe('MainLayout', () => {
  test('Layout renders correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText('Header')).toBeInTheDocument();
    expect(getByText('Children')).toBeInTheDocument();
  });
});
