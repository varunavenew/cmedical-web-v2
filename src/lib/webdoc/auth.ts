import {
  PASSWORD,
  TOKEN_REVALIDATE_TIME,
  USERNAME,
  AuthResponse,
  AUTH_URL,
} from ".";
import { throwOnNotOk } from "../throwOnNotOk";

export const getHeaders = (
  auth: Pick<AuthResponse, "token_type" | "access_token">,
  extra?: Record<string, string>
) => ({
  "content-type": "application/json",
  ...extra,
  authorization: `${auth.token_type} ${auth.access_token}`,
});

export const getAccessToken = () => {
  const authBody = new FormData();
  authBody.set("grant_type", "client_credentials");
  authBody.set(
    "scope",
    "api organization:read clinics:read bookings:read bookings:write users:read patient:read patient:write patient-types:read actioncodes:read"
  );
  return fetch(AUTH_URL, {
    method: "POST",
    headers: {
      authorization: `Basic ${Buffer.from(USERNAME + ":" + PASSWORD).toString(
        "base64"
      )}`,
    },
    body: authBody,
    // we "know" the token expires after 3600s so let's use the same token until soon before that
    next: { revalidate: TOKEN_REVALIDATE_TIME },
  }).then(throwOnNotOk<AuthResponse>);
};
