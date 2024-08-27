import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MessageRight = ({ children }) => {
    return (
        <View style={styles.messageRightContainer}>
            {children}
        </View>
    )
}

export default MessageRight

const styles = StyleSheet.create({
    messageRightContainer: {
        backgroundColor: '#0cbbf0',
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        padding: 10,
        alignSelf: 'flex-end'
    },
})