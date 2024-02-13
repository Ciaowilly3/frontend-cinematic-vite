import { render } from '@testing-library/react';
import PublicFilmCard from '.';
import { filmMock } from '../../mocks/FilmMock';

const renderComponent = () => render(<PublicFilmCard film={filmMock} />);

describe('PublicFilmCard', () => {
  test('renders film card', () => {
    const { getByAltText } = renderComponent();

    expect(getByAltText(filmMock.title)).toBeInTheDocument();
  });
  // test('shows informations on hover', async () => {
  //   process.env.USE_REAL_STYLES = 'true';
  //   const { getByTestId } = renderComponent();

  //   const filmCard = getByTestId('film-card');
  //   const cardBack = getByTestId('card-back');
  //   const cardFront = getByTestId('card-front');
  //   const frontStyle = getComputedStyle(cardFront).opacity;
  //   console.log(cardBack.classList);
  //   expect(cardFront).toBeVisible();

  //   fireEvent.mouseEnter(filmCard);
  //   await waitFor(
  //     () => {
  //       expect(cardBack).toBeVisible();
  //       expect(frontStyle).toBe('1');
  //     },
  //     { timeout: 2000 }
  //   );
  // });
  // test('hides informations on no more hover', async () => {
  //   process.env.USE_REAL_STYLES = 'true';
  //   const { getByTestId } = renderComponent();

  //   const filmCard = getByTestId('film-card');
  //   const cardBack = getByTestId('card-back');

  //   await act(async () => {
  //     fireEvent.mouseEnter(filmCard);
  //     fireEvent.mouseLeave(filmCard);

  //     await waitFor(
  //       () => {
  //         console.log(window.getComputedStyle(cardBack));

  //         expect(
  //           window.getComputedStyle(cardBack).getPropertyValue('visibility')
  //         ).toBe('visible');
  //       },
  //       { timeout: 2000 }
  //     );
  //   });
  //   process.env.USE_REAL_STYLES = 'false';
  // });
});
