import authTokenSlice, {
  authTokenState,
  memorizeWebToken,
  deleteWebToken,
} from './authTokenSlice';

describe('authTokenSlice', () => {
  it('should handle memorizeWebToken', () => {
    const initialState: authTokenState = {
      token: '',
      expirationDate: '',
    };

    const nextState = authTokenSlice.reducer(
      initialState,
      memorizeWebToken('your-token-here')
    );

    expect(nextState).toEqual({
      token: 'your-token-here',
      expirationDate: expect.any(String),
    });
  });

  it('should handle deleteWebToken', () => {
    const currentState: authTokenState = {
      token: 'your-token-here',
      expirationDate: 'some-expiration-date',
    };

    const nextState = authTokenSlice.reducer(currentState, deleteWebToken());

    expect(nextState).toEqual({
      token: '',
      expirationDate: '',
    });
  });
});
