import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Image, Text, View, Colors, KeyboardAwareScrollView } from 'react-native-ui-lib';
import EditText from '../component/AppEditText';
import AppButton from '../component/AppButton';

export default function RegisterScreen() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  return (
    <KeyboardAwareScrollView>
      <View padding-24 flex-1 centerH>
        <Image width={110} height={110} source={require('../../assets/logo.png')} />
        <Text text30BL>Sign in</Text>
        <Text text16 marginT-12>Create a account !</Text>
        <View row style={{ marginTop: '10%' }} gap-30 >
          <EditText
            styleContainer={style.editext}
            placeholder={'First name'}
            value={firstName}
            floatingPlaceholderStyle={style.placeholder}
            onChangeText={setFirstName}
          />
          <EditText
            styleContainer={style.editext}
            placeholder={'Last name'}
            value={lastName}
            floatingPlaceholderStyle={style.placeholder}
            onChangeText={setLastName}
          />
        </View>
        <EditText
          styleContainer={style.editext}
          placeholder={'Email'}
          value={email}
          floatingPlaceholderStyle={style.placeholder}
          onChangeText={setEmail}
        />
        <EditText
          styleContainer={style.editext}
          placeholder={'Phone number'}
          value={phone}
          floatingPlaceholderStyle={style.placeholder}
          onChangeText={setPhone}
        />
        <EditText
          styleContainer={style.editext}
          placeholder={'Password'}
          value={password}
          floatingPlaceholderStyle={style.placeholder}
          isPassword
          onChangeText={setPassword}
        />
        <EditText
          styleContainer={style.editext}
          placeholder={'Confirm password'}
          value={confirmPass}
          floatingPlaceholderStyle={style.placeholder}
          isPassword
          onChangeText={setConfirmPass}
        />
        <AppButton label={'SIGN UP'} buttonStyle={style.button} />
        <View row marginT-25>
          <Text text90L>Already have an account?</Text>
          <Text text90L color={Colors.blue30} marginL-8>Sign in</Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const style = StyleSheet.create({
  editext: {
    flex: 1,
    width: '100%',
    maxHeight: 60,
    marginBottom: '7%'
  },
  placeholder: {
    color: Colors.grey30,
    fontSize: 16,
  },
  button: {
    flex: 1,
    maxHeight: 60,
    minWidth: '100%',
    height: 60,
    borderRadius: 10,
    marginTop: '10%'
  },
});
