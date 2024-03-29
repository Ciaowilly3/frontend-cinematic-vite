import { fireEvent, render, screen } from '@testing-library/react';
import PrimaryLink from '.';
import { PathsEnum } from '../../enums/PathsEnum';
import { MemoryRouter } from 'react-router';

const renderPrimaryLink = (path: Partial<Location>) => {
  render(
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
  test('expects that onClick link redirects to the path page', () => {
    renderPrimaryLink({ pathname: PathsEnum.ABOUT_US });

    fireEvent.click(screen.getByText('Link'));

    expect(location.pathname).toBe(PathsEnum.ABOUT_US);
  });
});
