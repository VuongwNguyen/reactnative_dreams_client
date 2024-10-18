import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useState, useMemo} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {MultiSelect} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';

import AppHeader from '../../components/Header';
import {newPostStyle} from '../../styles/newpost/NewPostStyle';
import {Assets, Colors} from '../../styles';
import useImagePicker from './ImagePickerPost';
import {stackName} from '../../navigations/screens';
import {APICreatePost} from '../../store/api/PostAPI';
import {useDispatch} from 'react-redux';
import {APIGetFollowing} from '../../store/api/FollowAPI';

const NewPostScreen = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const {
    images,
    videos,
    setVideos,
    setImages,
    pickMedia,
    onOpenCamera,
    onOpenVideoCamera,
  } = useImagePicker();

  const pricvacyData = [
    {label: 'Public', value: 'public'},
    {label: 'Private', value: 'private'},
  ];
  const itemSelected = [...images, ...videos];

  const [isPreviewed, setIsPreviewed] = useState(true);
  const [value, setValue] = useState(pricvacyData[0].value);
  const [openLine, setOpenLine] = useState('');
  const [postContent, setPostContent] = useState('');
  const [privacyStatus, setPrivacyStatus] = useState('public');
  const [modalTagUserVisible, setModalTagUserVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [selectedFullNames, setSelectedFullNames] = useState([]);

  const [data, setData] = useState([]);
  const [fetchAPIStatus, setFetchAPIStatus] = useState('loading');
  const [hashTagList, setHashTagList] = useState([]);
  const [modalHashTagVisible, setModalHashtagVisible] = useState(false);
  const [hashTagField, setHashTagField] = useState('');

  const handleRemoveImage = index => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleRemoveVideo = item => {
    const filteredVideo = videos.filter(video => video?.uri !== item);
    setVideos(filteredVideo);
  };

  const renderImg = () => {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={newPostStyle.imgContainer}>
        {itemSelected.map((item, index) => (
          <TouchableOpacity style={newPostStyle.imgBox} key={index}>
            {item?.type.includes('video') && (
              <Image
                source={Assets.icons.playVideo}
                style={newPostStyle.icPlay}
              />
            )}
            <Image source={{uri: item?.uri}} style={newPostStyle.imgPost} />
            <TouchableOpacity
              style={newPostStyle.removeIcon}
              onPress={() =>
                item?.type.includes('video')
                  ? handleRemoveVideo(item?.uri)
                  : handleRemoveImage(index)
              }>
              <Image
                source={Assets.icons.close}
                style={newPostStyle.icDelete}
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  Keyboard.addListener('keyboardDidShow', () => {
    setIsPreviewed(false);
  });

  Keyboard.addListener('keyboardDidHide', () => {
    setIsPreviewed(true);
  });

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append('content', postContent);
    formData.append('title', openLine);

    selected.length > 0 &&
      selected.forEach(id => {
        formData.append('tagUsers', id);
      });
    hashTagList.length > 0 &&
      hashTagList.forEach(item => {
        formData.append('hashtags', item);
      });

    images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        name: `image_${image.fileName}.${image.type.split('/')[1]}`,
        type: image.type,
      });
    });

    videos.forEach((video, index) => {
      console.log(video);

      formData.append('videos', {
        uri: video.uri,
        name: `video_${video.fileName}.${video.type.split('/')[1]}`,
        type: video.type,
      });
    });

    dispatch(APICreatePost(formData))
      .unwrap()
      .then(res => {
        ToastAndroid.show('Đăng bài thành công!', ToastAndroid.SHORT);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  const handleTagUser = () => {
    setModalTagUserVisible(true);
    dispatch(APIGetFollowing('67010e3da2ce9ed2d170ba13'))
      .then(res => {
        setFetchAPIStatus(res?.meta?.requestStatus);
        setData(res?.payload?.data?.list);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  const handelHashtag = () => {
    setModalHashtagVisible(true);
  };
  const userData = data?.map(item => {
    return {
      id: item?.following?._id,
      fullname: `${item?.following?.first_name} ${item?.following?.last_name}`,
      avt: item?.following?.avatar.url,
    };
  });

  const renderItem = item => {
    return (
      <View style={newPostStyle.item} key={item.id}>
        {/* <Image source={Assets.icons.user} /> */}
        <Image source={{uri: item.avt}} style={{ width:24,height:24,borderRadius:12}} />
        <Text style={newPostStyle.selectedTextStyle}>{item.fullname}</Text>
      </View>
    );
  };

  const renderedFullNames = useMemo(() => {
    return selectedFullNames.map((item, index) => (
      <Text style={newPostStyle.primaryText} key={index}>
        @{item}
      </Text>
    ));
  }, [selectedFullNames]);

  const renderedHashTags = useMemo(() => {
    return hashTagList.map((item, index) => (
      <Text style={newPostStyle.primaryText} key={index}>
        #{item}
      </Text>
    ));
  }, [hashTagList]);
  return (
    <View style={newPostStyle.container}>
      <AppHeader
        title={t('newPostScreen.title')}
        rightButton={true}
        rightButtonTitle={t('newPostScreen.post')}
        rightButtonAction={handleCreatePost}
      />

      <ScrollView contentContainerStyle={newPostStyle.scrollContainer}>
        <View style={newPostStyle.bodyContainer}>
          <View style={newPostStyle.accountContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(stackName.profile.name);
              }}>
              <Image style={newPostStyle.avt} source={Assets.image.avt} />
            </TouchableOpacity>

            <View style={newPostStyle.inf}>
              <Text style={newPostStyle.userName}>Username</Text>
              <Dropdown
                data={pricvacyData}
                labelField="label"
                valueField="value"
                value={value}
                selectedTextStyle={newPostStyle.privacyStatus}
                itemTextStyle={newPostStyle.dropdownLabel}
                onChange={item => {
                  setValue(item.value);
                  setPrivacyStatus(item.value);
                }}
                renderLeftIcon={() => (
                  <Image
                    source={
                      privacyStatus == 'public'
                        ? Assets.icons.earth
                        : Assets.icons.privacy
                    }
                    style={{height: 20, width: 20, marginRight: 5}}
                  />
                )}
                style={newPostStyle.privacyDropdown}
              />
            </View>
          </View>

          <View style={newPostStyle.postContainer}>
            <TextInput
              multiline={true}
              placeholder={t('newPostScreen.openLine')}
              placeholderTextColor={Colors.secondary}
              value={openLine}
              onChangeText={text => setOpenLine(text)}
              style={newPostStyle.openLine}
            />
            <TextInput
              multiline={true}
              placeholder={t('newPostScreen.contentPost')}
              placeholderTextColor={Colors.secondary}
              value={postContent}
              onChangeText={text => setPostContent(text)}
              style={newPostStyle.contentPost}
            />
          </View>

          <View style={newPostStyle.showDataFromDialog}>
            <View>
              {selectedFullNames.length > 0 && (
                <View style={newPostStyle.dataDialogRow}>
                  {renderedFullNames}
                </View>
              )}
            </View>
            <View>
              {hashTagList.length > 0 && (
                <View style={newPostStyle.dataDialogRow}>
                  {renderedHashTags}
                </View>
              )}
            </View>
          </View>
          <View style={newPostStyle.showAttachContainer}>
            {itemSelected?.[0]?.uri && isPreviewed ? renderImg() : ''}
            <View style={newPostStyle.attachmentContainer}>
              <TouchableOpacity onPress={() => onOpenCamera()}>
                <Image source={Assets.icons.camera} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onOpenVideoCamera()}>
                <Image source={Assets.icons.video} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => pickMedia('image')}>
                <Image source={Assets.icons.gallery} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => pickMedia('video')}>
                <Image source={Assets.icons.videoGallery} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTagUser()}>
                <Image source={Assets.icons.tagUser} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handelHashtag()}>
                <Image source={Assets.icons.hashTag} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* modal tag user */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalTagUserVisible}
        onRequestClose={() => {
          setModalTagUserVisible(!modalTagUserVisible);
        }}>
        <View style={newPostStyle.modalView}>
          <View style={newPostStyle.centeredView}>
            <Text style={newPostStyle.modalTitle}>Tag User</Text>
            <MultiSelect
              style={newPostStyle.dropdown}
              placeholderStyle={newPostStyle.placeholderStyle}
              selectedTextStyle={newPostStyle.selectedTextStyle}
              inputSearchStyle={newPostStyle.inputSearchStyle}
              iconStyle={newPostStyle.iconStyle}
              data={userData}
              labelField="fullname"
              valueField="id"
              placeholder="Select users"
              value={selected}
              search
              searchPlaceholder="Search..."
              onChange={item => {
                setSelected(item);
                const updatedFullNames = item.map(id => {
                  const user = userData.find(ele => ele.id === id);
                  return user?.fullname;
                });
                setSelectedFullNames(updatedFullNames);
              }}
              renderLeftIcon={() => (
                <Image
                  source={Assets.icons.tagUser}
                  style={{marginRight: 10}}
                />
              )}
              renderItem={renderItem}
              renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity
                  onPress={() => unSelect && unSelect(item)}
                  key={item.id}>
                  <View style={newPostStyle.selectedStyle}>
                    <Image source={{uri: item?.avt}} style={{ width:24,height:24,borderRadius:12}}/>
                    <Text style={newPostStyle.textSelectedStyle}>
                      {item.fullname}
                    </Text>
                    <Image
                      source={Assets.icons.delete}
                      style={{width: 16, height: 16}}
                    />
                  </View>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={newPostStyle.cancelBtn}
              onPress={() => setModalTagUserVisible(false)}>
              <Text style={newPostStyle.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/*  */}
      {/* Modal hashtag */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalHashTagVisible}
        onRequestClose={() => {
          setModalHashtagVisible(!modalHashTagVisible);
        }}>
        <View style={newPostStyle.modalView}>
          <View style={newPostStyle.centeredView}>
            <Text style={newPostStyle.modalTitle}>Hash Tag</Text>
            <View style={newPostStyle.inputRow}>
              <TextInput
                placeholder="Enter your hashtag"
                placeholderTextColor={Colors.secondary}
                value={hashTagField}
                onChangeText={text => setHashTagField(text)}
                style={newPostStyle.hashTagInput}
              />
              <TouchableOpacity
                style={newPostStyle.addBtn}
                onPress={() => {
                  !!hashTagField &&
                    setHashTagList(prevList => [...prevList, hashTagField]);
                  setHashTagField('');
                }}>
                <Text style={newPostStyle.addLabel}>Add</Text>
              </TouchableOpacity>
            </View>
            {hashTagList.length > 0 && (
              <View style={newPostStyle.dataDialogRow}>
                {hashTagList?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={newPostStyle.selectedStyle}
                      onPress={() => {
                        setHashTagList(prevList => {
                          const newList = [...prevList];
                          newList.splice(index, 1);
                          return newList;
                        });
                      }}>
                      <Text style={newPostStyle.textSelectedStyle}>{item}</Text>
                      <Image
                        source={Assets.icons.delete}
                        style={{width: 16, height: 16}}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            <TouchableOpacity
              style={newPostStyle.cancelBtn}
              onPress={() => setModalHashtagVisible(false)}>
              <Text style={newPostStyle.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({});
