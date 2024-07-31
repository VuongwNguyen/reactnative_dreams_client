import { TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Assets } from '../styles'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { AppInputStyle } from '../styles/components/input/AppInputStyle';

const AppInput = (props) => {
  const { value='', setValue, placeholder, isPassword = false, positionStyle } = props
  const [canReadPass, setCanReadPass] = useState(isPassword)
  const translateY = useSharedValue(0);
  const label = useSharedValue(placeholder);

  const triggerAnimation = (value, isFocus, text) => {
    if (isFocus) {
      translateY.value = withTiming(value);
    } else {
      if (!text) {
        translateY.value = withTiming(value);
      }
    }
  };

  const labelAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
      fontSize: interpolate(
        translateY.value,
        [0, -24],
        [16, 12],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <View style={[positionStyle, AppInputStyle.container]}>
      <Animated.Text style={[AppInputStyle.label, labelAnimatedStyle]}>
        {label.value}
      </Animated.Text>
      <View style={AppInputStyle.groupInputContainer}>
        <TextInput
          style={AppInputStyle.input}
          value={value}
          onChangeText={setValue}
          secureTextEntry={canReadPass}
          onFocus={() => triggerAnimation(-24, true,value)}
          onBlur={() => triggerAnimation(0, false,value)}
        />
        {
          isPassword && <TouchableOpacity onPress={() => setCanReadPass(!canReadPass)}>
            {canReadPass ? <FontAwesome6 name={Assets.icon.eyeClose} {...AppInputStyle.eyeIcon} /> : <FontAwesome6 name={Assets.icon.eyeOpen} {...AppInputStyle.eyeIcon} />}
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default AppInput