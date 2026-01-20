import { revalidateTag } from "next/cache";
import {
  BASE_URL,
  DEFAULT_REVALIDATE_TIME,
  getHeaders,
  AuthResponse,
  NationalRegistry,
  Patient,
  PatientType,
  ListedClinic,
} from ".";
import { throwOnNotOk } from "../throwOnNotOk";

export const lookupPerson = (auth: AuthResponse, personalNumber: string) => {
  return fetch(`${BASE_URL}/v1/nationalRegistry/${personalNumber}`, {
    headers: getHeaders(auth),
    next: { revalidate: DEFAULT_REVALIDATE_TIME * 10 }, // extra long time because this doesn't change very often
  }).then(throwOnNotOk<NationalRegistry>);
};

export const getPatients = (auth: AuthResponse) => {
  return fetch(`${BASE_URL}/v2/patients`, {
    headers: getHeaders(auth),
    next: { revalidate: DEFAULT_REVALIDATE_TIME, tags: ["patients"] },
  }).then(throwOnNotOk<Patient[]>);
};

export const getPatient = (auth: AuthResponse, personalNumber: string) => {
  return fetch(`${BASE_URL}/v2/patients`, {
    headers: getHeaders(auth, { personalNumber }),
    next: { revalidate: DEFAULT_REVALIDATE_TIME, tags: ["patients"] },
  }).then(throwOnNotOk<Patient[]>);
};

export const getPatientTypes = (auth: AuthResponse) => {
  return fetch(`${BASE_URL}/v1/patientTypes`, {
    headers: getHeaders(auth),
    next: { revalidate: DEFAULT_REVALIDATE_TIME },
  }).then(throwOnNotOk<PatientType>);
};

export const createPatient = (
  auth: AuthResponse,
  personalNumber: string,
  patientType: string,
  listInfo: ListedClinic,
  email: string,
  mobileNumber: string
) => {
  return fetch(`${BASE_URL}/v1/patients`, {
    headers: getHeaders(auth),
    method: "POST",
    body: JSON.stringify({
      personalNumber,
      patientType,
      listInfo,
      email,
      mobileNumber,
    }),
  })
    .then(throwOnNotOk<Patient[]>)
    .then(([patient]) => patient)
    .finally(() => revalidateTag("patients"));
};

export const getOrCreatePatient = async (
  auth: AuthResponse,
  personalNumber: string,
  patientType: string,
  listInfo: ListedClinic,
  email: string,
  mobileNumber: string
) => {
  const [existingPatient] = await getPatient(auth, personalNumber);
  if (existingPatient) return existingPatient;
  const person = await lookupPerson(auth, personalNumber);
  if (!person) throw new Error("Invalid personal number"); // TODO: custom error with codes for this stuff?
  const newPatient = await createPatient(
    auth,
    personalNumber,
    patientType,
    listInfo,
    email,
    mobileNumber
  );
  return newPatient;
};
