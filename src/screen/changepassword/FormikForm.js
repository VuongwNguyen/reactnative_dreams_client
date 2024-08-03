import React from 'react';
import {Text, View} from 'react-native';
import {changePasswordStyle} from '../../styles/changepassword/ChangePasswordStyle';
import AppInput from '../../components/Input';
import AppButton from '../../components/Button';
import {useTranslation} from 'react-i18next';
import useFormikHook from './useFormik';
const FormikForm = () => {
  const {t} = useTranslation();

  const formik = useFormikHook(
    {
      currentPassword: '',
      newPassword: '',
      passwordConfirm: '',
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
          value={values.currentPassword}
          setValue={handleChange('currentPassword')}
          placeholder={t('changePwScreen.currentPw')}
        />
        {errors.currentPassword && touched.currentPassword ? (
          <Text style={changePasswordStyle.errorText}>
            {errors.currentPassword}
          </Text>
        ) : null}
      </View>

      <View style={changePasswordStyle.input}>
        <AppInput
          value={values.newPassword}
          setValue={handleChange('newPassword')}
          placeholder={t('changePwScreen.newPw')}
        />
        {errors.newPassword && touched.newPassword ? (
          <Text style={changePasswordStyle.errorText}>
            {errors.newPassword}
          </Text>
        ) : null}
      </View>

      <View style={changePasswordStyle.input}>
        <AppInput
          value={values.passwordConfirm}
          setValue={handleChange('passwordConfirm')}
          placeholder={t('changePwScreen.confirmNewPw')}
        />
        {errors.passwordConfirm && formik.touched.passwordConfirm ? (
          <Text style={changePasswordStyle.errorText}>
            {errors.passwordConfirm}
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
