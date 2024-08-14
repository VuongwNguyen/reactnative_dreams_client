import {Alert} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const useImagePicker = () => {
  const [images, setImages] = useState();

  const commonOptions = {
    mediaType: 'photo',
    maxWidth: 500,
    maxHeight: 500,
  };

  const cameraOptions = {
    cameraType: 'front',
    saveToPhotos: true,
    ...commonOptions,
  };

  const libraryOptions = {
    selectionLimit: 10,
    ...commonOptions,
  };

  const onOpenCamera = async () => {
    const response = await launchCamera(cameraOptions);
    if (response?.assets) {
      setImages(response.assets);
      console.log(images[0].uri);
    } else {
      Alert.alert('Có lỗi xảy ra', response.errorMessage);
    }
  };

  const openImageLibrary = async () => {
    const response = await launchImageLibrary(libraryOptions);
    if (response?.assets) {
      setImages(response.assets);
    } else {
      Alert.alert('Có lỗi xảy ra', response.errorMessage);
    }
  };

  return {images, setImages, openImageLibrary, onOpenCamera};
};

export default useImagePicker;
