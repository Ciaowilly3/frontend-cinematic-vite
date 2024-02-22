import { render } from '@testing-library/react';
import NotFoundPage from '.';

const renderComponent = () => render(<NotFoundPage />);

describe('NotFoundPage', () => {
  test('page renders correctly', () => {
    const { getByText, getByAltText } = renderComponent();

    expect(
      getByText("Ooops, It Looks Like there's Nothing here!")
    ).toBeInTheDocument();
    expect(getByAltText('not-found')).toBeInTheDocument();
  });
});
