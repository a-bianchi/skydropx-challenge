export enum Status {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR',
}

export type CreateImportError = {
  importId: string;
  line: number;
  error: string;
};

export type CreateAddress = {
  id?: number;
  name: string;
  email: string;
  street: string;
  city: string;
  province: string;
  postalCode: number;
  countryCode: string;
};

export type CreateShipment = {
  id?: number;
  addressFromId: number;
  addressToId: number;
};

export type CreateParcel = {
  id?: number;
  shipmentId?: number;
  length: number;
  width: number;
  height: number;
  dimensionsUnit: string;
  weight: number;
  weightUnit: string;
};

export type CreateOrder = {
  id?: number;
  shipmentId?: number;
  reference: string;
};

export type ConvertOrder = {
  addressTo: CreateAddress;
  addressFrom: CreateAddress;
  parcel: CreateParcel;
  order: CreateOrder;
};

export type MessageDetails = {
  path: string;
  messages: string;
  value: string | number;
};

export type ErrorDetails = {
  lineNumber: number;
  error: MessageDetails;
};

export type SignParamsWithJWT = {
  userId: string;
};

export type DecodedAccessToken = {
  userId: string;
};
