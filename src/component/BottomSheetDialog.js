import { Dimensions, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated'
import AppButton from './AppButton'
import { Icon, Text, TouchableOpacity } from 'react-native-ui-lib'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const { width, height } = Dimensions.get("window")

const BottomSheetDialog = (props) => {
    const { onPressClose, title } = props
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
                <Text text20T>Title</Text>

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