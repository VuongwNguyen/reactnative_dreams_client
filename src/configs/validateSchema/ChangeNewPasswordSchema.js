import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';

export const ChangeNewPasswordSchema = () => {
  const {t} = useTranslation();
  return Yup.object().shape({
    newPw: Yup.string()
      .min(6, t('changePwScreen.error.min'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        t('changePwScreen.error.invalid'),
      )
      .required(t('changePwScreen.error.required')),

    newPwConfirm: Yup.string()
      .oneOf([Yup.ref('newPw'), null], t('changePwScreen.error.notMatch'))
      .required(t('changePwScreen.error.required')),
  });
};
