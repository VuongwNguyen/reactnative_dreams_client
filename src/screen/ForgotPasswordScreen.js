import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { Assets } from '../styles';
import { forgotPasswordStyles } from '../styles/forgotpasswordstyle/ForgotPasswordStyle';

const ForgotPasswordScreen = () => {
    const [value, setValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    const inputRef = useRef(null);

    useEffect(() => {
        Animated.timing(animation, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false, // UseNativeDriver must be false for non-layout properties
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [20, -5], // Di chuyển lên khi có giá trị hoặc khi focus
                }),
            },
        ],
        fontSize: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12], // Kích thước chữ nhỏ hơn khi label ở trên
        }),
        color: animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['#a9a9a9', '#000000'], // Màu sắc thay đổi khi label ở trên
        }),
    };

    return (
        <View style={forgotPasswordStyles.container}>
            <View style={forgotPasswordStyles.headerContainer}>
                <TouchableOpacity>
                    <Feather name={Assets.icon.arrowLeft} size={24} color="black" />
                </TouchableOpacity>
                <Text style={forgotPasswordStyles.headerText}>Forgot Password</Text>
            </View>
            <View style={styles.spacingHeight} />
            <View style={forgotPasswordStyles.formContainer}>
                <View style={forgotPasswordStyles.textContanier}>
                    <Text style={forgotPasswordStyles.textTitle}>Forgot password?</Text>
                    <Text style={forgotPasswordStyles.textSub}>
                        Enter your email address or phone number. If an account exists, you’ll get an activation code.
                    </Text>
                </View>
                <View style={forgotPasswordStyles.wraperTextInput}>
                    <TextInput
                        ref={inputRef}
                        placeholder=''
                        value={value}
                        onChangeText={(text) => setValue(text)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={forgotPasswordStyles.textInput}
                    />
                    <Animated.Text style={[forgotPasswordStyles.placeholder, labelStyle]}
                        onPress={() => {
                            setIsFocused(true)
                            inputRef.current.focus()
                        }}
                    >
                        Your email or phone number
                    </Animated.Text>
                </View>
                <TouchableOpacity style={forgotPasswordStyles.button} onPress={() => { setIsFocused(false) }}>
                    <Text style={forgotPasswordStyles.buttonText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    spacingHeight: {
        height: 40,
    },
});
