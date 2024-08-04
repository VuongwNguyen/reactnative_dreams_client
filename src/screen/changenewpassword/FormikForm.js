import React from 'react';
import {Text, View} from 'react-native';
import {changePasswordStyle} from '../../styles/changepassword/ChangePasswordStyle';
import AppInput from '../../components/Input';
import AppButton from '../../components/Button';
import {useTranslation} from 'react-i18next';
import useFormikHook from './useFomik';
const FormikForm = () => {
  const {t} = useTranslation();

  const formik = useFormikHook(
    {
      newPw: '',
      newPwConfirm: '',
    },

    (values, {resetForm}) => {
      console.log(values);
      resetForm();
    },
  );
  const {handleSubmit, handleChange, values, errors, touched} = formik;
  return (
    <View style={changePasswordStyle.inputGroup}>
      <View style={changePasswordStyle.input}>
        <AppInput
          value={values.newPw}
          setValue={handleChange('newPw')}
          placeholder={t('changePwScreen.newPw')}
        />
        {errors.newPw && touched.newPw ? (
          <Text style={changePasswordStyle.errorText}>{errors.newPw}</Text>
        ) : null}
      </View>

      <View style={changePasswordStyle.input}>
        <AppInput
          value={values.newPwConfirm}
          setValue={handleChange('newPwConfirm')}
          placeholder={t('changePwScreen.confirmNewPw')}
        />
        {errors.newPwConfirm && formik.touched.newPwConfirm ? (
          <Text style={changePasswordStyle.errorText}>
            {errors.newPwConfirm}
          </Text>
        ) : null}
      </View>

      <View style={changePasswordStyle.button}>
        <AppButton
          title={t('changePwScreen.save')}
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
    </View>
  );
};

export default FormikForm;
