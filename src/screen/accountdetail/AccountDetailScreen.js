import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {accountDetailStyle} from '../../styles/accountdetail/AccountDetailStyle';
import {useTranslation} from 'react-i18next';
import AppHeader from '../../components/Header';
import TagInf from './TagInf';
import {Assets} from '../../styles';
import useImagePicker from './ImagePickerAvt';
const basicInfArr = [
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
];
const otherInfArr = [
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
  {title: 'Title', icon: Assets.icon.user, content: 'content'},
];
const showBasicInf = () => {
  return (
    <View style={accountDetailStyle.infBox}>
      {basicInfArr.map((item, index) => (
        <TagInf
          key={index}
          tagTitle={item.title}
          content={item.content}
          icon={item.icon}
        />
      ))}
    </View>
  );
};

const showOtherInf = () => {
  return (
    <View style={accountDetailStyle.infBox}>
      {otherInfArr.map((item, index) => (
        <TagInf
          key={index}
          tagTitle={item.title}
          content={item.content}
          icon={item.icon}
        />
      ))}
    </View>
  );
};

const AccountDetailScreen = () => {
  const {t} = useTranslation();
  const {image, setImage, openImageLibrary, onOpenCamera} = useImagePicker();
  const [modalVisible, setModalVisible] = useState(false);

  const goBackScreen = () => {};
  const onSave = () => {};
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={accountDetailStyle.container}>
        <AppHeader
          title={t('accountDetailScreen.infTitle')}
          goBack={goBackScreen}
        />

        <View style={accountDetailStyle.bodyContainer}>
          <View style={accountDetailStyle.avtContainer}>
            <Image
              source={{
                uri:
                  image?.[0]?.uri ||
                  'https://i.pinimg.com/564x/0f/78/5d/0f785d55cea2a407ac8c1d0c6ef19292.jpg',
              }}
              style={accountDetailStyle.avt}
            />
            <TouchableOpacity
              style={accountDetailStyle.changeAvtButton}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image source={Assets.image.ic_change} />
            </TouchableOpacity>
          </View>
          {/* View modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={accountDetailStyle.modalView}>
                <View style={accountDetailStyle.centeredView}>
                  <Text style={accountDetailStyle.modalTitle}>
                    Profile photo
                  </Text>
                  <View style={accountDetailStyle.optionContainer}>
                    <TouchableOpacity
                      style={accountDetailStyle.optionItem}
                      onPress={() => {
                        onOpenCamera();
                        setModalVisible(false);
                      }}>
                      <Image
                        source={Assets.image.ic_camera}
                        style={accountDetailStyle.optionIconSize}
                      />
                      <Text style={accountDetailStyle.optionText}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={accountDetailStyle.optionItem}
                      onPress={() => {
                        openImageLibrary();
                        setModalVisible(false);
                      }}>
                      <Image
                        source={Assets.image.ic_gallery}
                        style={accountDetailStyle.optionIconSize}
                      />
                      <Text style={accountDetailStyle.optionText}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={accountDetailStyle.optionItem}
                      onPress={() => {
                        setImage('');
                        setModalVisible(false);
                      }}>
                      <Image
                        source={Assets.image.ic_delete}
                        style={accountDetailStyle.optionIconSize}
                      />
                      <Text style={accountDetailStyle.optionText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          {/*  */}
          <View style={accountDetailStyle.groupInfContainer}>
            <Text style={accountDetailStyle.typeInf}>
              {t('accountDetailScreen.basic')}
            </Text>
            {showBasicInf()}
          </View>
          <View style={accountDetailStyle.groupInfContainer}>
            <Text style={accountDetailStyle.typeInf}>
              {t('accountDetailScreen.other')}
            </Text>
            {showOtherInf()}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AccountDetailScreen;
