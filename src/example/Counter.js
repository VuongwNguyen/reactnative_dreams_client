import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dec, inc } from '../store/slices/example';
import { useTranslation } from 'react-i18next';
import i18n from '../lang';
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import EditText from '../component/EditText';

export default function Counter() {
  const count = useSelector(state => state.count);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("")


  const changeLanguage = () => {
    if (i18n.language === 'vi') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('vi');
    }
  };

  return (
    <View style={style.container}>
      <View style={{ flexDirection: 'row' }}>
        <EditText
          styleContainer={{ flex: 1 }}
          style={{ width: "100%", fontSize: 16 }}
          floatingPlaceholderStyle={{ fontSize: 16 }}
          placeholder={"Password"}
          value={password}
          onChangeText={(text) => { setPassword(text) }}
          isPassword
        />
        <EditText
          styleContainer={{ flex: 1 }}
          style={{ width: "100%", fontSize: 16 }}
          floatingPlaceholderStyle={{ fontSize: 16 }}
          placeholder={"Password"}
          value={password}
          onChangeText={(text) => { setPassword(text) }}
          isPassword
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
