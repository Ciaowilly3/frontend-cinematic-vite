import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PrimaryLink from '.';
import { PathsEnum } from '../../enums/PathsEnum';
import { MemoryRouter } from 'react-router';

const renderPrimaryLink = (path: Partial<Location>) => {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <PrimaryLink path={PathsEnum.ABOUT_US} style={[]} content={'link'} />
    </MemoryRouter>
  );
};

describe('tests for primaryLinks', () => {
  test('expects to find the content prop link" ', () => {
    renderPrimaryLink({ pathname: PathsEnum.ABOUT_US });
    expect(screen.getByText('Link')).toBeInTheDocument();
  });
  test('expects that onClick link redirects to the path page', async () => {
    const { getByText } = renderPrimaryLink({ pathname: PathsEnum.ABOUT_US });

    fireEvent.click(getByText('Link'));

    await waitFor(() => {
      expect(location.pathname).toBe(PathsEnum.ABOUT_US);
    });
  });
});
