import { constants } from "./constants";

export const authFetch = async (
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> => {
  const token = sessionStorage.getItem(constants.ACCESS_TOKEN);

  if (!token) throw new Error("Geen access token gevonden");

  const headers = new Headers(init.headers || {});
  headers.set("Authorization", `${constants.ACCESS_TOKEN_PREFIX}${token}`);
  headers.set("Content-Type", "application/json");

  return fetch(input, {
    ...init,
    headers,
    credentials: "include", // indien je cookies gebruikt
  });
};