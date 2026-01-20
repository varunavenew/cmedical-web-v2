import {
  ActionCode,
  AuthResponse,
  BASE_URL,
  DEFAULT_REVALIDATE_TIME,
  getHeaders,
} from ".";
import { throwOnNotOk } from "../throwOnNotOk";

export const getActionCodes = (auth: AuthResponse) => {
  return fetch(`${BASE_URL}/v1/actionCodes`, {
    headers: getHeaders(auth),
    next: { revalidate: DEFAULT_REVALIDATE_TIME },
  }).then(throwOnNotOk<ActionCode>);
};
