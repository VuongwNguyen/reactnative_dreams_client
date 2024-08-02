import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export const registerSchema = () => {
  const { t } = useTranslation();
  return Yup.object().shape({
    firstName: Yup.string()
      .required(t('register.error.firstName.required')),
    lastName: Yup.string()
      .required(t('register.error.lastName.required')),
    email: Yup.string()
      .email(t('register.error.email.invalid'))
      .required(t('register.error.email.required')),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, t('register.error.phoneNumber.invalid'))
      .required(t('register.error.phoneNumber.required')),
    password: Yup.string()
      .min(8, t('register.error.password.minLength'))
      .required(t('register.error.password.required')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('register.error.confirmPassword.invalid'))
      .required(t('register.error.confirmPassword.required')),
  });
}