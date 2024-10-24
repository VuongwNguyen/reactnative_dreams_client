import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';

import React, {useState, useRef, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import {accountDetailStyle} from '../../styles/accountdetail/AccountDetailStyle';
import AppHeader from '../../components/Header';
import TagInf from '../../components/TagInf';
import {Assets} from '../../styles';
import useImagePicker from './ImagePickerAvt';

import {APIPersonalDetailInf} from '../../store/api/InfAPI';
import DateOfBirthDialog from '../../components/bottomsheet/DateOfBirthDialog';
import NicknameDialog from '../../components/bottomsheet/NicknameDialog';
import DescriptionDialog from '../../components/bottomsheet/DescriptionDialog';
import UsernameDialog from '../../components/bottomsheet/UsernameDialog';
import LocationDialog from '../../components/bottomsheet/LocationDialog';
import NationalityDialog from '../../components/bottomsheet/NationalittyDialog';
import HobbyDialog from '../../components/bottomsheet/HobbyDialog';
import HometownDialog from '../../components/bottomsheet/HometownDialog';
import EducationDialog from '../../components/bottomsheet/EducationDialog';
import GenderDialog from '../../components/bottomsheet/GenderDialog';
import JobDialog from '../../components/bottomsheet/JobDialog';
import RlstStatusDialog from '../../components/bottomsheet/RltsStatusDialog';

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
  const dispatch = useDispatch();
  const {image, setImage, openImageLibrary, onOpenCamera} = useImagePicker();

  const [modalVisible, setModalVisible] = useState(false);
  const [personalInf, setPersonalInf] = useState('');
  const [basicInfData, setBasicInfData] = useState([]);
  const [otherInfData, setOtherInfData] = useState([]);

  useEffect(() => {
    dispatch(APIPersonalDetailInf())
      .unwrap()
      .then(res => {
        setPersonalInf(res?.data);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  }, []);

  const basicInfUI = [
    {key: 'fullname', title: 'Username'},
    {key: 'nick', title: 'Nickname'},
    {key: 'dob', title: 'Day of birth'},
    {key: 'gender', title: 'Gender'},
    {key: 'natl', title: 'Nationality'},
    {key: 'htown', title: 'Hometown'},
  ];
  const otherInfUI = [
    {key: 'des', title: 'Description'},
    {key: 'zone', title: 'Location'},
    {key: 'job', title: 'Job'},
    {key: 'edu', title: 'Education'},
    {key: 'zodiac', title: 'Zodiac'},
    {key: 'hobby', title: 'Hobby'},
    {key: 'rlts', title: 'Relationship status'},
  ];
  useEffect(() => {
    if (!!personalInf) {
      const basicInfArr = basicInfUI.map(uiItem => {
        const apiItem = personalInf?.basicInformation.find(
          apiItem => apiItem.key === uiItem.key,
        );
        return {
          ...uiItem,
          ...apiItem,
        };
      });
      setBasicInfData(basicInfArr);

      const otherInfArr = otherInfUI.map(uiItem => {
        const apiItem = personalInf?.otherInformation.find(
          apiItem => apiItem.key === uiItem.key,
        );
        return {
          ...uiItem,
          ...apiItem,
        };
      });
      setOtherInfData(otherInfArr);
    }
  }, [personalInf]);

  const dialogRefs = {
    dob: useRef(null),
    nick: useRef(null),
    fullname: useRef(null),
    gender: useRef(null),
    natl: useRef(null),
    htown: useRef(null),
    des: useRef(null),
    zone: useRef(null),
    edu: useRef(null),
    hobby: useRef(null),
    job: useRef(null),
    rlts: useRef(null),
  };

  const openDialog = id => {
    dialogRefs[id]?.current?.open();
  };

  const showBasicInf = () => {
    return (
      <View style={accountDetailStyle.infBox}>
        {basicInfData.map((item, index) => (
          <TagInf
            key={item.key}
            tagTitle={item.title}
            content={!!item.value ? item.value : 'null'}
            icon={Assets.icons[item.key]}
            func={() => openDialog(item.key)}
          />
        ))}
      </View>
    );
  };

  const showOtherInf = () => {
    return (
      <View style={accountDetailStyle.infBox}>
        {otherInfData.map((item, index) => (
          <TagInf
            key={item.key}
            tagTitle={item.title}
            content={item.value}
            icon={Assets.icons[item.key]}
            func={() => openDialog(item.key)}
          />
        ))}
      </View>
    );
  };

  const updateBirthday = (dateString, zodiacSign) => {
    setBasicInfData(prev =>
      prev.map(item =>
        item.key === 'dob' ? {...item, value: dateString} : item,
      ),
    );
    setOtherInfData(prev =>
      prev.map(item =>
        item.key === 'zodiac' ? {...item, value: zodiacSign} : item,
      ),
    );
    // console.log(dateString);
    // console.log(zodiacSign);
  };
  const updateNickname = newNickname => {
    setBasicInfData(prev =>
      prev.map(item =>
        item.key === 'nick' ? {...item, value: newNickname} : item,
      ),
    );
  };
  const updateEdu = newEdu => {
    setOtherInfData(prev =>
      prev.map(item => (item.key === 'edu' ? {...item, value: newEdu} : item)),
    );
  };
  const updateHobby = newHobby => {
    setOtherInfData(prev =>
      prev.map(item =>
        item.key === 'hobby' ? {...item, value: newHobby} : item,
      ),
    );
  };
  const updateRlst = newStatus => {
    setOtherInfData(prev =>
      prev.map(item =>
        item.key === 'rlst' ? {...item, value: newStatus} : item,
      ),
    );
  };
  const updateJob = newJob => {
    setOtherInfData(prev =>
      prev.map(item => (item.key === 'job' ? {...item, value: newJob} : item)),
    );
  };
  const updateCountry = newCountry => {
    setBasicInfData(prev =>
      prev.map(item =>
        item.key === 'natl' ? {...item, value: newCountry} : item,
      ),
    );
  };
  const updateLocation = newAddress => {
    setOtherInfData(prev =>
      prev.map(item =>
        item.key === 'zone' ? {...item, value: newAddress} : item,
      ),
    );
  };
  const updateDesc = newDesc => {
    setOtherInfData(prev =>
      prev.map(item => (item.key === 'des' ? {...item, value: newDesc} : item)),
    );
  };
  const updateHtown = newHtown => {
    setBasicInfData(prev =>
      prev.map(item =>
        item.key === 'htown' ? {...item, value: newHtown} : item,
      ),
    );
  };
  const updateFullname = newName => {
    setBasicInfData(prev =>
      prev.map(item =>
        item.key === 'fullname' ? {...item, value: newName} : item,
      ),
    );
  };
  const updateGender = newGender => {
    setBasicInfData(prev =>
      prev.map(item =>
        item.key === 'gender' ? {...item, value: newGender} : item,
      ),
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={accountDetailStyle.container}>
        <AppHeader title={t('accountDetailScreen.infTitle')} />
        {!!basicInfData && !!otherInfData && !!personalInf ? (
          <View style={accountDetailStyle.bodyContainer}>
            <View style={accountDetailStyle.avtContainer}>
              <Image
                source={{
                  uri: image?.[0]?.uri || personalInf?.avatar,
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
                        <Text style={accountDetailStyle.optionText}>
                          Camera
                        </Text>
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

                        <Text style={accountDetailStyle.optionText}>
                          Gallery
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={accountDetailStyle.optionItem}
                        onPress={() => {
                          setImage([
                            {
                              uri: 'https://i.pinimg.com/564x/75/11/c5/7511c5289164c5644782b76e9d122f20.jpg',
                            },
                          ]);
                          setModalVisible(false);
                        }}>
                        <Image
                          source={Assets.icons.trash}
                          style={{width: 20, height: 20}}
                        />
                        <Text style={accountDetailStyle.optionText}>
                          Remove
                        </Text>
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
        ) : (
          <View style={accountDetailStyle.loadingContainer}>
            <ActivityIndicator
              size="large"
              color="#ededed"
              style={{justifyContent: 'center'}}
            />
          </View>
        )}

        {/* Dialogs */}
        <DateOfBirthDialog ref={dialogRefs.dob} onSubmit={updateBirthday} />
        <NicknameDialog ref={dialogRefs.nick} onSubmit={updateNickname} />
        <EducationDialog ref={dialogRefs.edu} onSubmit={updateEdu} />
        <UsernameDialog ref={dialogRefs.fullname} onSubmit={updateFullname} />
        <HobbyDialog ref={dialogRefs.hobby} onSubmit={updateHobby} />
        <HometownDialog ref={dialogRefs.htown} onSubmit={updateHtown} />
        <GenderDialog ref={dialogRefs.gender} onSubmit={updateGender} />
        <NationalityDialog ref={dialogRefs.natl} onSubmit={updateCountry} />
        <LocationDialog ref={dialogRefs.zone} onSubmit={updateLocation} />
        <DescriptionDialog ref={dialogRefs.des} onSubmit={updateDesc} />
        <JobDialog ref={dialogRefs.job} onSubmit={updateJob} />
        <RlstStatusDialog ref={dialogRefs.rlts} onSubmit={updateRlst} />
      </View>
    </ScrollView>
  );
};

export default AccountDetailScreen;
