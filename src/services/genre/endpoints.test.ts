import { HTTP } from '../../enums/HttpMethodsEnum';
import { customBuilder, makeNewGenre, retrieveAllGenres } from './endpoints';

const mockedBuilder: customBuilder = {
  query: jest.fn().mockImplementation((config) => config),
  mutation: jest.fn().mockImplementation((config) => config),
};

const mockedGenre = {
  genreName: 'action',
};
describe('genreEndpoints', () => {
  test('retrieve all genres query', () => {
    const result = retrieveAllGenres(mockedBuilder);

    expect(result.query?.()).toStrictEqual({ url: 'genres', method: 'GET' });
    expect(result.providesTags).toStrictEqual(['genres']);
  });
  test('make new genre  mutation', () => {
    const result = makeNewGenre(mockedBuilder);

    expect(result.query?.(mockedGenre)).toStrictEqual({
      url: 'genres/private/make-genre',
      method: HTTP.POST,
      body: mockedGenre,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    expect(result.invalidatesTags).toStrictEqual(['genres']);
  });
});
