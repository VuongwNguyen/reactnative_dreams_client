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
  Alert,
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
import {APICreatePost, APIEditPost} from '../../store/api/PostAPI';
import {setIds} from '../../store/slices/IdsTagUserSlice';
import TagUserMention from './TagUserMention';

const NewPostScreen = props => {
  const {navigation} = props;
  const postItem = props.route?.params?.post;
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

  const [isPreviewed, setIsPreviewed] = useState(true);
  const [value, setValue] = useState(
    !!postItem ? postItem.privacy_status : pricvacyData[0].value,
  );
  const [openLine, setOpenLine] = useState(!!postItem ? postItem.title : '');
  const [postContent, setPostContent] = useState(
    !!postItem ? postItem.content : '',
  );
  const [privacyStatus, setPrivacyStatus] = useState(value);
  const [postStatus, setPostStatus] = useState('');
  const [hashTag, setHashTag] = useState('');
  const [editableTextInput, setEditableTextInput] = useState(true);
  const [buttonDisable, setPostClickable] = useState(false);
  const typeImgs = ['jpeg', 'png', 'jpg'];
  const typeVideos = ['mp4', 'mkv'];

  useEffect(() => {
    const hashTagsEdit = postItem?.hashtags;
    if (!!hashTagsEdit && hashTagsEdit.length > 0) {
      const hashtagString = hashTagsEdit
        .map(item => `#${item.title}`)
        .join(' ');
      setHashTag(hashtagString);
    }
    // Chuyển đổi cấu trúc mảng ảnh từ api để phù hợp với tham số truyền đi
    const imgsEdit = postItem?.images;
    if (!!imgsEdit && imgsEdit.length > 0) {
      const transformedImages = imgsEdit.map(image => {
        const urlParts = image.url.split('/');
        const fileName = urlParts[urlParts.length - 1]; // Lấy phần cuối cùng của URL (tên tệp)
        const fileType = fileName.split('.').pop(); // Lấy phần mở rộng từ tên tệp

        return {
          uri: image.url,
          fileName: fileName,
          type: `image/${fileType}`,
        };
      });
      setImages(transformedImages);
    }
    // tương tự chuyển đổi mảng video
    const videosEdit = postItem?.videos;
    if (!!videosEdit && videosEdit.length > 0) {
      const transformedVideos = videosEdit.map(video => {
        const urlParts = video.url.split('/');
        const fileName = urlParts[urlParts.length - 1];
        const fileType = fileName.split('.').pop();

        return {
          uri: video.url,
          fileName: fileName,
          type: `image/${fileType}`,
        };
      });
      setVideos(transformedVideos);
    }
  }, []);
  const itemSelected = [...images, ...videos];

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

  const handlePost = async () => {
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
    if (!!postItem) {
      formData.append('post_id', postItem._id);
    }
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
      const imgType = image.type.split('/')[1];
      if (!typeImgs.includes(imgType)) {
        Alert.alert(
          'Nền tảng chỉ hỗ trợ các định dạng đính kèm như sau: png, jpeg, jpg, mp4, mkv',
        );
        return;
      }
      formData.append('images', {
        uri: image.uri,
        name: `image_${image.fileName}`,
        type: image.type,
      });
    });

    videos.forEach((video, index) => {
      const videoType = video.type.split('/')[1];
      if (!typeVideos.includes(videoType)) {
        Alert.alert(
          'Nền tảng chỉ hỗ trợ các định dạng đính kèm như sau: png, jpeg, jpg, mp4, mkv',
        );
        return;
      }
      formData.append('videos', {
        uri: video.uri,
        name: `video_${video.fileName}`,
        type: video.type,
      });
    });
    if (!postItem) {
      dispatch(APICreatePost(formData))
        .unwrap()
        .then(res => {
          setPostStatus('successfully');
          navigation.navigate(stackName.bottomTab.name);
          dispatch(setIds([]));
          ToastAndroid.show('Đăng bài thành công!', ToastAndroid.SHORT);
        })
        .catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    } else {
      dispatch(APIEditPost(formData))
        .unwrap()
        .then(res => {
          setPostStatus('successfully');
          navigation.goBack();
          dispatch(setIds([]));
          ToastAndroid.show(
            'Cập nhật bài viết thành công!',
            ToastAndroid.SHORT,
          );
        })
        .catch(err => {
          ToastAndroid.show(err.message, ToastAndroid.SHORT);
        });
    }
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
          rightButtonTitle={
            !buttonDisable &&
            (!!postItem ? t('newPostScreen.update') : t('newPostScreen.post'))
          }
          rightButtonAction={handlePost}
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
            <TagUserMention tagList={postItem?.tagUsers} />
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
