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
  (setError, inputRefs, t, Alert) => (values, actions) => {
    const otpTest = '1234';
    const Otp = values.otp.join('');
    if (Otp === otpTest) {
      // Chuyển màn hình
      actions.resetForm();
      setError(false);
    } else {
      Alert.alert(t);
      setError(true);
      inputRefs[3].current.focus();
    }
  };
