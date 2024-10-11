import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';

export const ChangePasswordSchema = () => {
  const {t} = useTranslation();
  return Yup.object().shape({
    currentPassword: Yup.string()
      .min(6, t('changePwScreen.error.min'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        t('changePwScreen.error.invalid'),
      )
      .required(t('changePwScreen.error.required')),

    newPassword: Yup.string()
      .min(6, t('changePwScreen.error.min'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        t('changePwScreen.error.invalid'),
      )
      .required(t('changePwScreen.error.required')),

    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], t('changePwScreen.error.notMatch'))
      .required(t('changePwScreen.error.required')),
  });
};
