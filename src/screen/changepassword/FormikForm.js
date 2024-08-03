import React from 'react';
import {Text, View} from 'react-native';
import {changePasswordStyle} from '../../styles/changepassword/ChangePasswordStyle';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import {useTranslation} from 'react-i18next';
import useFormikHook from './useFormik';

const FormikForm = () => {
  const {t} = useTranslation();

  const formik = useFormikHook({
    currentPassword: '',
    newPassword: '',
    passwordConfirm: '',
  }, () => {
    console.log('submit',values.newPassword);
  });
  const {handleSubmit, handleChange, values, errors} = formik;
  return (
    <View style={changePasswordStyle.inputGroup}>
      <View style={changePasswordStyle.input}>
        <AppInput
          value={formik.values.currentPassword}
          setValue={handleChange('currentPassword')}
          placeholder={t('changePwScreen.currentPw')}
        />
        {formik.errors.currentPassword && formik.touched.currentPassword ? (
          <Text style={changePasswordStyle.errorText}>
            {formik.errors.currentPassword}
          </Text>
        ) : null}
      </View>

      <View style={changePasswordStyle.input}>
        <AppInput
          value={formik.values.newPassword}
          setValue={handleChange('newPassword')}
          placeholder={t('changePwScreen.newPw')}
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <Text style={changePasswordStyle.errorText}>
            {formik.errors.newPassword}
          </Text>
        ) : null}
      </View>

      <View style={changePasswordStyle.input}>
        <AppInput
          value={formik.values.passwordConfirm}
          setValue={handleChange('passwordConfirm')}
          placeholder={t('changePwScreen.confirmNewPw')}
        />
        {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
          <Text style={changePasswordStyle.errorText}>
            {formik.errors.confirmPassword}
          </Text>
        ) : null}
      </View>

      <View style={changePasswordStyle.btnContainer}>
        <AppButton
          title={t('save')}
          onPress={handleSubmit}
          positionStyle={changePasswordStyle.btn}
        />
      </View>
    </View>
  );
};

export default FormikForm;
