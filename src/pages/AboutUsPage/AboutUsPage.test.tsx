import { render } from '@testing-library/react';
import AboutUsPage from '.';

const renderComponent = () => render(<AboutUsPage />);

describe('AboutUsPage', () => {
  test('page renders correctly', () => {
    const { getByText } = renderComponent();
    expect(getByText('AboutUsPage')).toBeInTheDocument();
  });
});
