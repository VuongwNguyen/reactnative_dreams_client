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
          onChangeText={t => setValue(t)}
          secureTextEntry={canReadPass}
          onFocus={() => triggerAnimation(-24, true, value)}
          onBlur={() => triggerAnimation(0, false, value)}
        />
        {
          isPassword && <TouchableOpacity onPress={() => setCanReadPass(!canReadPass)}>
            <FontAwesome6 name={canReadPass ? Assets.icon.eyeClose : Assets.icon.eyeOpen} color="black" size={16} />
          </TouchableOpacity>
        }
      </View>
    </View>
  )
}

export default AppInput