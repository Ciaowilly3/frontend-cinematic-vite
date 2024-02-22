import { render } from '@testing-library/react';
import PrivateMainLayout from '.';

const mockedChildren = <div>Children</div>;
jest.mock('../../components/SidePrivateNavMenu', () =>
  jest.fn().mockReturnValue(<div>Nav</div>)
);

const renderComponent = () =>
  render(<PrivateMainLayout children={mockedChildren} />);

describe('PrivateMainLayout', () => {
  test('layout renders correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText('Children')).toBeInTheDocument();
    expect(getByText('Nav')).toBeInTheDocument();
  });
});
