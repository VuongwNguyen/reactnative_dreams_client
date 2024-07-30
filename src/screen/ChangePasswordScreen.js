import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {Assets} from '../styles';
import {changePasswordStyle} from '../styles/ChangePasswordStyle/ChangePasswordStyle';
const ChangePasswordScreen = () => {
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
    <View style={changePasswordStyle.container}>
      <View style={changePasswordStyle.headerContainer}>
        <TouchableOpacity>
          <Feather name={Assets.icon.back} size={24} color="black" />
        </TouchableOpacity>
        <Text style={changePasswordStyle.headerText}>Change your password</Text>
      </View>
      <View style={styles.spacingHeight} />

      <View style={changePasswordStyle.bodyContainer}>
        <View style={changePasswordStyle.textContanier}>
          <Text style={changePasswordStyle.textTitle}>Change password</Text>
          <Text style={changePasswordStyle.textSub}>
            The new password must be more than 6 characters, contain uppercase
            letters, lowercase letters, and special characters
          </Text>
        </View>
        {/* input Group */}
        <View style={changePasswordStyle.inputGroup}>
          <View style={changePasswordStyle.wraperTextInput}>
            <TextInput
              ref={inputRef}
              placeholder=""
              value={value}
              onChangeText={text => setValue(text)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={changePasswordStyle.textInput}
            />
            <Animated.Text
              style={[changePasswordStyle.placeholder, labelStyle]}
              onPress={() => {
                setIsFocused(true);
                inputRef.current.focus();
              }}>
              Your email or phone number
            </Animated.Text>
          </View>
        </View>

        {/*  */}

        <TouchableOpacity
          style={changePasswordStyle.button}
          onPress={() => {
            setIsFocused(false);
          }}>
          <Text style={changePasswordStyle.buttonText}>SAVE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  spacingHeight: {
    height: 40,
    paddingHorizontal: 16,
  },
});
