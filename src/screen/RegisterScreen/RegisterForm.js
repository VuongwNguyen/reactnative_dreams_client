import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text} from 'react-native';
import AppButton from '../../components/Button';
import AppInput from '../../components/Input';
import {RegisterStyle} from '../../styles/RegisterStyle/ResgisterStyle';
import {useFormikH} from '../../configs/hooks/useFormikH';
import {registerSchema} from '../../configs/validateSchema/registerSchema';

const RegisterForm = () => {
  const {t} = useTranslation();
  const [error, setError] = useState(false);
  const handleError = errors => {
    setError(
      errors.lastName ||
        errors.firstName ||
        errors.email ||
        errors.phoneNumber ||
        errors.password ||
        errors.confirmPassword,
    );
  };
  const formik = useFormikH(
    {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    registerSchema,
    (val, {resetForm}) => {
      console.log(val);
      resetForm();
    },
  );
  const {handleSubmit, handleChange, values, errors, touched} = formik;

  return (
    <View style={RegisterStyle.containerForm}>
      {error && <Text style={RegisterStyle.textError}>{error}</Text>}
      <View style={RegisterStyle.groupNameContainer}>
        <View style={RegisterStyle.groupName}>
          <AppInput
            placeholder={t('register.lastName')}
            value={values.lastName}
            setValue={handleChange('lastName')}
          />
        </View>
        <View style={RegisterStyle.groupName}>
          <AppInput
            placeholder={t('register.firstName')}
            value={values.firstName}
            setValue={handleChange('firstName')}
          />
        </View>
      </View>
      <AppInput
        placeholder="Email"
        value={values.email}
        setValue={handleChange('email')}
      />
      <AppInput
        placeholder={t('register.phoneNumber')}
        value={values.phoneNumber}
        setValue={handleChange('phoneNumber')}
      />
      <AppInput
        placeholder={t('register.password')}
        isPassword
        value={values.password}
        setValue={handleChange('password')}
      />
      <AppInput
        placeholder={t('register.confirmPassword')}
        isPassword
        value={values.confirmPassword}
        setValue={handleChange('confirmPassword')}
      />
      <AppButton
        positionStyle={RegisterStyle.button}
        onPress={() => {
          handleSubmit();
          handleError(errors, touched);
        }}
        title={t('register.register')}
      />
    </View>
  );
};

export default RegisterForm;
