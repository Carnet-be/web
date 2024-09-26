import i18next from 'i18next';
import { z } from 'zod';

const stringRequired = z.string({
  message: i18next.t('validation:fieldRequired'),
});

const stringMinMax = stringRequired
  .min(3, i18next.t('validation:tooShort', { min: 3 }))
  .max(255, i18next.t('validation:tooLong'));

const phoneNumber = stringRequired.refine(
  (value) => {
    if (!value) return true;
    return /^\+?[0-9]+$/.test(value);
  },
  { message: i18next.t('validation:invalidPhoneNumber') },
);

const email = stringRequired.email(i18next.t('validation:invalidEmail'));

const password = stringRequired
  .min(6, i18next.t('validation:tooShort', { min: 6 }))
  .max(255, i18next.t('validation:tooLong'))
  .refine(
    (data) => {
      return !data.includes(' ');
    },
    { message: i18next.t('validation:passwordNoSpaces') },
  );

const numberRequired = z.coerce.number({
  message: i18next.t('validation:fieldRequired'),
});

export default {
  stringRequired,
  stringMinMax,
  phoneNumber,
  email,
  password,
  numberRequired,
};
