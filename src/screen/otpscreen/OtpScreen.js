import React, {useRef, useState} from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import {Assets} from '../../styles';
import {OtpStyles} from '../../styles/otpstyle/OtpStyle';
import {FormmikOtp} from './Formik';
import {handleCheckOutOTP} from './Handle';

const OtpScreen = () => {
  const {t} = useTranslation();
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [error, setError] = useState(false);

  return (
    <View style={OtpStyles.container}>
      <View style={OtpStyles.headerContainer}>
        <TouchableOpacity>
          <Feather name={Assets.icon.arrowLeft} size={24} color="black" />
        </TouchableOpacity>
        <Text style={OtpStyles.headerText}>{t('otpScreen.headerTextOtp')}</Text>
      </View>
      <View style={OtpStyles.spacingHeight} />
      <View style={OtpStyles.formContainer}>
        <View style={OtpStyles.textContanier}>
          <Text style={OtpStyles.textTitle}>{t('otpScreen.textTitleOtp')}</Text>
          <Text style={OtpStyles.textSub}>
            {t('otpScreen.textSubOtp')} {'\n'}
            <Text style={OtpStyles.textEmailOrPhone}>example@example.com</Text>
          </Text>
        </View>
        <FormmikOtp
          inputRefs={inputRefs}
          t={t}
          error={error}
          setError={setError}
          handleCheckOutOTP={handleCheckOutOTP(
            setError,
            inputRefs,
            t('otpScreen.ErrorOtp'),
            Alert,
          )}
        />
        <Text style={OtpStyles.textCodeSentResend}>
          {t('otpScreen.textCodeSentResendOtp')}{' '}
          <Text style={OtpStyles.testTime}>00:50</Text>
        </Text>
      </View>
    </View>
  );
};

export default OtpScreen;
