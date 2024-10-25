import { View, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';

import { stackName } from '../../navigations/screens';
import TopBarNavigationHome from '../../navigations/TopBarNavigationHome';
import { HomeStyles } from '../../styles/homestyle/homestyle';
import { Assets } from '../../styles';
import { APIGetUserBasicInf } from '../../store/api/AccountAPI';

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
  const { navigation } = props;
  const inputSearch = useRef(null);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { userBasicInfData } = useSelector(state => state.userBasicInf);

  // Shared value to track scroll position
  const translationY = useSharedValue(0);
  const previousScrollY = useSharedValue(0);
  const isScrollingDown = useSharedValue(false);

  // Scroll handler to track scroll position
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      const currentY = e.contentOffset.y;
      // Update scroll direction
      if (currentY > previousScrollY.value) {
        isScrollingDown.value = true;
      } else {
        isScrollingDown.value = false;
      }
      previousScrollY.value = currentY;
      translationY.value = currentY;
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
      height: height,
      transform: [{ translateY }],
      display: height == 60 ? 'flex' : 'none'
    };
  });


  const handleSearch = () => {
    const searchText = inputSearch.current.value;

    navigation.navigate(stackName.search.name, {
      searchText: searchText,
    });
  };

  useEffect(() => {
    dispatch(APIGetUserBasicInf());
  }, []);

  return (
    <View style={[HomeStyles.container]}>
      <Animated.View style={[HomeStyles.header, headerStyle]}>
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
        <View style={HomeStyles.wraperInputSearch}>
          <TextInput
            ref={inputSearch}
            style={HomeStyles.inputSearch}
            placeholder={t('homeScreen.search')}
            onSubmitEditing={handleSearch}
          />
          <Image
            source={Assets.icons.search}
            style={HomeStyles.iconSearch}
            onPress={() => {
              inputSearch.current.focus();
            }}
          />
        </View>
      </Animated.View>
      <TopBarNavigationHome scrollHandler={scrollHandler} />
    </View>
  );
};

export default HomeScreen;
