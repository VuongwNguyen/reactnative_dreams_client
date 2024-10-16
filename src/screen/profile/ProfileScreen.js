import {View, Image, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {stackName} from '../../navigations/screens';
import {ProfileStyle} from '../../styles/profileStyle/ProfileStyle';
import AppHeader from '../../components/Header';
import TopBarNavigationProfile from '../../navigations/TopBarNavigationProfile';

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

  const {t} = useTranslation();
  const translationY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(e => {
    translationY.value = e.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = getInterpolation(translationY.value, 320, 0);
    const opacity = getInterpolation(translationY.value, 1, 0);
    const padding = getInterpolation(translationY.value, 10, 0);
    return {
      height: height,
      opacity: opacity,
      padding: padding,
    };
  });

  const InforItem = ({title = '', subtitle = ''}) => {
    return (
      <View>
        <Text style={ProfileStyle.title}>{title}</Text>
        <Text>{subtitle}</Text>
      </View>
    );
  };
  return (
    <View style={ProfileStyle.container}>
      <Animated.View style={headerStyle}>
        <AppHeader title={t('profile')} />
        <View style={ProfileStyle.infoContainer}>
          <Image
            style={ProfileStyle.avatar}
            source={{
              uri: 'https://th.bing.com/th/id/R.57dd0a120b370c4a7c4e0c5dbb883756?rik=ybFTeUMssGMRtA&riu=http%3a%2f%2fsammedia.vn%2fpublic%2fuploads%2fposts%2ffiles%2fchau_tinh_tri4.jpeg&ehk=SV9zLheXpUVnzmagFQv1A7mnS06N7%2fl3kuZD9gV3Ekw%3d&risl=&pid=ImgRaw&r=0',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(stackName.following.name);
            }}>
            <InforItem title="999K" subtitle={t('profileScreen.followers')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(stackName.following.name);
            }}>
            <InforItem title="999K" subtitle={t('profileScreen.following')} />
          </TouchableOpacity>
          <InforItem title="999K" subtitle={t('profileScreen.posts')} />
        </View>
        <View style={ProfileStyle.rowAlign}>
          <Text style={ProfileStyle.name}>Chí Tôn Bảo</Text>
          <Text style={ProfileStyle.nickname}>{'(Ngộ Không)'}</Text>
        </View>
        <Text style={ProfileStyle.subtitle}>
          Chí Tôn Bảo, hậu thân của Tôn Ngộ Không và là bang chủ bang Lưỡi búa
        </Text>
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
      <TopBarNavigationProfile scrollHandler={scrollHandler} />
    </View>
  );
};

export default ProfileScreen;
