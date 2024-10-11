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
} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Dropdown} from 'react-native-element-dropdown';

import AppHeader from '../../components/Header';
import {newPostStyle} from '../../styles/newpost/NewPostStyle';
import {Assets, Colors} from '../../styles';
import useImagePicker from './ImagePickerPost';
import {stackName} from '../../navigations/screens';
import {APICreatePost} from '../../store/api/PostAPI';
import {useDispatch} from 'react-redux';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

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
  const [value, setValue] = useState(data[0].value);
  const [openLine, setOpenLine] = useState('');
  const [postContent, setPostContent] = useState('');
  const [privacyStatus, setPrivacyStatus] = useState('public');
  const [modalTagUserVisible, setModalTagUserVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [fetchAPIStatus, setFetchAPIStatus] = useState('loading');

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

    dispatch(APICreatePost(formData));
  };

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
                  setIcStatus(item.value);
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
                style={newPostStyle.dropdown}
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
              <TouchableOpacity>
                <Image source={Assets.icons.tagUser} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={Assets.icons.hashTag} />
              </TouchableOpacity>
            </View>
          </View>
          {/* modal tag user */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalTagUserVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
              <View style={newPostStyle.modalView}>
                <View style={newPostStyle.centeredView}>
                  <Text style={newPostStyle.modalTitle}>Tag User</Text>
                  <MultiSelect
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={userData}
                    labelField="fullname"
                    valueField="id"
                    placeholder="Tag user"
                    value={selected}
                    search
                    searchPlaceholder="Search..."
                    onChange={item => {
                      setSelected(item);
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
                        <View style={styles.selectedStyle}>
                          <Text style={styles.textSelectedStyle}>
                            {item.fullname}
                          </Text>
                          <Image source={Assets.icons.close} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
          {/*  */}
        </View>
      </ScrollView>
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {},
});
