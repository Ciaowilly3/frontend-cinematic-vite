import { render, screen } from '@testing-library/react';
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
});
