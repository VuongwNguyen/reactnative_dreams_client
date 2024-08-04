import {TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Assets} from '../styles';
import {AppInputStyle} from '../styles/components/input/InputStyle';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
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
      opacity: interpolate(
        translateY.value,
        [0, -16 * 2],
        [0, 1],
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
        placeholder={label}
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
          <FontAwesome6
            name={isHide ? Assets.icon.eyeOpen : Assets.icon.eyeClose}
            size={16}
            color="black"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
