import {View, Image, TouchableOpacity, Text, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';

import {stackName} from '../../navigations/screens';
import {ProfileStyle} from '../../styles/profileStyle/ProfileStyle';
import AppHeader from '../../components/Header';
import TopBarNavigationProfile from '../../navigations/TopBarNavigationProfile';
import {APIGetInf} from '../../store/api/InfAPI';
import {useFocusEffect} from '@react-navigation/native';
import {Assets} from '../../styles';

const getInterpolation = (
  value,
  startOut,
  endOut,
  startIn = 0,
  endIn = 500,
) => {
  'worklet';
  return interpolate(value, [startIn, endIn], [startOut, endOut], {
    extrapolateLeft: Extrapolation.CLAMP,
    extrapolateRight: Extrapolation.CLAMP,
  });
};

const ProfileScreen = props => {
  const {navigation, route} = props;
  const userViewId = route?.params?.userViewId;

  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [coreInf, setCoreInf] = useState('');
  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(e => {
    translationY.value = e.contentOffset.y;
  });
  const headerStyle = useAnimatedStyle(() => {
    const height = getInterpolation(translationY.value, 230, 0);
    const opacity = getInterpolation(translationY.value, 1, 0);
    const padding = getInterpolation(translationY.value, 10, 0);
    return {
      height: height,
      opacity: opacity,
      padding: padding,
    };
  });

  useFocusEffect(
    React.useCallback(() => {
      dispatch(APIGetInf(userViewId))
        .unwrap()
        .then(res => {
          setCoreInf(res?.data);
        })
        .catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    }, [userViewId]),
  );

  const InforItem = ({title = '', subtitle = ''}) => {
    return (
      <View style={ProfileStyle.countItem}>
        <Text style={ProfileStyle.title}>{title}</Text>
        <Text>{subtitle}</Text>
      </View>
    );
  };
  return (
    <View style={ProfileStyle.container}>
      <View style={ProfileStyle.headerContainer}>
        <AppHeader title={t('profileScreen.profile')} />
        <TouchableOpacity
          style={ProfileStyle.editBtn}
          onPress={() => navigation.navigate(stackName.accountDetail.name)}>
          <Image source={Assets.icons.editProfile} />
        </TouchableOpacity>
      </View>
      <Animated.View style={headerStyle}>
        <View style={ProfileStyle.infoContainer}>
          {!!coreInf.avatar && (
            <Image
              style={ProfileStyle.avatar}
              source={{
                uri: coreInf?.avatar,
              }}
            />
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(stackName.following.name);
            }}>
            <InforItem
              title={coreInf?.followerCount}
              subtitle={t('profileScreen.followers')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(stackName.following.name);
            }}>
            <InforItem
              title={coreInf?.followingCount}
              subtitle={t('profileScreen.following')}
            />
          </TouchableOpacity>
          <InforItem
            title={coreInf?.postCount}
            subtitle={t('profileScreen.posts')}
          />
        </View>
        <View style={ProfileStyle.rowAlign}>
          <Text style={ProfileStyle.name}>{coreInf?.fullname}</Text>

          {!!coreInf.nickname && (
            <Text
              style={ProfileStyle.nickname}>{`(${coreInf?.nickname})`}</Text>
          )}
        </View>
        {!!coreInf.description && (
          <Text style={ProfileStyle.subtitle}>{coreInf?.description}</Text>
        )}

        {userViewId && (
          <View style={ProfileStyle.grouptButtonContainer}>
            <TouchableOpacity
              style={[ProfileStyle.buttonContainer, ProfileStyle.inboxButton]}>
              <Text style={ProfileStyle.inboxText}>
                {t('profileScreen.inbox')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[ProfileStyle.buttonContainer, ProfileStyle.followButton]}>
              <Text style={ProfileStyle.activeTabText}>
                {t('profileScreen.follow')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
      <TopBarNavigationProfile
        scrollHandler={scrollHandler}
        user_id_view={userViewId}
      />
    </View>
  );
};

export default ProfileScreen;
