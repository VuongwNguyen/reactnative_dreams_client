import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ProfileStyle} from '../../styles/profileStyle/ProfileStyle';
import Header from '../../components/Header';
import {useTranslation} from 'react-i18next';
import TopBarNavigationProfile from '../../navigations/TopBarNavigationProfile';
import {stackName} from '../../navigations/screens';

const PersonalProfileScreen = props => {
  const {t} = useTranslation();
  const {navigation} = props;
  const InforItem = ({title = '', subtitle = ''}) => {
    return (
      <View>
        <Text style={ProfileStyle.title}>{title}</Text>
        <Text>{subtitle}</Text>
      </View>
    );
  };
  return (
    <ScrollView style={ProfileStyle.container}>
      <Header title={t('profile')} />
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

      <TopBarNavigationProfile />
    </ScrollView>
  );
};

export default PersonalProfileScreen;
