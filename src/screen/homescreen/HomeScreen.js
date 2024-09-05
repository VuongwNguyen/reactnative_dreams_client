import {View, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import TopBarNavigationHome from '../../navigations/TopBarNavigationHome';
import {HomeStyles} from '../../styles/homestyle/homestyle';
import {Assets} from '../../styles';
import {useTranslation} from 'react-i18next';
import {stackName} from '../../navigations/screens';

const HomeScreen = props => {
  const {navigation} = props;
  const inputSearch = useRef(null);
  const {t} = useTranslation();
  return (
    <View style={HomeStyles.container}>
      <View style={HomeStyles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate(stackName.accountDetail.name, {})}>
          <Image
            style={HomeStyles.avatar}
            source={{
              uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(stackName.search.name)}
          style={HomeStyles.wraperInputSearch}>
          <TextInput
            ref={inputSearch}
            style={HomeStyles.inputSearch}
            placeholder={t('homeScreen.search')}
            editable={false}
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
        </TouchableOpacity>
      </View>
      <TopBarNavigationHome />
    </View>
  );
};

export default HomeScreen;
