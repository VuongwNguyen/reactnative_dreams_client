import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../styles'
import AuthButton from '../components/buttons/AuthButton'
import AppInput from '../components/AppInput'
import { Fonts } from '../styles/app/Fonts'
const RegisterScreen = () => {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const handleRegister = () => { }

  const goLoginScreen = () => { }

  const handleForgotPassword = () => { }

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <Image style={styles.logo} source={require('../asset/logo.png')} />
        <Text style={Fonts.title}>Sign in</Text>
        <Text>Create an account!</Text>
        <View style={styles.groupInputName}>
          <AppInput positionStyle={styles.edtContainer} value={firstName} setValue={setFirstName} placeholder={'First Name'} />
          <AppInput positionStyle={styles.edtContainer} value={lastName} setValue={setLastName} placeholder={'Last Name'} />
        </View>
        <AppInput positionStyle={styles.edtContainer} value={email} setValue={setEmail} placeholder={'Email'} />
        <AppInput positionStyle={styles.edtContainer} value={password} setValue={setPassword} placeholder={'Password'} isPassword />
        <AppInput positionStyle={styles.edtContainer} value={confirmPassword} setValue={setConfirmPassword} placeholder={'Confirm Password'} isPassword />
        <AuthButton title={'SIGN UP'} onPress={handleRegister} positionStyle={styles.buttonContainer} />
        <View style={styles.row}>
          <Text>Already have an account?</Text>
          <Text onPress={goLoginScreen} style={styles.link}>Login</Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Colors.background.backgroundColor
  },
  logo: {
    width: 110,
    height: 110,
    marginTop: 20
  },
  edtContainer: {
    marginBottom: 20
  },
  buttonContainer: {
    marginVertical: 30,
    height: 60
  },
  groupInputName: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginTop: 20
  },
  checkBoxContaier: {
    flex: 1,
    marginBottom: 20
  },
  link: {
    color: Colors.primary.color,
    marginHorizontal: 4
  },
  row: {
    flexDirection: 'row',
  }
})