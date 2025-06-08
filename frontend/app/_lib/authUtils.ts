import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  scope: string[];
  preferred_username: string;
  email: string;
  sub: string;
  exp: number;
};

export const getDecodedToken = (token: string | null): JwtPayload | null => {
  if (!token) return null;
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (e) {
    console.error("Ongeldige JWT:", e);
    return null;
  }
};

export const hasScope = (token: string | null, scope: string): boolean => {
  const decoded = getDecodedToken(token);
  return decoded?.scope.includes(scope) || false;
};

export const hasAnyScope = (token: string | null, scopes: string[]): boolean => {
  const decoded = getDecodedToken(token);
  if (!decoded) return false;
  return scopes.some(s => decoded.scope.includes(s));
};

export const hasAllScopes = (token: string | null, scopes: string[]): boolean => {
  const decoded = getDecodedToken(token);
  if (!decoded) return false;
  return scopes.every(s => decoded.scope.includes(s));
};

// get the sub from the token
export const getSub = (token: string | null): string | null => {
  const decoded = getDecodedToken(token);
  return decoded?.sub || null;
};

export function getTokenExpiry(token: string): number | null {
  const decoded = getDecodedToken(token);
  if (decoded) return decoded.exp * 1000;
  return null;
}

export function isTokenExpired(token: string, offsetMs = 60000): boolean {
  const expiry = getTokenExpiry(token);
  if (!expiry) return true;
  return Date.now() > expiry - offsetMs; // offset: refresh 1 min before expiry
};