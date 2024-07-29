import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { Assets } from '../styles';

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
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Feather name={Assets.icon.arrowLeft} size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Forgot Password</Text>
            </View>
            <View style={{ height: 40 }} />
            <View style={styles.formContainer}>
                <View style={styles.textContanier}>
                    <Text style={styles.textTitle}>Forgot password?</Text>
                    <Text style={styles.textSub}>
                        Enter your email address or phone number. If an account exists, you’ll get an activation code.
                    </Text>
                </View>
                <View style={styles.wraperTextInput}>
                    <TextInput
                        ref={inputRef}
                        placeholder=''
                        value={value}
                        onChangeText={(text) => setValue(text)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        style={styles.textInput}
                    />
                    <Animated.Text style={[styles.placeholder, labelStyle]}
                        onPress={() => {
                            setIsFocused(true)
                            inputRef.current.focus()
                        }}
                    >
                        Your email or phone number
                    </Animated.Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>CONTINUE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        flexDirection: 'row',
        gap: 35,
        padding: 12,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 19,
        lineHeight: 22,
        fontWeight: '600',
        color: 'black',
    },
    formContainer: {
        flexDirection: 'column',
        gap: 30,
        marginLeft: 16,
        marginRight: 16,
    },
    textContanier: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 30,
    },
    textTitle: {
        fontSize: 30,
        letterSpacing: 0,
        fontWeight: '800',
        color: 'black',
    },
    textSub: {
        fontSize: 16,
        lineHeight: 25,
        color: '#6c757d',
        letterSpacing: 0,
    },
    wraperTextInput: {
        position: 'relative',
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingLeft: 5,
        fontSize: 16,
        color: 'black',
        borderRadius: 5,
        backgroundColor: 'transparent',
    },
    placeholder: {
        position: 'absolute',
        backgroundColor: "",
        bottom: 30,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0CBBF0",
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 5,
            height: 4
        },
        shadowRadius: 4,
        elevation: 4,
        shadowOpacity: 1,
        width: "100%",
        height: 70,
        borderRadius: 15
    },
    buttonText: {
        fontSize: 19,
        lineHeight: 22,
        fontWeight: "700",
        color: "#FFFFFF"
    }

});
