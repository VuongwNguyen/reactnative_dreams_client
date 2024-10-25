import { StyleSheet } from 'react-native'
import { View, Button } from 'react-native-ui-lib'
import React, { useState } from 'react'

const AppButton = (props) => {
    const { onPress, label, buttonStyle, labelStyle, borderRadius, disabled = false, size } = props

    return (
        <View style={styles.container}>
            <Button
                onPress={onPress}
                style={buttonStyle}
                labelStyle={labelStyle}
                backgroundColor="#0CBBF0"
                label={label}
                borderRadius={borderRadius}
                disabled={disabled}
                size={size}
                enableShadow
            />
        </View>
    )
}

export default AppButton

const styles = StyleSheet.create({
    container: {
        width: "auto",
        height: "auto",
        alignItems: "center",
    },
})