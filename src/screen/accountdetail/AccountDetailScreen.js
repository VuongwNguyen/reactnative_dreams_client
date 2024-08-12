import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {accountDetailStyle} from '../../styles/accountdetail/AccountDetailStyle';
import {useTranslation} from 'react-i18next';
import AppHeader from '../../components/Header';
import TagInf from './TagInf';
import {Assets} from '../../styles';
import AppButton from '../../components/Button';

const AccountDetailScreen = () => {
  const {t} = useTranslation();
  const goBackScreen = () => {};
  const onSave = () => {};
  return (
    <ScrollView
      style={accountDetailStyle.container}
      showsVerticalScrollIndicator={false}
      scrollEnabled={true}>
      <View style={accountDetailStyle.headerContainer}>
        <AppHeader
          title={t('accountDetailScreen.infTitle')}
          goBack={goBackScreen}
        />
      </View>

      <View style={accountDetailStyle.bodyContainer}>
        <View style={accountDetailStyle.avtContainer}>
          <Image source={Assets.image.avt} style={accountDetailStyle.avt} />
          <TouchableOpacity style={accountDetailStyle.changeAvtButton}>
            <Image source={Assets.image.ic_change} />
          </TouchableOpacity>
        </View>

        <View style={accountDetailStyle.groupInfContainer}>
          <Text style={accountDetailStyle.typeInf}>
            {t('accountDetailScreen.basic')}
          </Text>
          <View style={accountDetailStyle.infBox}>
            <TagInf
              tagTitle={t('accountDetailScreen.username')}
              content={'usernam'}
              icon={Assets.icon.user}
            />
            <TagInf
              tagTitle={t('accountDetailScreen.username')}
              content={'usernam'}
              icon={Assets.icon.user}
            />
            <TagInf
              tagTitle={t('accountDetailScreen.username')}
              content={'usernam'}
              icon={Assets.icon.user}
            />
          </View>
        </View>
        <View style={accountDetailStyle.groupInfContainer}>
          <Text style={accountDetailStyle.typeInf}>
            {t('accountDetailScreen.other')}
          </Text>
          <View style={accountDetailStyle.infBox}>
            <TagInf
              tagTitle={t('accountDetailScreen.username')}
              content={'usernam'}
              icon={Assets.icon.user}
            />
            <TagInf
              tagTitle={t('accountDetailScreen.username')}
              content={'usernam'}
              icon={Assets.icon.user}
            />
            <TagInf
              tagTitle={t('accountDetailScreen.username')}
              content={'usernam'}
              icon={Assets.icon.user}
            />
            <TagInf
              tagTitle={t('accountDetailScreen.username')}
              content={'usernam'}
              icon={Assets.icon.user}
            />
          </View>
        </View>
        <View style={accountDetailStyle.button}>
          <AppButton title={t('accountDetailScreen.save')} onPress={onSave} />
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountDetailScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 'auto',
  },
});
