import { HTTP } from '../../../enums/HttpMethodsEnum';
import { customBuilder, login, register } from './endpoints';

const mockedBuilder: customBuilder = {
  query: jest.fn().mockImplementation((config) => config),
  mutation: jest.fn().mockImplementation((config) => config),
};

const mockedUser = {
  userName: 'Marco',
  password: 'password',
};
const mockedSigninUser = {
  ...mockedUser,
  email: 'Marco@mail.it',
  confirmPassword: 'password',
  role: 'ROLE_USER',
  cinemaId: 1,
};
describe('AuthEndpoints', () => {
  test('login mutation', () => {
    const result = login(mockedBuilder);

    expect(result.query?.(mockedUser)).toStrictEqual({
      url: 'authenticate',
      method: HTTP.POST,
      body: mockedUser,
    });
  });
  test('make new User  mutation', () => {
    const result = register(mockedBuilder);

    expect(result.query?.(mockedSigninUser)).toStrictEqual({
      url: 'register',
      method: HTTP.POST,
      body: mockedSigninUser,
    });
  });
});
