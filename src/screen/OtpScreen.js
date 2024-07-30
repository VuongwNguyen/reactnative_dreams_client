import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { Assets } from '../styles';
import { forgotPasswordStyles } from '../styles/forgotpasswordstyle/ForgotPasswordStyle';
import { OtpStyles } from '../styles/otpstyle/OtpStyle';

const OtpScreen = () => {
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [otp, setOtp] = useState([]);


    const handleChangeText = (text, index) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text.length === 1 && index < 3) {
            inputRefs[index + 1].current.focus();
        } else if (text.length === 1 && index === 3) {
            inputRefs[index].current.blur();
        }
    };

    const handleKeyPress = (e, index) => {
        if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = '';
            setOtp(newOtp);
            inputRefs[index - 1].current.focus();
        }
    };
    const handleCheckOutOTP = () => {
        const allFilled = otp.every((value) => value !== "");
        if (allFilled) {
            const Otp = otp.join('');
            console.log("Otp nè", Otp);

            setOtp([]);

            inputRefs[0].current.focus();
        }
        else {
            alert("Please fill all fields");
            return;
        }
    }

    return (
        <View style={forgotPasswordStyles.container}>
            <View style={forgotPasswordStyles.headerContainer}>
                <TouchableOpacity>
                    <Feather name={Assets.icon.arrowLeft} size={24} color="black" />
                </TouchableOpacity>
                <Text style={forgotPasswordStyles.headerText}>Enter The One Time Password</Text>
            </View>
            <View style={styles.spacingHeight} />
            <View style={forgotPasswordStyles.formContainer}>
                <View style={forgotPasswordStyles.textContanier}>
                    <Text style={forgotPasswordStyles.textTitle}>Enter OTP</Text>
                    <Text style={forgotPasswordStyles.textSub}>
                        An Authentication code has been sent to {"\n"}
                        <Text style={OtpStyles.textEmailOrPhone}>example@example.com</Text>
                    </Text>
                </View>
                <View style={OtpStyles.wraperInputContainer}>
                    {inputRefs.map((ref, index) => (
                        <TextInput
                            key={index}
                            ref={ref}
                            style={OtpStyles.textInput}
                            maxLength={1}
                            keyboardType='number-pad'
                            onChangeText={text => handleChangeText(text, index)}
                            onKeyPress={e => handleKeyPress(e, index)}
                            value={otp[index]}
                        />
                    ))}
                </View>
                <TouchableOpacity style={forgotPasswordStyles.button} onPress={handleCheckOutOTP}>
                    <Text style={forgotPasswordStyles.buttonText}>NEXT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OtpScreen;

const styles = StyleSheet.create({
    spacingHeight: {
        height: 40,
    },
    textEmailOrPhone: {
        color: 'black',
        fontSize: 15,
        letterSpacing: 0,
        lineHeight: 25,
        fontWeight: "700"
    },
    wraperInputContainer: {
        width: "100%",
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        paddingVertical: 23,
        paddingHorizontal: 10,
        justifyContent: "center"
    },
    textInput: {
        width: 50,
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "700",
        color: "black",
        textShadowColor: "rgba(0, 0, 0, 0.25)",
        textShadowOffset: {
            width: 0,
            height: 4
        },
        textShadowRadius: 4
    }
});