export type Token = {
  _id: string;
  token_id: string;
  token_name: string;
  issued_at: Date;
  expires_at: Date;
  is_active: boolean;
  createdAt: Date;
  updatedAt?: Date;
};

export type Set = {
  _id: string;
  name: string;
  description?: string;
  created: Date;
  updated?: Date;
  setValuesCount?: number;
};

export type SetValue = {
  _id: string;
  setId: string;
  value: string;
  created: Date;
  updated?: Date;
};

export type Lookup = {
  _id: string;
  name: string;
  description?: string;
  leftSystem: string;
  rightSystem: string;
  created: Date;
  updated?: Date;
  lookupValuesCount?: number;
};

export type LookupValue = {
  _id: string;
  lookupId: string;
  left: string;
  right: string;
  created: Date;
  updated?: Date;
};

export type ApiData<T> = {
  data: T;
  error?: string;
  message?: string;
};

export type LastUpdate = {
  lastUpdateDate: Date;
};
