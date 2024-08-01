import { Image, KeyboardAvoidingView, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RegisterStyle } from '../styles/RegisterStyle/ResgisterStyle'
import { Assets } from '../styles'
import AppInput from '../components/AppInput'
import AppButton from '../components/AppButton';

const RegisterScreen = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First name cannot be empty'),
    lastName: Yup.string()
      .required('Last name cannot be empty'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email cannot be empty'),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number invalid')
      .required('Phone number cannot be empty'),
    password: Yup.string()
      .min(8, 'Password should be 8 chars')
      .required('Password cannot be empty'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password cannot be empty'),
  });
  const MyForm = () => {
    const [error, setError] = React.useState(false)
    const handleError = (errors, touched) => {
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
      setError({ field:'',message: '' })
    }
    return (
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', phoneNumber: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => {

        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={RegisterStyle.containerForm}>
            {error.message && <Text style={{ color: 'red', fontSize: 18, alignSelf: 'center' }}>
              {error.message}
            </Text>}
            <View style={RegisterStyle.groupName}>
              <AppInput placeholder="First Name" value={values.firstName} setValue={handleChange('firstName')} onBlur={handleBlur('firstName')} isError={error.field === 'firstName'} />
              <AppInput placeholder="Last Name" value={values.lastName} setValue={handleChange('lastName')} onBlur={handleBlur('lastName')} isError={error.field === 'lastName'} />
            </View>
            <AppInput placeholder="Email" value={values.email} setValue={handleChange('email')} onBlur={handleBlur('email')} isError={error.field === 'email'} />
            <AppInput placeholder="Phone Number" value={values.phoneNumber} setValue={handleChange('phoneNumber')} onBlur={handleBlur('phoneNumber')} isError={error.field === 'phoneNumber'} />
            <AppInput placeholder="Password" isPassword value={values.password} setValue={handleChange('password')} onBlur={handleBlur('password')} isError={error.field === 'password'} />
            <AppInput placeholder="Confirm Password" isPassword value={values.confirmPassword} setValue={handleChange('confirmPassword')} onBlur={handleBlur('confirmPassword')} isError={error.filed === 'confirmPassword'} textError={errors.confirmPassword} />
            <AppButton positionStyle={RegisterStyle.button} onPress={() => { handleSubmit(), handleError(errors, touched) }} title="Đăng nhập" />
          </View>
        )}
      </Formik>)
  };
  return (
    <KeyboardAvoidingView
      style={RegisterStyle.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView style={{ flexGrow: 1 }} scrollEnabled={false} showsVerticalScrollIndicator={false}>
        <View style={RegisterStyle.containerHeader}>
          <Image style={RegisterStyle.logo} source={Assets.image.logo} />
          <Text style={RegisterStyle.headerText}>Welcome to App!</Text>
          <Text style={{ textAlign: 'center', marginHorizontal: 20, marginVertical: 10 }}>Create an account!</Text>
        </View>
        <MyForm />
        <View style={RegisterStyle.containerLink}>
          <Text>Already have an account?</Text>
          <Text style={RegisterStyle.link}>Login</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen