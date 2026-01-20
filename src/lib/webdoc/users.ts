import {
  BASE_URL,
  DEFAULT_REVALIDATE_TIME,
  getHeaders,
  AuthResponse,
  User,
} from ".";
import { throwOnNotOk } from "../throwOnNotOk";

/** @deprecated Use env variable for user ID */
export const getUsers = (auth: AuthResponse) => {
  return fetch(`${BASE_URL}/v1/users`, {
    headers: getHeaders(auth),
    next: { revalidate: DEFAULT_REVALIDATE_TIME },
  }).then(throwOnNotOk<User[]>);
};
