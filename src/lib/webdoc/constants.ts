export const TOKEN_REVALIDATE_TIME = 3500;
export const DEFAULT_REVALIDATE_TIME = 600;
export const BASE_URL = process.env.WEBDOC_BASE_URL as string;
export const AUTH_URL = process.env.WEBDOC_AUTH_URL as string;
export const USERNAME = process.env.WEBDOC_USERNAME as string;
export const PASSWORD = process.env.WEBDOC_PASSWORD as string;
export const USER_UUID = process.env.WEBDOC_USER_UUID as string;

if (!AUTH_URL) throw new Error("Missing environment variable: WEBDOC_AUTH_URL");
if (!BASE_URL) throw new Error("Missing environment variable: WEBDOC_BASE_URL");
if (!USERNAME) throw new Error("Missing environment variable: WEBDOC_USERNAME");
if (!PASSWORD) throw new Error("Missing environment variable: WEBDOC_PASSWORD");
if (!USER_UUID)
  throw new Error("Missing environment variable: WEBDOC_USER_UUID");
