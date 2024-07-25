import { StyleSheet } from 'react-native'
import { View, Button, Icon, Text } from 'react-native-ui-lib'
import React, { useState } from 'react'

const AppButton = (props) => {
    const { onPress, iconLeft, label, iconRight, buttonStyle, labelStyle, borderRadius, disabled = false, size } = props

    return (
        <View style={styles.container}>
            <Button
                onPress={onPress}
                style={buttonStyle}
                backgroundColor="#0CBBF0"
                borderRadius={borderRadius}
                disabled={disabled}
                size={size}
                enableShadow
            >
                {iconLeft && <>{iconLeft}</>}
                <Text marginL-10 marginR-10 style={labelStyle}>{label}</Text>
                {iconRight && <>{iconRight}</>}
            </Button>
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