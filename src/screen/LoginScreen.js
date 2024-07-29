import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../styles'
import AuthButton from '../components/buttons/AuthButton'
import AppInput from '../components/AppInput'
import { Fonts } from '../styles/app/Fonts'
const CheckBoxComponent = (props) => {
  const { value, title, stylePossition, onPress } = props
  return (
    <View style={[stylePossition, { flexDirection: 'row', alignItems: 'center', maxHeight: 40, gap: 10 }]}>
      <View style={{ width: 25, height: 25, backgroundColor: '#0CBBF0', borderRadius: 45, padding: 3, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 22, height: 22, backgroundColor: 'white', borderRadius: 45, padding: 3, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ width: 19, height: 19, backgroundColor: value ? '#0CBBF0' : 'white', borderRadius: 45, alignSelf: 'center' }} onPress={() => onPress(!value)}>
          </TouchableOpacity>
        </View>
      </View>
      <Text>{title}</Text>
    </View>
  )
}
const LoginScreen = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [rememberMe, setRememberMe] = React.useState(false)

  const handleLogin = () => { }
  const goRegistrerScreen = () => { }

  return (
    <ScrollView>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <Image style={styles.logo} source={require('../asset/logo.png')} />
        <Text style={Fonts.title}>Welcome to App!</Text>
        <Text style={{textAlign:'center',marginHorizontal:20,marginVertical:10}}>Connect with friends, discover new communities, and share your life with orthers.</Text>
        <Text style={{fontSize:20,color:'black',fontWeight:'bold',marginVertical:20}}>Create an account!</Text>
        <AppInput positionStyle={styles.edtContainer} value={email} setValue={setEmail} placeholder={'Your email or phonenumber'} />
        <AppInput positionStyle={styles.edtContainer} value={password} setValue={setPassword} placeholder={'Password'} isPassword />
        <View style={styles.row}>
          <CheckBoxComponent onPress={() => setRememberMe(!rememberMe)} value={rememberMe} setValue={setRememberMe} title={'Remember me?'} stylePossition={styles.checkBoxContaier} />
          <Text style={styles.link} onPress={handleForgotPassword}>Forgot Password?</Text>
        </View>
        <AuthButton title={'SIGN IN'} onPress={handleLogin} positionStyle={styles.buttonContainer} />
        <Text>or</Text>
        <View style={{flexDirection: 'row', gap: 40,marginVertical:30}}>
          <Image style={styles.iconLogin} source={require('../assets/github.png')} />
          <Image  style={styles.iconLogin} source={require('../assets/google.png')} />
        </View>
        <View style={styles.row}>
          <Text>You don't have an account?</Text>
          <Text onPress={goRegistrerScreen} style={styles.link}>Register</Text>
        </View>        
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default LoginScreen

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
    marginBottom: 20,
    height: 60
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
  },
  iconLogin: {
    width: 50,
    height: 50
  }
})