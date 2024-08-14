import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import AppHeader from '../../components/Header';
import {useTranslation} from 'react-i18next';
import {newPostStyle} from '../../styles/newpost/NewPostStyle';
import {Dropdown} from 'react-native-element-dropdown';
import {Assets, Colors} from '../../styles';
import useImagePicker from './ImagePickerPost';

const NewPostScreen = () => {
  const {t} = useTranslation();
  const {images, setImages, openImageLibrary, onOpenCamera} = useImagePicker();
  const handleRemoveImage = index => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  const renderImg = () => {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={newPostStyle.imgContainer}>
        {images.map((item, index) => (
          <View style={newPostStyle.imgBox} key={index}>
            <Image source={{uri: item?.uri}} style={newPostStyle.imgPost} />
            <TouchableOpacity
              style={newPostStyle.removeIcon}
              onPress={() => handleRemoveImage(index)}>
              <Image source={Assets.image.remove} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  };

  const data = [
    {label: 'Public', value: 'public'},
    {label: 'Private', value: 'private'},
  ];
  const [value, setValue] = useState(data[0].value);
  const [openLine, setOpenLine] = useState('');
  const [postContent, setPostContent] = useState('');
  const goBack = () => {};
  return (
    <View style={newPostStyle.container}>
      <AppHeader
        title={t('newPostScreen.title')}
        goBack={goBack}
        rightButton={true}
        rightButtonTitle={t('newPostScreen.post')}
      />
      <View style={newPostStyle.bodyContainer}>
        <View style={newPostStyle.accountContainer}>
          <Image style={newPostStyle.avt} source={Assets.image.avt} />
          <View style={newPostStyle.inf}>
            <Text style={newPostStyle.userName}>Username</Text>
            <Dropdown
              data={data}
              labelField="label"
              valueField="value"
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
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
          {images?.[0]?.uri ? renderImg() : ''}
          <View style={newPostStyle.attachmentContainer}>
            <TouchableOpacity
              style={newPostStyle.iconBtn}
              onPress={() => onOpenCamera()}>
              <Image source={Assets.image.camera} />
            </TouchableOpacity>
            <TouchableOpacity style={newPostStyle.iconBtn}>
              <Image source={Assets.image.video} />
            </TouchableOpacity>
            <TouchableOpacity
              style={newPostStyle.iconBtn}
              onPress={() => openImageLibrary()}>
              <Image source={Assets.image.photo} />
            </TouchableOpacity>
            <TouchableOpacity style={newPostStyle.iconBtn}>
              <Image source={Assets.image.more} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {},
});
