import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {dec, inc} from '../store/slices/example';
import {useTranslation} from 'react-i18next';
import i18n from '../lang';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export default function Counter() {
  const count = useSelector(state => state.count);
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const changeLanguage = () => {
    if (i18n.language === 'vi') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('vi');
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.counter}>
        {t('counter')}: {count}
      </Text>
      <TouchableOpacity style={style.button} onPress={() => dispatch(inc())}>
        <Text>Increment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.button} onPress={() => dispatch(dec())}>
        <Text>Decrement</Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.button} onPress={changeLanguage}>
        <Text>Change Language</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  counter: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 16,
    marginBottom: 8,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
