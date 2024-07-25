import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { View, TextField, Icon, TouchableOpacity } from 'react-native-ui-lib';

const AppEditText = (props) => {
    const { styleContainer, style, floatingPlaceholderStyle, placeholder, value, isPassword = false, onChangeText, isError } = props;
    const [secure, setSecure] = useState(isPassword);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={styleContainer}>
            <TextField
                style={[
                    style,
                    {
                        borderBottomColor: isFocus ? "#0CBBF0" : "#6C757D",
                        borderBottomWidth: 1,
                        paddingRight: isPassword ? 40 : 10
                    },
                ]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secure}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                floatingPlaceholderStyle={floatingPlaceholderStyle}
                floatingPlaceholder
                floatingPlaceholderColor={{ default: value.length > 0 ? (isError ? "red" : "#0CBBF0") : "#6C757D" }}
            />
            {isPassword && (
                <TouchableOpacity style={styles.icHide} onPress={() => setSecure(!secure)}>
                    {secure ? (
                        <Icon source={{ uri: 'https://icon-library.com/images/show-hide-icon/show-hide-icon-28.jpg' }} size={24} tintColor="black" />
                    ) : (
                        <Icon source={{ uri: 'https://static.thenounproject.com/png/1483811-200.png' }} size={24} tintColor="black" />
                    )}
                </TouchableOpacity>
            )}
        </View>
    );
};

export default AppEditText;

const styles = StyleSheet.create({
    icHide: {
        position: 'absolute',
        right: 10,
        top: 15,
    },
});
