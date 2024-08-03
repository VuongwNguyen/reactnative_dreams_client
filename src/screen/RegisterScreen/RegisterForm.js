import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import AppButton from '~/components/AppButton';
import AppInput from '~/components/AppInput';
import { useFormikHook } from '~/hooks/useFomikHook';
import { RegisterStyle } from '~/styles/RegisterStyle/ResgisterStyle';

const MyForm = () => {
  const { t } = useTranslation();
  const formik = useFormikHook({}, () => { });
  const [error, setError] = useState(false)
  const handleError = (errors) => {
    if (errors.firstName) {
      setError({ field: 'firstName', message: errors.firstName })
      return
    }
    if (errors.lastName) {
      setError({ field: 'lastName', message: errors.lastName })
      return
    }
    if (errors.email) {
      setError({ field: 'email', message: errors.email })
      return
    }
    if (errors.phoneNumber) {
      setError({ field: 'phoneNumber', message: errors.phoneNumber })
      return
    }
    if (errors.password) {
      setError({ field: 'password', message: errors.password })
      return
    }
    if (errors.confirmPassword) {
      setError({ field: 'confirmPassword', message: errors.confirmPassword })
      return
    }
    setError({ field: '', message: '' })
  }
  const { handleSubmit, handleChange, values, errors } = formik;

  return (
    <View style={RegisterStyle.containerForm}>
      {error.message &&
        <Text style={RegisterStyle.textError}>
          {error.message}
        </Text>
      }
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
        placeholder='Email'
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
          handleSubmit()
          handleError(errors)
        }}
        title={t('register.register')}
      />
    </View>
  )
};

export default MyForm;
