import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { Assets } from '../styles';
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
        <View style={OtpStyles.container}>
            <View style={OtpStyles.headerContainer}>
                <TouchableOpacity>
                    <Feather name={Assets.icon.arrowLeft} size={24} color="black" />
                </TouchableOpacity>
                <Text style={OtpStyles.headerText}>Enter The One Time Password</Text>
            </View>
            <View style={styles.spacingHeight} />
            <View style={OtpStyles.formContainer}>
                <View style={OtpStyles.textContanier}>
                    <Text style={OtpStyles.textTitle}>Enter OTP</Text>
                    <Text style={OtpStyles.textSub}>
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
                <TouchableOpacity style={OtpStyles.button} onPress={handleCheckOutOTP}>
                    <Text style={OtpStyles.buttonText}>NEXT</Text>
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
});