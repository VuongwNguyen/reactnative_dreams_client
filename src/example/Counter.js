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
import AppEditText from '../component/AppEditText';
import AppButton from '../component/AppButton';
import { Button } from 'react-native-ui-lib';
import BottomSheetDialog from '../component/BottomSheetDialog';

export default function Counter() {
  const count = useSelector(state => state.count);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [showBottomSheet, setShowBottomSheet] = useState(false)


  const changeLanguage = () => {
    if (i18n.language === 'vi') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('vi');
    }
  };

  return (
    <View style={style.container}>

      <AppEditText
        styleContainer={{ width: "100%" }}
        style={{ fontSize: 16 }}
        floatingPlaceholderStyle={{ fontSize: 16 }}
        placeholder={"Password"}
        value={password}
        onChangeText={(text) => { setPassword(text) }}
        isPassword
      />
      <View style={{ height: 40 }} />
      <AppButton
        onPress={() => { console.log("Hello word") }}
        labelStyle={{ fontSize: 15, fontWeight: "700" }}
        label={"Save"}
        borderRadius={8}
        size={Button.sizes.small}
      />
      <View style={{ height: 40 }} />
      <AppButton
        onPress={() => { console.log("Hello word") }}
        buttonStyle={{
          width: 342, height: 70
        }}
        labelStyle={{ fontSize: 19, fontWeight: "700" }}
        label={"Hello Word"}
        borderRadius={15}
      /><View style={{ height: 40 }} />
      <AppButton
        onPress={() => { setShowBottomSheet(true) }}
        buttonStyle={{
          width: 342, height: 70,

        }}
        labelStyle={{ fontSize: 19, fontWeight: "700" }}
        label={"Show BottomSheet"}
        borderRadius={30}
      />
      {
        showBottomSheet && (
          <BottomSheetDialog
            onPress={() => { setShowBottomSheet(false) }}
          />
        )
      }
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
