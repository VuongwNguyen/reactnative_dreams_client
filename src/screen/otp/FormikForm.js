import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import {OtpStyles} from '../../styles/otpstyle/OtpStyle';
import {onChangeText, onKeyPress} from './Handle';
import AppButton from '../../components/Button';

export const FormmikOtp = props => {
  const {inputRefs, t, error, setError, handleCheckOutOTP} = props;

  return (
    <Formik
      initialValues={{otp: ['', '', '', '']}}
      onSubmit={handleCheckOutOTP}>
      {({handleChange, handleBlur, handleSubmit, values, setFieldValue}) => (
        <View style={OtpStyles.formContainer}>
          <View style={OtpStyles.wraperInputContainer}>
            {inputRefs.map((ref, index) => (
              <TextInput
                key={index}
                ref={ref}
                style={[OtpStyles.textInput, error && {borderColor: 'red'}]}
                maxLength={1}
                keyboardType="number-pad"
                onChangeText={text =>
                  onChangeText(setError, inputRefs, text, index, setFieldValue)
                }
                onKeyPress={e => onKeyPress(e, inputRefs, index, setFieldValue)}
                onBlur={handleBlur(`otp[${index}]`)}
                value={values.otp[index]}
              />
            ))}
          </View>
          <AppButton
            title={t('otpScreen.buttonTextOtp')}
            onPress={handleSubmit}
            isDisable={values.otp.some(val => val === '')}
          />
          {/* <TouchableOpacity
            style={[
              OtpStyles.button,
              {
                backgroundColor: values.otp.some(val => val === '')
                  ? 'gray'
                  : '#0CBBF0',
              },
            ]}
            onPress={handleSubmit}
            disabled={values.otp.some(val => val === '')}>
            <Text style={OtpStyles.buttonText}>
              {t('otpScreen.buttonTextOtp')}
            </Text>
          </TouchableOpacity> */}
        </View>
      )}
    </Formik>
  );
};
