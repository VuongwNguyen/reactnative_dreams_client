import { StyleSheet } from 'react-native';
import React, { useState } from 'react'
import { Text, View, TextField, Icon, TouchableOpacity } from 'react-native-ui-lib';
import { use } from 'i18next';


const AppEditTextChangeIF = (props) => {
    const { styleContainer, styleTextFieldContainer, style, floatingPlaceholderStyle, placeholder, value, onChangeText, isError } = props
    const [isFocus, setIsFocus] = useState(false)
    return (
        <View style={styleContainer}>
            <TextField
                containerStyle={[styleTextFieldContainer, {
                    backgroundColor: "#F5F5F5",
                    height: 50,
                    justifyContent: "center",
                    padding: 10,
                    borderRadius: 20
                }]}
                style={style}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => { setIsFocus(true) }}
                onBlur={() => { setIsFocus(false) }}
                floatingPlaceholderStyle={floatingPlaceholderStyle}
                floatingPlaceholderColor={{ default: value.length > 0 ? (isError ? "red" : "#0CBBF0") : "#6C757D" }}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    icHide: {
        position: "absolute",
        right: 10,
        top: 20,
    }
});

export default AppEditTextChangeIF