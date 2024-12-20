import React, {useEffect, useRef, useState} from 'react';

import {Text, View, Alert, ToastAndroid} from 'react-native';
import {useTranslation} from 'react-i18next';

import {OtpStyles} from '../../styles/otpstyle/OtpStyle';
import {FormmikOtp} from './FormikForm';
import {useDispatch, useSelector} from 'react-redux';
import {
  APISendOtpCode,
  APIVerifyAccount,
  apiVerifyCodeResetPW,
} from '../../store/api/AccountAPI';
import {stackName} from '../../navigations/screens';
import AppHeader from '../../components/Header';
import AppButton from '../../components/Button';

const OtpScreen = props => {
  const {navigation, route} = props;
  const email = route?.params?.email;
  const isForgot = props.route?.params?.isForgot;
  const {t} = useTranslation();
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [error, setError] = useState(false);
  const useAppDispatch = () => useDispatch();
  const useAppSelector = useSelector;
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(60);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const handleCheckOutOTP = () => (values, actions) => {
    try {
      const Otp = values.otp.join('');
      const body = {
        email: email,
        code: Otp,
      };

      if (!!isForgot) {
        dispatch(apiVerifyCodeResetPW(body))
          .unwrap()
          .then(res => {
            navigation.navigate(stackName.changeNewPassword.name, {
              email: email,
            });
          })
          .catch(err => {
            ToastAndroid.show(err.message, ToastAndroid.SHORT);
          });
      } else {
        dispatch(APISendOtpCode(body))
          .unwrap()
          .then(res => {
            navigation.navigate(stackName.login.name);
          })
          .catch(err => {
            ToastAndroid.show(err.message, ToastAndroid.SHORT);
          });
      }
    } catch (err) {}
  };

  return (
    <View style={OtpStyles.container}>
      <AppHeader title={t('otpScreen.headerTextOtp')} />
      <View style={OtpStyles.spacingHeight} />
      <View style={OtpStyles.formContainer}>
        <View style={OtpStyles.textContanier}>
          <Text style={OtpStyles.textTitle}>{t('otpScreen.textTitleOtp')}</Text>
          <Text style={OtpStyles.textSub}>
            {t('otpScreen.textSubOtp')} {'\n'}
            <Text style={OtpStyles.textEmailOrPhone}>{email}</Text>
          </Text>
        </View>
        <FormmikOtp
          inputRefs={inputRefs}
          t={t}
          error={error}
          setError={setError}
          handleCheckOutOTP={handleCheckOutOTP(
            email,
            setError,
            inputRefs,
            dispatch,
            t('otpScreen.ErrorOtp'),
            Alert,
          )}
        />
        <Text style={OtpStyles.textCodeSentResend}>
          {t('otpScreen.textCodeSentResendOtp')}{' '}
          <Text style={OtpStyles.testTime}>00:{time}</Text>
        </Text>
        <AppButton
          title={'gửi lại mã'}
          onPress={() => {
            dispatch(APIVerifyAccount({email}))
              .unwrap()
              .then(res => {
                setTime(60);
              });
          }}
          isDisable={time !== 0}
        />
      </View>
    </View>
  );
};

export default OtpScreen;
