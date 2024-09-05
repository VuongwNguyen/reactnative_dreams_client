import {Alert} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const useImagePicker = () => {
  const [image, setImage] = useState();

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
    selectionLimit: 1,
    ...commonOptions,
  };

  const onOpenCamera = async () => {
    const response = await launchCamera(cameraOptions);
    if (response?.assets) {
      setImage(response.assets);
    } else {
    }
  };

  const openImageLibrary = async () => {
    const response = await launchImageLibrary(libraryOptions);
    if (response?.assets) {
      setImage(response.assets);
    } else {
    }
  };

  return {image, setImage, openImageLibrary, onOpenCamera};
};

export default useImagePicker;
