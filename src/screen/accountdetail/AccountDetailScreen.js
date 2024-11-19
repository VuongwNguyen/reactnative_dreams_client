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
import {useDispatch, useSelector} from 'react-redux';

import {accountDetailStyle} from '../../styles/accountdetail/AccountDetailStyle';
import AppHeader from '../../components/Header';
import TagInf from '../../components/TagInf';
import {Assets, Colors} from '../../styles';
import useImagePicker from './ImagePickerAvt';
import {
  APIPersonalDetailInf,
  APIUpdateAvtUsername,
} from '../../store/api/InfAPI';
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
import {APIGetUserBasicInf} from '../../store/api/AccountAPI';

const AccountDetailScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {image, setImage, openImageLibrary, onOpenCamera} = useImagePicker();

  const [modalVisible, setModalVisible] = useState(false);
  const [personalInf, setPersonalInf] = useState('');
  const [basicInfData, setBasicInfData] = useState([]);
  const [otherInfData, setOtherInfData] = useState([]);
  const [isLoadingAvt, setIsLoadingAvt] = useState(false);

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

  const handleChangeAvt = () => {
    setIsLoadingAvt(true);

    if (image) {
      const formData = new FormData();
      if (image?.[0]?.fileName) {
        formData.append('avatar', {
          uri: image?.[0]?.uri,
          name: image?.[0]?.fileName,
          type: image?.[0]?.type,
        });
      } else {
        formData.append('avatar', {
          uri: image?.[0]?.uri,
          name: 'defaultAvt.jpg',
          type: 'image/jpeg',
        });
      }

      dispatch(APIUpdateAvtUsername(formData))
        .unwrap()
        .then(res => {
          setIsLoadingAvt(false);

          ToastAndroid.show('Cập nhật avatar thành công', ToastAndroid.SHORT);
          dispatch(APIGetUserBasicInf());
        })
        .catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    }
  };
  useEffect(() => {
    if (image) {
      handleChangeAvt();
    }
  }, [image]);
  useEffect(() => {
    if (isLoadingAvt) ToastAndroid.show('Đang cập nhật...', ToastAndroid.SHORT);
  }, [isLoadingAvt]);

  const basicInfUI = [
    {key: 'fullname', title: t('profileScreen.infomationTab.fullname')},
    {key: 'nick', title: t('profileScreen.infomationTab.nick')},
    {key: 'dob', title: t('profileScreen.infomationTab.dob')},
    {key: 'gender', title: t('profileScreen.infomationTab.gender')},
    {key: 'natl', title: t('profileScreen.infomationTab.natl')},
    {key: 'htown', title: t('profileScreen.infomationTab.htown')},
  ];
  const otherInfUI = [
    {key: 'des', title: t('profileScreen.infomationTab.des')},
    {key: 'zone', title: t('profileScreen.infomationTab.zone')},
    {key: 'job', title: t('profileScreen.infomationTab.job')},
    {key: 'edu', title: t('profileScreen.infomationTab.edu')},
    {key: 'zodiac', title: t('profileScreen.infomationTab.zodiac')},
    {key: 'hobby', title: t('profileScreen.infomationTab.hobby')},
    {key: 'rlts', title: t('profileScreen.infomationTab.rlts')},
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
            content={!!item.value ? item.value : 'null'}
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
  const getValueByKey = (dataArray, key) => {
    return dataArray.find(item => item.key === key)?.value || null;
  };
  const nicknameValue = getValueByKey(basicInfData, 'nick');
  const usernameValue = getValueByKey(basicInfData, 'fullname');
  const [firstName, lastName] = usernameValue
    ? usernameValue.split(' ')
    : ['', ''];
  const descValue = getValueByKey(otherInfData, 'des');
  const naltValue = getValueByKey(basicInfData, 'natl');
  const locationValue = getValueByKey(otherInfData, 'zone');
  const htownValue = getValueByKey(basicInfData, 'htown');
  const genderValue = getValueByKey(basicInfData, 'gender');
  const rlstValue = getValueByKey(otherInfData, 'rlst');
  const jobValue = getValueByKey(otherInfData, 'job');
  const [job, , workplace] = jobValue ? jobValue.split(' ') : ['', , ''];
  const eduValue = getValueByKey(otherInfData, 'edu');
  const [level, , school] = eduValue ? eduValue.split(' ') : ['', , ''];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={accountDetailStyle.scrollContainer}>
      <AppHeader title={t('accountDetailScreen.infTitle')} />
      <View style={accountDetailStyle.container}>
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
              {isLoadingAvt && (
                <ActivityIndicator
                  size={'large'}
                  color={Colors.primary}
                  style={accountDetailStyle.loadingAvt}
                />
              )}
            </View>
            {/* View modal */}
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setModalVisible(false);
                }}>
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
        <NicknameDialog
          ref={dialogRefs.nick}
          onSubmit={updateNickname}
          data={nicknameValue}
        />
        <EducationDialog
          ref={dialogRefs.edu}
          onSubmit={updateEdu}
          level={level}
          school={school}
        />
        <UsernameDialog
          ref={dialogRefs.fullname}
          onSubmit={updateFullname}
          firstName={firstName}
          lastName={lastName}
        />
        <HobbyDialog ref={dialogRefs.hobby} onSubmit={updateHobby} />
        <HometownDialog
          ref={dialogRefs.htown}
          onSubmit={updateHtown}
          data={htownValue}
        />
        <GenderDialog
          ref={dialogRefs.gender}
          onSubmit={updateGender}
          data={genderValue}
        />
        <NationalityDialog
          ref={dialogRefs.natl}
          onSubmit={updateCountry}
          data={naltValue}
        />
        <LocationDialog
          ref={dialogRefs.zone}
          onSubmit={updateLocation}
          data={locationValue}
        />
        <DescriptionDialog
          ref={dialogRefs.des}
          onSubmit={updateDesc}
          data={descValue}
        />
        <JobDialog
          ref={dialogRefs.job}
          onSubmit={updateJob}
          job={job}
          workplace={workplace}
        />
        <RlstStatusDialog
          ref={dialogRefs.rlts}
          onSubmit={updateRlst}
          data={rlstValue}
        />
      </View>
    </ScrollView>
  );
};

export default AccountDetailScreen;
