import {View, Image, TextInput} from 'react-native';
import React, {useRef} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import TopBarNavigationHome from '../../navigations/TopBarNavigationHome';
import {HomeStyles} from '../../styles/homestyle/homestyle';
import {Assets} from '../../styles';
import {useTranslation} from 'react-i18next';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {stackName} from '../../navigations/screens';
import {TouchableOpacity} from 'react-native-gesture-handler';

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

  const handleSearch = () => {
    const searchText = inputSearch.current.value;

    navigation.navigate(stackName.search.name, {
      searchText: searchText,
    });
  };
  return (
    <View style={HomeStyles.container}>
      <Animated.View style={[HomeStyles.header, headerStyle]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(stackName.personalProfile.name);
          }}>
          <Image
            style={HomeStyles.avatar}
            source={{
              uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
            }}
          />
        </TouchableOpacity>
        <View style={HomeStyles.wraperInputSearch}>
          <TextInput
            ref={inputSearch}
            style={HomeStyles.inputSearch}
            placeholder={t('homeScreen.search')}
            // onPressIn={() => {
            //   navigation.navigate(stackName.search.name);
            // }}
            onSubmitEditing={handleSearch}
          />
          <Feather
            name={Assets.icon.search}
            size={24}
            color="#6c757d"
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
