import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Assets } from '../styles';
import { OtpStyles } from '../styles/otpstyle/OtpStyle';
import i18n from '../lang';

const otpTest = "1234";

const OtpScreen = () => {
    const { t } = useTranslation();
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState(false);

    const handleChangeText = (text, index, setFieldValue) => {
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
    };

    const handleKeyPress = (e, index, setFieldValue) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            setFieldValue(`otp[${index - 1}]`, '');
            inputRefs[index - 1].current.focus();
        }
    };

    const validationSchema = Yup.object().shape({
        otp: Yup.array()
            .of(Yup.string().length(1, 'Must be exactly 1 character'))
            .min(4, 'OTP must be 4 characters long')
            .max(4, 'OTP must be 4 characters long')
            .required('Required'),
    });

    const handleCheckOutOTP = (values) => {
        const Otp = values.otp.join('');
        if (Otp === otpTest) {
            setOtp(['', '', '', '']);
            setError(false);
            inputRefs[0].current.focus();
        } else {
            Alert.alert("Otp không chính xác");
            setError(true);
            inputRefs[3].current.focus();
        }
    };

    const changeLanguage = () => {
        i18n.changeLanguage(i18n.language === "vi" ? "en" : "vi");
    };

    return (
        <Formik
            initialValues={{ otp: ['', '', '', ''] }}
            validationSchema={validationSchema}
            onSubmit={handleCheckOutOTP}
        >
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
                <View style={OtpStyles.container}>
                    <View style={OtpStyles.headerContainer}>
                        <TouchableOpacity>
                            <Feather name={Assets.icon.arrowLeft} size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={OtpStyles.headerText}>Enter The One Time Password</Text>
                    </View>
                    <View style={OtpStyles.spacingHeight} />
                    <View style={OtpStyles.formContainer}>
                        <View style={OtpStyles.textContanier}>
                            <Text style={OtpStyles.textTitle}>{t("textTitleOtp")}</Text>
                            <Text style={OtpStyles.textSub}>
                                {t("textSubOtp")} {"\n"}
                                <Text style={OtpStyles.textEmailOrPhone}>example@example.com</Text>
                            </Text>
                        </View>
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
                                    onChangeText={text => handleChangeText(text, index, setFieldValue)}
                                    onKeyPress={e => handleKeyPress(e, index, setFieldValue)}
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
                        <Text style={OtpStyles.textCodeSentResend}>{t("textCodeSentResendOtp")} <Text style={OtpStyles.testTime}>00:50</Text></Text>
                        <TouchableOpacity style={[OtpStyles.button, { backgroundColor: '#0CBBF0' }]} onPress={changeLanguage}>
                            <Text style={OtpStyles.buttonText}>Change Language</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default OtpScreen;



