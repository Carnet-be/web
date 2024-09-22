import { z } from 'zod';

const stringRequired = z.string({
  message: 'Field required',
});

const stringMinMax = stringRequired
  .min(3, 'Too short, minimum 3 characters')
  .max(255, 'Too long');

const phoneNumber = stringRequired.refine(
  (value) => {
    if (!value) return true;

    return /^\+?[0-9]+$/.test(value);
  },
  { message: 'Invalid phone number format' },
);

const email = stringRequired.email('Invalid email address');

const password = stringRequired
  .min(6, 'Too short, minimum 6 characters')
  .max(255, 'Too long')
  .refine(
    (data) => {
      //no space
      return !data.includes(' ');
    },
    { message: 'Password must not contain spaces' },
  );

const numberRequired = z.coerce.number({
  message: 'Field required',
});

export default {
  stringRequired,
  stringMinMax,
  phoneNumber,
  email,
  password,
  numberRequired,
};
