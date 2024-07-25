import { Dimensions, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated'
import AppButton from './AppButton'
import { Icon, Text, TouchableOpacity, View } from 'react-native-ui-lib'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const { width, height } = Dimensions.get("window")

const BottomSheetDialog = (props) => {
    const { onPressClose, textTitle, styleTextTitle, textContent, styleTextContent, children } = props
    return (
        <>
            <AnimatedPressable
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.overlay}
            />
            <Animated.View style={styles.bottomSheet}>
                <TouchableOpacity onPress={onPressClose}>
                    <Icon source={require("../../assets/icons/vector.png")} />
                </TouchableOpacity>
                <View style={{ height: 20 }} />
                <Text text40 style={styleTextTitle}>{textTitle}</Text>
                <View style={{ height: 15 }} />
                <Text text70R color={"#6c757d"} style={styleTextContent}>{textContent}</Text>
                <View style={{ height: 15 }} />
                {children}
            </Animated.View>
        </>
    )
}

export default BottomSheetDialog

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 1,

    },
    bottomSheet: {
        position: 'absolute',
        width: width * 1,
        height: height * 0.485,
        padding: 24,
        bottom: 0,
        shadowColor: "#fff",
        backgroundColor: 'white',
        zIndex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
})