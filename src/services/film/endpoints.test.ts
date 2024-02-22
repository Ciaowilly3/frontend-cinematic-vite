import { HTTP } from '../../enums/HttpMethodsEnum';
import {
  retrieveAllFilms,
  makeNewFilm,
  updateFilmById,
  customBuilder,
  deleteFilmById,
} from './endpoints';

const mockedBuilder: customBuilder = {
  query: jest.fn().mockImplementation((config) => config),
  mutation: jest.fn().mockImplementation((config) => config),
};

const mockedFilm = {
  title: 'Avengers',
  filmId: '123',
  coverImg: 'cover',
  plot: 'plot',
  nationOfProduction: 'usa',
  rating: 0.2,
  funFacts: 'none',
  filmGenre: [],
};
describe('FilmEndpoints', () => {
  test('retrieve all films query', () => {
    const result = retrieveAllFilms(mockedBuilder);

    expect(result.query?.()).toStrictEqual({ url: 'films', method: 'GET' });
    expect(result.providesTags).toStrictEqual(['films']);
  });
  test('make new film  mutation', () => {
    const result = makeNewFilm(mockedBuilder);

    expect(result.query?.(mockedFilm)).toStrictEqual({
      url: 'films/private',
      method: HTTP.POST,
      body: mockedFilm,
    });
    expect(result.invalidatesTags).toStrictEqual(['films']);
  });
  test('update  film by id mutation', () => {
    const result = updateFilmById(mockedBuilder);

    expect(result.query?.({ id: '12', body: mockedFilm })).toStrictEqual({
      url: 'films/private/update-film/12',
      method: HTTP.PUT,
      body: mockedFilm,
    });
    expect(result.invalidatesTags).toStrictEqual(['films']);
  });
  test('delete film by id mutation', () => {
    const result = deleteFilmById(mockedBuilder);

    expect(result.query?.('12')).toStrictEqual({
      url: 'films/delete-film/12',
      method: HTTP.DELETE,
    });
    expect(result.invalidatesTags).toStrictEqual(['films']);
  });
});
