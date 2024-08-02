import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import Feather from 'react-native-vector-icons/Feather';
import { Assets } from '../../styles';
import { OtpStyles } from '../../styles/otpstyle/OtpStyle';
import i18n from '../../lang';
import { FormmikOtp } from './Formik';
import { handleCheckOutOTP } from './Handle';

const OtpScreen = () => {
    const { t } = useTranslation();
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [error, setError] = useState(false);



    return (
        <View style={OtpStyles.container}>
            <View style={OtpStyles.headerContainer}>
                <TouchableOpacity>
                    <Feather name={Assets.icon.arrowLeft} size={24} color="black" />
                </TouchableOpacity>
                <Text style={OtpStyles.headerText}>{t("headerTextOtp")}</Text>
            </View>
            <View style={styles.spacingHeight} />
            <View style={OtpStyles.formContainer}>
                <View style={OtpStyles.textContanier}>
                    <Text style={OtpStyles.textTitle}>{t("textTitleOtp")}</Text>
                    <Text style={OtpStyles.textSub}>
                        {t("textSubOtp")} {"\n"}
                        <Text style={OtpStyles.textEmailOrPhone}>example@example.com</Text>
                    </Text>
                </View>
                <FormmikOtp
                    inputRefs={inputRefs}
                    t={t}
                    error={error}
                    setError={setError}
                    handleCheckOutOTP={handleCheckOutOTP(setError, inputRefs, Alert)}
                />
                <Text style={OtpStyles.textCodeSentResend}>{t("textCodeSentResendOtp")} <Text style={OtpStyles.testTime}>00:50</Text></Text>
            </View>
        </View>
    );
};

export default OtpScreen;

const styles = StyleSheet.create({
    spacingHeight: {
        height: 40,
    },
});
