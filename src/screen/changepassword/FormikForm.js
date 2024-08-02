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
        {errors.confirmPassword && touched.confirmPassword ? (
          <Text style={changePasswordStyle.errorText}>
            {errors.confirmPassword}
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
