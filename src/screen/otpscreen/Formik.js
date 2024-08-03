import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup"
import { Formik } from 'formik';
import { OtpStyles } from "../../styles/otpstyle/OtpStyle";
import { onChangeText, onKeyPress } from "./Handle";




export const FormmikOtp = (props) => {
    const { inputRefs, t, error, setError, handleCheckOutOTP } = props;


    return (
        <Formik
            initialValues={{ otp: ['', '', '', ''] }}
            onSubmit={handleCheckOutOTP}>
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                <View style={OtpStyles.formContainer}>
                    <View style={OtpStyles.wraperInputContainer}>
                        {inputRefs.map((ref, index) => (
                            <TextInput
                                key={index}
                                ref={ref}
                                style={[
                                    OtpStyles.textInput,
                                    error && { borderColor: 'red' }
                                ]}
                                maxLength={1}
                                keyboardType='number-pad'
                                onChangeText={text => onChangeText(setError, inputRefs, text, index, setFieldValue)}
                                onKeyPress={e => onKeyPress(e, inputRefs, index, setFieldValue)}
                                onBlur={handleBlur(`otp[${index}]`)}
                                value={values.otp[index]}
                            />
                        ))}
                    </View>
                    <TouchableOpacity
                        style={[
                            OtpStyles.button,
                            { backgroundColor: values.otp.some(val => val === '') ? 'gray' : '#0CBBF0' }
                        ]}
                        onPress={handleSubmit}
                        disabled={values.otp.some(val => val === '')}
                    >
                        <Text style={OtpStyles.buttonText}>{t("otpScreen.buttonTextOtp")}</Text>
                    </TouchableOpacity>
                </View>

            )}
        </Formik >
    )
}