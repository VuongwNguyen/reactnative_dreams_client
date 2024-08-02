import React, { useState } from "react";
import { Formik } from "formik";
import { RegisterStyle } from "~/styles/RegisterStyle/ResgisterStyle";
import { registerSchema } from "~/configs/validateSchema/registerSchema";
import { View } from "react-native";
import AppInput from "~/components/AppInput";
import AppButton from "~/components/AppButton";
import { useTranslation } from "react-i18next";

export const MyForm = () => {
  const [error, setError] = useState(false)
  const { t } = useTranslation();
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
  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', phoneNumber: '', password: '', confirmPassword: '' }}
      validationSchema={registerSchema}
      onSubmit={(values) => {
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={RegisterStyle.containerForm}>
          {error.message && <Text style={{ color: 'red', fontSize: 18, alignSelf: 'center' }}>
            {error.message}
          </Text>}
          <View style={RegisterStyle.groupNameContainer}>
            <View style={RegisterStyle.groupName}>
              <AppInput
                placeholder={t('firstName')}
                value={values.firstName}
                setValue={handleChange('firstName')}
              />
            </View>
            <View style={RegisterStyle.groupName}>
              <AppInput
                placeholder={t('lastName')}
                value={values.lastName}
                setValue={handleChange('lastName')}
              />
            </View>
          </View>
          <AppInput
            placeholder='Email'
            value={values.email}
            setValue={handleChange('email')}
          />
          <AppInput
            placeholder={t('phoneNumber')}
            value={values.phoneNumber}
            setValue={handleChange('phoneNumber')}
          />
          <AppInput
            placeholder={t('password')}
            isPassword
            value={values.password}
            setValue={handleChange('password')}
          />
          <AppInput
            placeholder={t('confirmPassword')}
            isPassword
            value={values.confirmPassword}
            setValue={handleChange('confirmPassword')}
          />
          <AppButton
            positionStyle={RegisterStyle.button}
            onPress={() => {
              handleSubmit()
              handleError(errors, touched)
            }}
            title={t('register')}
          />
        </View>
      )}
    </Formik>
  )
};