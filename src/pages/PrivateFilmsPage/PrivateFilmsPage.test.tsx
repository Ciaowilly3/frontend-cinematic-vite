import { render, waitFor } from '@testing-library/react';
import PrivateFilmPage from './PrivateFilmsPage';
import { useRetrieveAllFilmsQuery } from '../../services/film/api';

jest.mock('../../components/GenreInput');
jest.mock('../../services/film/api');

const mockedUseRetrieveAllFilmsQuery = jest.mocked(useRetrieveAllFilmsQuery);

const renderComponent = () => render(<PrivateFilmPage />);

describe('PrivateFilmPage', () => {
  test('should render', () => {
    mockedUseRetrieveAllFilmsQuery.mockReturnValue({} as never);
    const view = renderComponent();

    expect(view).toMatchSnapshot();
  });
  test('should display error when query fails', async () => {
    mockedUseRetrieveAllFilmsQuery.mockReturnValue({
      isError: true,
    } as never);
    const { getByText } = renderComponent();

    await waitFor(() => {
      expect(getByText('ERROR')).toBeInTheDocument();
    });
  });
});
