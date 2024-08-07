import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';

export const loginSchema = () => {
  const {t} = useTranslation();
  return Yup.object().shape({
    emailOrPhoneNumber: Yup.string()
      .required(t('loginScreen.error.emailOrPhoneNumber.required'))
      .matches(
        /^(0\d{9,10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
        t('loginScreen.error.emailOrPhoneNumber.invalid'),
      ),
    password: Yup.string().required(t('loginScreen.error.password.required')),
  });
};
