import { constants } from '@/app/_lib/constants'
import { authFetch } from '@/app/_lib/authFetch'
import type { AuthRegisterDto } from '@/app/_lib/types';

const API_BASE_URL = constants.API_BASE_URL;
const API_AUTH_URL = API_BASE_URL + constants.REQUEST_PATH.AUTH;

export const login = async (formData: FormData) => {
  const emailOrUsername = formData.get('emailOrUsername');
  const password = formData.get('password');

  const res = await fetch(`${API_AUTH_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emailOrUsername, password }),
    credentials: 'include',
  });

  const accessToken = res.headers.get(constants.HTTP_HEADER.AUTHORIZATION);
  const json = await res.json();

  return { accessToken, data: json };
};

export const logout = async () => {
  const res = await authFetch(`${API_AUTH_URL}/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  });

  const json = await res.json();
  return json;
};

export const refresh = async () => {
  const res = await authFetch(`${API_AUTH_URL}/refresh`);

  const accessToken = res.headers.get(constants.HTTP_HEADER.AUTHORIZATION);
  const json = await res.json();

  return { accessToken, data: json };
}

export const register = async (payload: AuthRegisterDto) => {
  const res = await fetch(`${API_AUTH_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include',
  });

  const accessToken = res.headers.get(constants.HTTP_HEADER.AUTHORIZATION);
  const json = await res.json();

  return { accessToken, data: json };
};