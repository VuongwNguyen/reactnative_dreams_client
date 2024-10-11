import {ToastAndroid} from 'react-native';
import {APISendOtpCode, apiVerifyCodeResetPW} from '../../store/api/AccountAPI';
export const onChangeText = (
  setError,
  inputRefs,
  text,
  index,
  setFieldValue,
) => {
  setError(false);
  setFieldValue(`otp[${index}]`, text);
  if (text.length === 1 && index < 3) {
    inputRefs[index + 1].current.focus();
  } else if (text.length === 1 && index === 3) {
    inputRefs[index].current.blur();
  }
};

export const onKeyPress = (e, inputRefs, index, setFieldValue) => {
  if (e.nativeEvent.key === 'Backspace' && index > 0) {
    setFieldValue(`otp[${index - 1}]`, '');
    inputRefs[index - 1].current.focus();
  }
};

export const handleCheckOutOTP =
  (email, setError, inputRefs, dispatch, t, Alert) => (values, actions) => {
    try {
      const Otp = values.otp.join('');
      const body = {
        email: email,
        code: Otp,
      };
      console.log(body);

      dispatch(APISendOtpCode(body))
        .unwrap()
        .then(res => {
          navigation.navigate(stackName.login.name);
        })
        .catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    } catch (error) {}
  };
