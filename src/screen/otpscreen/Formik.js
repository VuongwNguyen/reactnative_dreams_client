import { Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup"
import { Formik } from 'formik';
import { OtpStyles } from "../../styles/otpstyle/OtpStyle";
import { handleChangeText, handleKeyPress } from "./Handle";




export const FormmikOtp = (props) => {
    const { otp, setOtp, inputRefs, t, error, setError, handleCheckOutOTP } = props;

    const validationSchema = Yup.object().shape({
        otp: Yup.array()
            .of(Yup.string().length(1, 'Must be exactly 1 character'))
            .min(4, 'OTP must be 4 characters long')
            .max(4, 'OTP must be 4 characters long')
            .required('Required'),
    });

    return (
        <Formik
            initialValues={{ otp: ['', '', '', ''] }}
            validationSchema={validationSchema}
            onSubmit={handleCheckOutOTP}>
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                <View style={{ flexDirection: "column", gap: 30 }}>
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
                                onChangeText={text => handleChangeText(otp, setOtp, setError, inputRefs, text, index, setFieldValue)}
                                onKeyPress={e => handleKeyPress(e, otp, setOtp, inputRefs, index, setFieldValue)}
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
                        <Text style={OtpStyles.buttonText}>{t("buttonTextOtp")}</Text>
                    </TouchableOpacity>
                </View>

            )}
        </Formik >
    )
}