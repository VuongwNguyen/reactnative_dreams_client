import {View, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';

import {stackName} from '../../navigations/screens';
import TopBarNavigationHome from '../../navigations/TopBarNavigationHome';
import {HomeStyles} from '../../styles/homestyle/homestyle';
import {Assets} from '../../styles';
import {APIGetUserBasicInf} from '../../store/api/AccountAPI';

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
  const {navigation} = props;
  const inputSearch = useRef(null);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {userBasicInfData} = useSelector(state => state.userBasicInf);
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(e => {
    translationY.value = e.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = getInterpolation(translationY.value, 60, 0);
    const opacity = getInterpolation(translationY.value, 1, 0);
    const padding = getInterpolation(translationY.value, 10, 0);
    return {
      height: height,
      opacity: opacity,
      padding: padding,
    };
  });
  // console.log(userBasicInfData);

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
    <View style={HomeStyles.container}>
      <Animated.View style={[HomeStyles.header, headerStyle]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(stackName.profile.name);
          }}>
          {!!userBasicInfData.avatar && (
            <Image
              style={HomeStyles.avatar}
              source={{
                uri: userBasicInfData?.avatar.url,
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
