import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/Auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hooks', () => {
  it('should be able to signIn', async () => {
    apiMock.onPost('sessions').reply(200, {
      user: {
        id: 'user123',
        name: 'gui',
        email: 'guilherme@guintoki.com',
      },
      token: 'token123',
    });

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'guilherme@guintoki.com',
      password: '1234561',
    });

    await waitForNextUpdate();

    expect(result.current.user.email).toEqual('guilherme@guintoki.com');
  });
});
