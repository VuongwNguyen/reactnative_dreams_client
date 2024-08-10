import { apiVerifyCodeResetPW } from "../../store/api/AccountAPI";

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
  (setError, inputRefs, dispatch, t, Alert) => (values, actions) => {
    try {
      const Otp = values.otp.join('');
      const body = {
        email: "tienmap038@gmail.com",
        code: Otp
      }
      dispatch(apiVerifyCodeResetPW(body))
    } catch (error) {

    }
  };
