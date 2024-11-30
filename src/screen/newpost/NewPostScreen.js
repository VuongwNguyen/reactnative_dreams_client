import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {MentionInput} from 'react-native-controlled-mentions';
import AppHeader from '../../components/Header';
import {newPostStyle} from '../../styles/newpost/NewPostStyle';
import {Assets, Colors} from '../../styles';
import useImagePicker from './ImagePickerPost';
import {stackName} from '../../navigations/screens';
import {APICreatePost} from '../../store/api/PostAPI';
import {setIds} from '../../store/slices/IdsTagUserSlice';
import TagUserMention from './TagUserMention';
import {setPostCreated} from '../../store/slices/PostTrendingSlice';

const NewPostScreen = props => {
  const {navigation} = props;
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {userBasicInfData} = useSelector(state => state.userBasicInf);
  const ids = useSelector(state => state.idsTagUser.ids);

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
  const [postStatus, setPostStatus] = useState('');
  const [hashTag, setHashTag] = useState('');
  const [editableTextInput, setEditableTextInput] = useState(true);
  const [buttonDisable, setPostClickable] = useState(false);

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsPreviewed(false),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsPreviewed(true),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleCreatePost = async () => {
    let words;
    // kiểm tra dữ liệu tại input hashtag
    if (!!hashTag) {
      words = hashTag.split(' ');
      const invalidWords = words.filter(word => !/^#\w+$/.test(word));

      if (invalidWords.length > 0) {
        ToastAndroid.show(
          `Hashtag chưa hợp lệ: ${invalidWords.join(
            ', ',
          )}. Vui lòng kiểm tra lại.`,
          ToastAndroid.LONG,
        );
        return;
      }
    }

    setPostStatus('loading');
    const formData = new FormData();
    formData.append('content', postContent);
    formData.append('title', openLine);
    formData.append('privacy_status', privacyStatus);

    ids.length > 0 &&
      ids.forEach(id => {
        formData.append('tagUsers', id);
      });

    if (!!hashTag) {
      words
        .filter(word => /^#\w+$/.test(word))
        .map(word => word.replace('#', ''))
        .forEach(tag => {
          formData.append('hashtags', tag);
        });
    }

    images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        name: `image_${image.fileName}.${image.type.split('/')[1]}`,
        type: image.type,
      });
    });

    videos.forEach((video, index) => {
      formData.append('videos', {
        uri: video.uri,
        name: `video_${video.fileName}.${video.type.split('/')[1]}`,
        type: video.type,
      });
    });

    dispatch(APICreatePost(formData))
      .unwrap()
      .then(res => {
        setPostStatus('successfully');
        navigation.navigate(stackName.bottomTab.name);
        dispatch(setPostCreated(true));
        dispatch(setIds([]));
        ToastAndroid.show('Đăng bài thành công!', ToastAndroid.SHORT);
      })
      .catch(err => {
        console.log(err);

        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  };

  useEffect(() => {
    if (postStatus == 'loading') {
      setEditableTextInput(false);
      setPostClickable(true);
    }
  }, [postStatus]);

  return (
    <View style={newPostStyle.container}>
      <View style={newPostStyle.headerContainer}>
        <AppHeader
          title={t('newPostScreen.title')}
          rightButton={true}
          rightButtonTitle={!buttonDisable && t('newPostScreen.post')}
          rightButtonAction={handleCreatePost}
          isDisabled={!postContent || !openLine || buttonDisable}
        />

        {postStatus == 'loading' && (
          <ActivityIndicator
            size="small"
            color={Colors.primary}
            style={newPostStyle.activityIndicator}
          />
        )}
      </View>
      <ScrollView contentContainerStyle={newPostStyle.scrollContainer}>
        <View style={newPostStyle.bodyContainer}>
          <View style={newPostStyle.accountContainer}>
            <TouchableOpacity
              disabled={buttonDisable}
              onPress={() => {
                navigation.navigate(stackName.profile.name);
              }}>
              <Image
                style={newPostStyle.avt}
                source={{uri: userBasicInfData?.avatar}}
              />
            </TouchableOpacity>

            <View style={newPostStyle.inf}>
              <Text style={newPostStyle.userName}>
                {userBasicInfData?.fullname}
              </Text>
              <Dropdown
                disable={buttonDisable}
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
                        ? Assets.icons.public
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
              editable={editableTextInput}
              multiline={true}
              placeholder={t('newPostScreen.openLine')}
              placeholderTextColor={Colors.secondary}
              value={openLine}
              onChangeText={text => setOpenLine(text)}
              style={newPostStyle.openLine}
            />
            <TextInput
              editable={editableTextInput}
              multiline={true}
              placeholder={t('newPostScreen.contentPost')}
              placeholderTextColor={Colors.secondary}
              value={postContent}
              onChangeText={text => setPostContent(text)}
              style={newPostStyle.contentPost}
            />
            <TagUserMention />
            <MentionInput
              value={hashTag}
              onChange={setHashTag}
              allowedSpacesCount={0}
              partTypes={[
                {
                  pattern: /#\w+/gi,
                  textStyle: {fontWeight: 'medium', color: Colors.primary},
                },
              ]}
              style={{
                fontSize: 15,
              }}
              placeholder="Add hashtag with #tag"
              placeholderTextColor={Colors.secondary}
            />
          </View>

          <View style={newPostStyle.showAttachContainer}>
            {itemSelected?.[0]?.uri && isPreviewed ? renderImg() : ''}
            <View style={newPostStyle.attachmentContainer}>
              <TouchableOpacity
                disabled={buttonDisable}
                onPress={() => onOpenCamera()}>
                <Image source={Assets.icons.camera} />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={buttonDisable}
                onPress={() => onOpenVideoCamera()}>
                <Image source={Assets.icons.video} />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={buttonDisable}
                onPress={() => pickMedia('image')}>
                <Image source={Assets.icons.gallery} />
              </TouchableOpacity>
              <TouchableOpacity
                disabled={buttonDisable}
                onPress={() => pickMedia('video')}>
                <Image source={Assets.icons.videoGallery} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default NewPostScreen;
