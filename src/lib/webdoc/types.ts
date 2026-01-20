export interface AuthResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface Clinic {
  id: string;
  name: string;
  hsaId: string;
  companyHsaId: string;
  organisationNumber: string;
  address: string;
  postNumber: string;
  postAddress: string;
  invoiceInfo: InvoiceInfo;
}

export interface InvoiceInfo {
  companyName: string;
  organisationNumber: string;
  companyTelephone: string;
  companyAddress: string;
  companyPost: string;
  companyPostArea: string;
  bankGiro: string;
  postGiro: string;
}

export interface BookingType {
  id: number | string;
  name: string;
  externallyVisibleName: string;
  backgroundColor: string;
  textColor: string;
  hasSelfService: boolean;
  recordType?: RecordType;
  actionCode?: ActionCode;
  priceLevels: PriceLevel[];
}

export interface ActionCode {
  id: number;
  name?: string;
}

export interface PriceLevel {
  id: number;
  name: string;
  priceListed: number;
  priceUnlisted: number;
  priceNormal: number;
  priceReduced: number;
}

export interface RecordType {
  latestId: number;
  name: string;
}

export interface Booking {
  id: string;
  clinicId: string;
  date: string;
  startTime: string;
  endTime: string;
  arrived: number;
  actionCodes: ActionCode[];
  bookingDescription: string;
  bookingType: string;
  bookedPatientType: string;
  injuryNumber: string;
  payments: Payment[];
  patient: BookingPatient;
  caregiver: Caregiver;
}

export interface Caregiver {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  identifier: string;
}

export interface BookingPatient {
  isListed: boolean;
  personalNumber: string;
  firstName: string;
  lastName: string;
  patientType: string;
  address: Address;
  mobilePhone: string;
  listing: ListedClinic;
  freeCard: FreeCard;
}

export interface Address {
  streetName: string;
  city: string;
  zipCode: string;
}

export interface FreeCard {
  cardNumber: string;
  validFrom: string;
  validUntil?: string;
  amountToLimit: number;
}

export interface ListedClinic {
  name?: string;
  hsaId: string;
  countyName?: string;
}

export interface Payment {
  price: number;
  amount: number;
  comment: string;
  account: string;
  VATPercentage: number;
  VAT: number;
  expiryDate: string;
  freeByFreeCard: boolean;
  reducedByFreeCard: boolean;
  articleName: string;
}

export interface NationalRegistry {
  unRegisterCauseCode: null;
  firstName: string;
  lastName: string;
  spokenName: string;
  maritialStatus: string;
  coAddress: string;
  address: string;
  zipCode: string;
  city: string;
  stateCode: string;
  countyCode: string;
  parish: string;
  deceased: string;
}

export interface Patient {
  id: string;
  personalNumber: string;
  birthDate: string;
  gender: string;
  firstName: string;
  lastName: string;
  address: Address;
  nationality: string;
  email: string;
  mobilePhoneNumber: string;
  workPhoneNumber: string;
  homePhoneNumber: string;
  listedClinic: ListedClinic;
  interpreterNeeded: boolean;
  interpreterLanguage: string;
  organization: Organization;
  department: Organization | null;
  patientType: PatientType;
  county: County;
}

export interface Address {
  streetName: string;
  coAddress: string;
  city: string;
  zipCode: string;
}

export interface County {
  code: string;
}

export interface Organization {
  id: string;
  name: string;
}

export interface PatientType {
  id: string;
  name: string;
  type: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  personalNumber: string;
  hsaId: string;
  email: string;
  phoneNumber: string;
  lastLoggedIn: string;
  settings: UserSettings;
}

export interface UserSettings {
  defaultCostCentreId: string;
  defaultRecordTemplateId?: string;
  defaultPatientTypeId?: string;
}

export interface ActionCode {
  id: number;
  articleNo?: string;
  codeName: string;
  codeDescription: string;
  account: number;
  fee: string;
  compensation: string;
  active: number;
}
