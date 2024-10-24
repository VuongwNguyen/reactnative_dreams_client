import { View, Image, TouchableOpacity, Text, ToastAndroid } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

import { stackName } from '../../navigations/screens';
import { ProfileStyle } from '../../styles/profileStyle/ProfileStyle';
import AppHeader from '../../components/Header';
import TopBarNavigationProfile from '../../navigations/TopBarNavigationProfile';
import { APIGetInf } from '../../store/api/InfAPI';

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
  const { navigation, route } = props;
  const userViewId = route?.params?.userViewId;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [coreInf, setCoreInf] = useState('');
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef(null);
  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(e => {
    translationY.value = e.contentOffset.y;
  });
  const headerStyle = useAnimatedStyle(() => {
    const height = getInterpolation(translationY.value, headerHeight == 0 ? 183 : headerHeight, 0);
    const opacity = getInterpolation(translationY.value, 1, 0);
    return {
      height: height,
      opacity: opacity,
    };
  });

  useEffect(() => {
    dispatch(APIGetInf(userViewId))
      .unwrap()
      .then(res => {
        setCoreInf(res?.data);
      })
      .catch(err => {
        console.log(err);

        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  }, []);

  const InforItem = ({ title = '', subtitle = '' }) => {
    return (
      <View style={ProfileStyle.countItem}>
        <Text style={ProfileStyle.title}>{title}</Text>
        <Text>{subtitle}</Text>
      </View>
    );
  };
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.measure((x, y, width, height) => {
        setHeaderHeight(height); // Set the measured height
      });
    }
  }, [coreInf]);

  return (
    <View style={ProfileStyle.container}>
      <AppHeader title={t('profile')} />
      <Animated.View ref={headerRef} style={headerStyle}>
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

        {!!userViewId ? (
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
        ) : (
          <View style={ProfileStyle.editBtnContainer}>
            <TouchableOpacity
              style={ProfileStyle.btnEditProfile}
              onPress={() => {
                navigation.navigate(stackName.accountDetail.name);
              }}>
              <Text style={ProfileStyle.editBtnLabel}>
                {t('profileScreen.editProfile')}
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
