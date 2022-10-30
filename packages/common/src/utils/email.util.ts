import validator from 'validator';

export const isEmail = (input: string) => {
  return validator.isEmail(input);
};
