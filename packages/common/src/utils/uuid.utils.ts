import { v4 as uuid, validate } from 'uuid';

export const generateUUID = (): string => {
  return uuid();
};

export const isUUID = (id: any): boolean => validate(id);
