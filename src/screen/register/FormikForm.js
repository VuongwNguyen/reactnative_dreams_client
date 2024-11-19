import React, {useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {RegisterStyle} from '../../styles/RegisterStyle/ResgisterStyle';
import {useFormikH} from '../../configs/hooks/useFormikH';
import {registerSchema} from '../../configs/validateSchema/registerSchema';
import {Assets, Typography} from '../../styles';
import {LoginStyle} from '../../styles/loginStyle/LoginStyle';
import {useDispatch} from 'react-redux';
import {APIRegister, APIVerifyAccount} from '../../store/api/AccountAPI';
import {useNavigation} from '@react-navigation/native';
import {stackName} from '../../navigations/screens';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const RegisterForm = () => {
  useEffect(function () {
    GoogleSignin.configure(
      {
        webClientId:'650950443769-f7i4uimhuh6bru16p13db1ik86pbv0la.apps.googleusercontent.com',
        offlineAccess:false
      },
      [],
    );
  });
  const navigation = useNavigation();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      const user = await auth().signInWithCredential(googleCredential);

      console.log('User info:', user);
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  };

  const {handleSubmit, handleChange, values, errors, touched} = useFormikH(
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
      dispatch(
        APIRegister({
          first_name: val.firstName,
          last_name: val.lastName,
          email: val.email,
          phone: val.phoneNumber,
          password: val.password,
        }),
      )
        .unwrap()
        .then(res => {
          resetForm();
          dispatch(
            APIVerifyAccount({
              email: val.email,
            }),
          );
          navigation.navigate(stackName.otp.name, {email: val.email});
        })
        .catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    },
  );

  return (
    <View style={RegisterStyle.containerForm}>
      <View style={RegisterStyle.groupNameContainer}>
        <View style={RegisterStyle.groupName}>
          <Input
            placeholder={t('register.lastName')}
            value={values.lastName}
            setValue={handleChange('lastName')}
          />
          {errors.lastName && touched.lastName && (
            <Text style={Typography.errorText}>{errors.lastName}</Text>
          )}
        </View>
        <View style={RegisterStyle.groupName}>
          <Input
            placeholder={t('register.firstName')}
            value={values.firstName}
            setValue={handleChange('firstName')}
          />
          {errors.firstName && touched.firstName && (
            <Text style={Typography.errorText}>{errors.firstName}</Text>
          )}
        </View>
      </View>
      <View>
        <Input
          placeholder="Email"
          value={values.email}
          setValue={handleChange('email')}
        />
        {errors.email && touched.email && (
          <Text style={Typography.errorText}>{errors.email}</Text>
        )}
      </View>
      <View>
        <Input
          placeholder={t('register.phoneNumber')}
          value={values.phoneNumber}
          setValue={handleChange('phoneNumber')}
        />
        {errors.phoneNumber && touched.phoneNumber && (
          <Text style={Typography.errorText}>{errors.phoneNumber}</Text>
        )}
      </View>
      <View>
        <Input
          placeholder={t('register.password')}
          isPassword
          value={values.password}
          setValue={handleChange('password')}
        />
        {errors.password && touched.password && (
          <Text style={Typography.errorText}>{errors.password}</Text>
        )}
      </View>
      <View>
        <Input
          placeholder={t('register.confirmPassword')}
          isPassword
          value={values.confirmPassword}
          setValue={handleChange('confirmPassword')}
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <Text style={Typography.errorText}>{errors.confirmPassword}</Text>
        )}
      </View>
      <Button onPress={handleSubmit} title={t('register.register')} />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexDirection: 'column',
          flex: 1,
        }}>
        <Text style={LoginStyle.orText}>{t('loginScreen.or')}</Text>
        <View style={LoginStyle.differentLoginContainer}>
          <TouchableOpacity onPress={signInWithGoogle}>
            <Image style={LoginStyle.image} source={Assets.image.google} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image style={LoginStyle.image} source={Assets.image.github} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterForm;
