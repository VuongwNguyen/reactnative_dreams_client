import { Dimensions, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated'
import AppButton from './AppButton'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const { width, height } = Dimensions.get("window")

const BottomSheetDialog = (props) => {
    const { onPress } = props
    return (
        <>
            <AnimatedPressable
                entering={FadeIn}
                exiting={FadeOut}
                style={styles.overlay}
            />
            <Animated.View style={styles.bottomSheet}>
                <AppButton
                    onPress={onPress}
                    buttonStyle={{
                        width: 342, height: 70,

                    }}
                    labelStyle={{ fontSize: 19, fontWeight: "700" }}
                    label={"Hide BottomSheet"}
                    borderRadius={30}
                />

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
        elevation: 10,
        backgroundColor: 'white',
        zIndex: 1,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignSelf: 'center',
        alignItems: 'center'
    },
})