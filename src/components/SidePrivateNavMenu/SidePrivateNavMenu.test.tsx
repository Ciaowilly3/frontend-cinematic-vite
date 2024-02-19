import { render } from '@testing-library/react';
import SidePrivateNavMenu from '.';
import { MemoryRouter } from 'react-router';
// import { PathsEnum } from '../../enums/PathsEnum';

const renderComponent = () =>
  render(
    <MemoryRouter>
      <SidePrivateNavMenu />
    </MemoryRouter>
  );

describe('SidePrivateNavMenu', () => {
  test('renders component correctly', () => {
    const { getByText } = renderComponent();

    expect(getByText('Private nav links')).toBeInTheDocument();
    expect(getByText('Films')).toBeInTheDocument();
    expect(getByText('Private')).toBeInTheDocument();
    expect(getByText('Actors')).toBeInTheDocument();
  });
});
