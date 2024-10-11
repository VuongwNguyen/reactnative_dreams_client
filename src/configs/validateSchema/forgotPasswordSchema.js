import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';

export const forgotPasswordSchema = () => {
  const {t} = useTranslation();
  return Yup.object().shape({
    emailAddress: Yup.string()
      .email(t('forgotPasswordScreen.errorText.invalidEmail'))
      .required(t('forgotPasswordScreen.errorText.required')),
  });
};
