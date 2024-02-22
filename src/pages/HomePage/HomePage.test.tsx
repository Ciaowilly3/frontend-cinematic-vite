import { render } from '@testing-library/react';
import HomePage from '.';

jest.mock('../../components/FilmsCarousel/FilmsCarousel', () =>
  jest.fn().mockReturnValue(<div>FilmsCarousel</div>)
);
jest.mock('../../components/PublicFilmCards', () =>
  jest.fn().mockReturnValue(<div>PublicFilmCards</div>)
);
const renderComponent = () => render(<HomePage />);

describe('HomePage', () => {
  test('page renders correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText('FilmsCarousel')).toBeInTheDocument();
    expect(getByText('PublicFilmCards')).toBeInTheDocument();
  });
});
