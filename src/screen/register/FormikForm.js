import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {RegisterStyle} from '../../styles/RegisterStyle/ResgisterStyle';
import {useFormikH} from '../../configs/hooks/useFormikH';
import {registerSchema} from '../../configs/validateSchema/registerSchema';
import {Assets, Colors, Typography} from '../../styles';
import {LoginStyle} from '../../styles/loginStyle/LoginStyle';
import {useDispatch} from 'react-redux';
import {
  APIAuthThirdPartner,
  APIRegister,
} from '../../store/api/AccountAPI';
import {useNavigation} from '@react-navigation/native';
import {stackName} from '../../navigations/screens';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const RegisterForm = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '650950443769-ogc8o7mqb2viqkrct0ls5vqtt4ajei9n.apps.googleusercontent.com',
    });
  }, []);
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const signInResult = await GoogleSignin.signIn();
      // console.log('Google Sign-In Result:', signInResult);
      const idToken = signInResult.data.idToken;
      if (!idToken) {
        throw new Error('Không thể lấy được ID token từ Google Sign-In.');
      }
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      // console.log('Google Sign-In thành công:', userCredential);
      const body = {
        email: userCredential.user.email,
        first_name: userCredential.additionalUserInfo.profile?.family_name,
        last_name: userCredential.additionalUserInfo.profile?.given_name,
        avatar: userCredential.user?.photoURL,
        partner_id: userCredential.user.uid,
        password: '',
        phone: userCredential.user.phoneNumber,
      };
      await dispatch(APIAuthThirdPartner(body)).unwrap();

      Alert.alert('Đăng nhập thành công với Google!');
    } catch (error) {
      // console.error('Lỗi khi đăng nhập với Google:', error.message);
      // Alert.alert('Đăng nhập thất bại:', error.message);
    } 
  }
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
          <TouchableOpacity onPress={onGoogleButtonPress}>
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
