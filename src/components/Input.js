import {TextInput, TouchableOpacity, View,Image} from 'react-native';
import React, {useState} from 'react';
import {Assets} from '../styles';
import {AppInputStyle} from '../styles/components/input/InputStyle';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const TextInputAnimated = Animated.createAnimatedComponent(TextInput);

export default function AppInput(props) {
  const {placeholder, value, setValue, isPassword} = props;
  const translateY = useSharedValue(0);
  const label = useSharedValue(placeholder);
  const [isHide, setIsHide] = useState(false);

  const triggerAnimation = (value, isFocus) => {
    if (isFocus) {
      translateY.value = withTiming(value);
      label.value = '';
    } else {
      translateY.value = withTiming(value, {}, isFinished => {
        if (isFinished && !isFocus) {
          label.value = placeholder;
        }
      });
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
        [16, 12],
        [16, 14],
        Extrapolation.CLAMP,
      ),
    };
  });

  return (
    <View style={AppInputStyle.container}>
      <Animated.Text style={[AppInputStyle.label, labelAnimatedStyle]}>
        {placeholder}
      </Animated.Text>
      <TextInputAnimated
        value={value}
        style={AppInputStyle.input}
        onChangeText={t => setValue(t)}
        secureTextEntry={isPassword && isHide}
        onFocus={() => {
          triggerAnimation(-10 * 2, true);
        }}
        onBlur={() => {
          let offset = 0;
          if (value) {
            offset = -10 * 2;
          }
          triggerAnimation(offset, false);
        }}
      />
      {isPassword && (
        <TouchableOpacity
          onPress={() => setIsHide(!isHide)}
          style={AppInputStyle.icon}>
          <Image source={isHide ? Assets.icons.eyeClose : Assets.icons.eye} />
        </TouchableOpacity>
      )}
    </View>
  );
}
