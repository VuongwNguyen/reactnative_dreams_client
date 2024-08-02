export const handleChangeText = (otp, setOtp, setError, inputRefs, text, index, setFieldValue) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setError(false);
    setFieldValue(`otp[${index}]`, text);
    if (text.length === 1 && index < 3) {
        inputRefs[index + 1].current.focus();
    } else if (text.length === 1 && index === 3) {
        inputRefs[index].current.blur();
    }
}



export const handleKeyPress = (e, otp, setOtp, inputRefs, index, setFieldValue) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        setFieldValue(`otp[${index - 1}]`, '');
        inputRefs[index - 1].current.focus();
    }
};


export const handleCheckOutOTP = (otpTest, setOtp, setError, inputRefs, Alert) => (values, actions) => {
    const otpTest = "1234"
    const Otp = values.otp.join('');
    if (Otp === otpTest) {
        actions.resetForm();
        setOtp(['', '', '', '']);
        setError(false);
        Alert.alert("OTP chính xác");
    } else {
        Alert.alert("OTP không chính xác");
        setError(true);
        inputRefs[3].current.focus();
    }
};


