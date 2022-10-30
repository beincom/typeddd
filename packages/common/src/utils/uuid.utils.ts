import { v4 as uuid, validate } from 'uuid';

/**
 * Generate uuid v4.
 */
export const generateUUID = (): string => {
  return uuid();
};

/**
 * Check if input is uuid v4
 * @param input
 */
export const isUUID = (input: any): boolean => validate(input);
