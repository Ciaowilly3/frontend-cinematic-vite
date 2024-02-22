import { retrieveAllCinema } from './endpoints';
import { customBuilder } from '../cinema/endpoints';

const mockedBuilder: customBuilder = {
  query: jest.fn().mockImplementation((config) => config),
  mutation: jest.fn().mockImplementation((config) => config),
};
describe('cinema endpoints', () => {
  test('builds the right query endpoint', () => {
    const result = retrieveAllCinema(mockedBuilder);

    expect(result.query?.()).toStrictEqual('cinema');
  });
});
