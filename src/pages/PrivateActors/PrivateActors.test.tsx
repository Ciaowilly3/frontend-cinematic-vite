import { render } from '@testing-library/react';
import PrivateActors from '.';

const renderComponent = () => render(<PrivateActors />);

describe('PrivateActors', () => {
  test('page renders correctly', () => {
    const { getByText } = renderComponent();
    expect(getByText('PrivateActors')).toBeInTheDocument();
  });
});
