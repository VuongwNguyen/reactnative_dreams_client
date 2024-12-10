import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
import {stackName} from '../../navigations/screens';
import TopBarNavigationHome from '../../navigations/TopBarNavigationHome';
import {Assets} from '../../styles';
import {HomeStyles} from '../../styles/homestyle/homestyle';

const getInterpolation = (
  value,
  startOut,
  endOut,
  startIn = 0,
  endIn = 100,
) => {
  'worklet';
  return interpolate(value, [startIn, endIn], [startOut, endOut], {
    extrapolateLeft: Extrapolation.CLAMP,
    extrapolateRight: Extrapolation.CLAMP,
  });
};

const HomeScreen = props => {
  const {t} = useTranslation();
  const {userBasicInfData} = useSelector(state => state.userBasicInf);

  const translationY = useSharedValue(0);
  const previousScrollY = useSharedValue(0);
  const isScrollingDown = useSharedValue(true);
  const lastUpdate = useSharedValue(0);
  const navigation = useNavigation();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      const currentY = e.contentOffset.y;
      translationY.value = currentY;

      if (Math.abs(currentY - previousScrollY.value) > 10) {
        if (Date.now() - lastUpdate.value > 500) {
          isScrollingDown.value = currentY > previousScrollY.value;
          previousScrollY.value = currentY;
          lastUpdate.value = Date.now();
        }
      }

      // Reset khi cuộn về đầu
      if (currentY <= 0) {
        isScrollingDown.value = true;
        previousScrollY.value = 0;
      }
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = isScrollingDown.value
      ? getInterpolation(translationY.value, 60, 0)
      : getInterpolation(translationY.value, 0, 60);

    const translateY = isScrollingDown.value
      ? getInterpolation(translationY.value, 0, -60)
      : getInterpolation(translationY.value, -60, 0);

    return {
      height,
      transform: [{translateY}],
      transition: {duration: 1000},
    };
  });

  return (
    <View style={HomeStyles.container}>
      <Animated.View style={[HomeStyles.header, headerStyle]}>
        <View style={HomeStyles.row}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(stackName.profile.name);
            }}>
            {!!userBasicInfData.avatar && (
              <Image
                style={HomeStyles.avatar}
                source={{
                  uri: userBasicInfData?.avatar,
                }}
              />
            )}
          </TouchableOpacity>
          {!!userBasicInfData?.fullname && (
            <View>
              <Text>{
                  t('hello')
                }</Text>
              <Text style={HomeStyles.name}>{userBasicInfData?.fullname}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={HomeStyles.iconButton}
          onPress={() => navigation.navigate(stackName.search.name)}>
          <Image source={Assets.icons.search} style={HomeStyles.search} />
        </TouchableOpacity>
      </Animated.View>
      <TopBarNavigationHome scrollHandler={scrollHandler} />
    </View>
  );
};

export default HomeScreen;
