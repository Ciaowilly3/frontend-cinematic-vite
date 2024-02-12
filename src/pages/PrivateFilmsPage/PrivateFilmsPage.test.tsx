import { render, waitFor } from '@testing-library/react';
import PrivateFilmPage from './PrivateFilmsPage';
import { useRetrieveAllFilmsQuery } from '../../services/film/api';

jest.mock('../../services/film/api');
const mockedUseRetrieveAllFilmsQuery = jest.mocked(useRetrieveAllFilmsQuery);

const renderComponent = () => render(<PrivateFilmPage />);

describe('PrivateFilmPage', () => {
  test('should display error when query fails', async () => {
    mockedUseRetrieveAllFilmsQuery.mockImplementationOnce(() => {
      throw new Error('Failed to fetch films');
    });
    const { getByText } = renderComponent();

    await waitFor(() => {
      expect(getByText('ERROR')).toBeInTheDocument();
    });
  });
});
