import React from 'react';
import {Text, View} from 'react-native';
import {changePasswordStyle} from '../../styles/changepassword/ChangePasswordStyle';
import AppInput from '../../components/Input';
import AppButton from '../../components/Button';
import {useTranslation} from 'react-i18next';
import {useFormikH} from '../../configs/hooks/useFormikH';
import {ChangeNewPasswordSchema} from '../../configs/validateSchema/ChangeNewPasswordSchema';
const FormikForm = () => {
  const {t} = useTranslation();

  const {handleSubmit, handleChange, values, errors, touched} = useFormikH(
    {
      newPw: '',
      newPwConfirm: '',
    },
    ChangeNewPasswordSchema,
    (values, {resetForm}) => {
      console.log(values);
      resetForm();
    },
  );
  return (
    <View style={changePasswordStyle.inputGroup}>
      <View style={changePasswordStyle.input}>
        <AppInput
          value={values.newPw}
          setValue={handleChange('newPw')}
          placeholder={t('changePwScreen.newPw')}
        />
        {errors.newPw && (
          <Text style={changePasswordStyle.errorText}>{errors.newPw}</Text>
        )}
      </View>

      <View style={changePasswordStyle.input}>
        <AppInput
          value={values.newPwConfirm}
          setValue={handleChange('newPwConfirm')}
          placeholder={t('changePwScreen.confirmNewPw')}
        />
        {errors.newPwConfirm && (
          <Text style={changePasswordStyle.errorText}>
            {errors.newPwConfirm}
          </Text>
        )}
      </View>

      <View style={changePasswordStyle.button}>
        <AppButton title={t('changePwScreen.save')} onPress={handleSubmit} />
      </View>
    </View>
  );
};

export default FormikForm;
