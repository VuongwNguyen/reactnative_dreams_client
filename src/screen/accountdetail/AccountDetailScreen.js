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
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {accountDetailStyle} from '../../styles/accountdetail/AccountDetailStyle';
import AppHeader from '../../components/Header';
import TagInf from '../../components/TagInf';
import {Assets, Colors} from '../../styles';
import useImagePicker from './ImagePickerAvt';
import {basicInfArr, otherInfArr} from './InfoArr';

const showBasicInf = () => {
  return (
    <View style={accountDetailStyle.infBox}>
      {basicInfArr.map((item, index) => (
        <TagInf
          key={index}
          tagTitle={item.title}
          content={item.content}
          icon={item.icon}
          func={item.func}
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
          func={item.func}
        />
      ))}
    </View>
  );
};

const AccountDetailScreen = () => {
  const {t} = useTranslation();
  const {image, setImage, openImageLibrary, onOpenCamera} = useImagePicker();
  const {userBasicInfData} = useSelector(state => state.userBasicInf);

  const [modalVisible, setModalVisible] = useState(false);

  const goBackScreen = () => {};
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
                uri: image?.[0]?.uri || userBasicInfData.avatar,
              }}
              style={accountDetailStyle.avt}
            />
            <TouchableOpacity
              style={accountDetailStyle.changeAvtButton}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Image
                source={Assets.icons.change}
                style={{width: 20, height: 20}}
              />
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
                        source={Assets.icons.camera}
                        style={{width: 20, height: 20}}
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
                        source={Assets.icons.gallery}
                        style={{width: 20, height: 20}}
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
                        source={Assets.icons.trash}
                        style={{width: 20, height: 20}}
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
