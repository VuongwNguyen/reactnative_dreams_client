import React from 'react';
import {Text, View} from 'react-native';
import {useFormik} from 'formik';
import {ChangePasswordSchema} from '../../configs/validationschema/ChangePasswordSchema';
import {changePasswordStyle} from '../../styles/changepassword/ChangePasswordStyle';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import {useTranslation} from 'react-i18next';
const FormikForm = () => {
  const {t} = useTranslation();

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      passwordConfirm: '',
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: (values, {resetForm}) => {
      console.log(values);
      resetForm();
    },
  });
  return (
    <View style={changePasswordStyle.inputGroup}>
      <View style={changePasswordStyle.input}>
        <AppInput
          value={formik.values.currentPassword}
          setValue={formik.handleChange('currentPassword')}
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
          setValue={formik.handleChange('newPassword')}
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
          setValue={formik.handleChange('passwordConfirm')}
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
          onPress={formik.handleSubmit}
          positionStyle={changePasswordStyle.btn}
        />
      </View>
    </View>
  );
};

export default FormikForm;
