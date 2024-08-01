import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import i18n from '../lang';
import {changePasswordStyle} from '../styles/changepassword/ChangePasswordStyle';
import AppHeader from '../components/AppHeader';
import AppInput from '../components/AppInput';

const passwordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
      'Password must contain both letters and numbers',
    )
    .required('Required'),

  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/,
      'Password must contain both letters and numbers',
    )
    .required('Required'),

  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Required'),
});

const ChangePasswordScreen = () => {
  const {t} = useTranslation();

  return (
    <View style={changePasswordStyle.container}>
      <AppHeader title={t('change_pw_title')} />

      <View style={changePasswordStyle.spacingHeight} />
      <View style={changePasswordStyle.bodyContainer}>
        <View style={changePasswordStyle.textContanier}>
          <Text style={changePasswordStyle.textTitle}>{t('change_pw')}</Text>
          <Text style={changePasswordStyle.textSub}>{t('pw_rule')}</Text>
        </View>

        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            passwordConfirm: '',
          }}
          validationSchema={passwordValidationSchema}
          onSubmit={values => {
            console.log(values);
          }}>
          {({handleChange, handleSubmit, values, errors, touched}) => (
            <View style={changePasswordStyle.inputGroup}>
              <View>
                <AppInput
                  setValue={handleChange('currentPassword')}
                  value={values.currentPassword}
                  placeholder={t('current_pw')}
                  positionStyle={changePasswordStyle.input}
                />
                {errors.currentPassword && touched.currentPassword ? (
                  <Text style={changePasswordStyle.errorText}>
                    {errors.currentPassword}
                  </Text>
                ) : null}
              </View>

              <View>
                <AppInput
                  setValue={handleChange('newPassword')}
                  value={values.newPassword}
                  placeholder={t('new_pw')}
                  positionStyle={changePasswordStyle.input}
                />
                {errors.newPassword && touched.newPassword ? (
                  <Text style={changePasswordStyle.errorText}>
                    {errors.newPassword}
                  </Text>
                ) : null}
              </View>

              {/*  */}
              <View>
                <AppInput
                  setValue={handleChange('passwordConfirm')}
                  value={values.passwordConfirm}
                  placeholder={t('confirm_new_pw')}
                  positionStyle={changePasswordStyle.input}
                />
                {errors.passwordConfirm && touched.passwordConfirm ? (
                  <Text style={changePasswordStyle.errorText}>
                    {errors.passwordConfirm}
                  </Text>
                ) : null}
              </View>

              <TouchableOpacity
                style={changePasswordStyle.button}
                onPress={handleSubmit}>
                <Text style={changePasswordStyle.buttonText}>
                  {t('save_btn')}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
