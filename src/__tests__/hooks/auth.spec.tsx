import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/Auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hooks', () => {
  it('should be able to signIn', async () => {
    const apiResponse = {
      user: {
        id: 'user123',
        name: 'gui',
        email: 'guilherme@guintoki.com',
      },
      token: 'token123',
    };
    apiMock.onPost('sessions').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'guilherme@guintoki.com',
      password: '1234561',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:token',
      apiResponse.token,
    );
    expect(setItemSpy).toHaveBeenCalledWith(
      '@Gobarber:user',
      JSON.stringify(apiResponse.user),
    );

    expect(result.current.user.email).toEqual('guilherme@guintoki.com');
  });
});
