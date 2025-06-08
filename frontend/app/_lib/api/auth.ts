import { constants } from '@/app/_lib/constants'
import { authFetch } from '@/app/_lib/authFetch'

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

export const register = async (formData: FormData) => {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const dateOfBirth = formData.get('dateOfBirth'); // Assuming dob is a string in 'YYYY-MM-DD' format
  const gender = formData.get('gender');
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  const res = await fetch(`${API_AUTH_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, dateOfBirth, gender, username, email, password }),
    credentials: 'include',
  });

  const accessToken = res.headers.get(constants.HTTP_HEADER.AUTHORIZATION);
  const json = await res.json();

  return { accessToken, data: json };
};