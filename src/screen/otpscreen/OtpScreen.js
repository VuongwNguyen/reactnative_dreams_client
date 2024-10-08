import React, {useRef, useState} from 'react';
import {Text, View, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {OtpStyles} from '../../styles/otpstyle/OtpStyle';
import {FormmikOtp} from './FormikForm';
import {handleCheckOutOTP} from './Handle';
import {useDispatch, useSelector} from 'react-redux';
import AppHeader from '../../components/Header';

const OtpScreen = () => {
  const {t} = useTranslation();
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [error, setError] = useState(false);
  const useAppDispatch = () => useDispatch();
  const useAppSelector = useSelector;
  const dispatch = useAppDispatch();

  return (
    <View style={OtpStyles.container}>
      {/* <View style={OtpStyles.headerContainer}>
        <TouchableOpacity>
          <Image
            source={Assets.icons.arrowLeft}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
        <Text style={OtpStyles.headerText}>{t('otpScreen.headerTextOtp')}</Text>
      </View> */}
      <AppHeader title={t('otpScreen.headerTextOtp')} leftButton={true} />
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
            dispatch,
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
