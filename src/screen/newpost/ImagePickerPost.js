import {Alert} from 'react-native';
import {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const useImagePicker = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const commonOptions = {
    maxWidth: 500,
    maxHeight: 500,
    quality: 1,
  };

  const cameraOptions = {
    cameraType: 'front',
    saveToPhotos: true,
    mediaType: 'photo',
    ...commonOptions,
  };

  const videoCameraOptions = {
    mediaType: 'video',
    saveToPhotos: true,
    durationLimit: 600,
    videoQuality: 'high',
  };

  const libraryOptions = {
    mediaType: 'photo',
    selectionLimit: 10,
    ...commonOptions,
  };

  const videoLibraryOptions = {
    mediaType: 'video',
    selectionLimit: 4,
    ...commonOptions,
  };

  const onOpenCamera = async () => {
    const response = await launchCamera(cameraOptions);
    if (response?.assets) {
      setImages([...images, ...response.assets]);
    } else if (response.errorMessage) {
      Alert.alert('Có lỗi xảy ra', response.errorMessage);
    }
  };

  const onOpenVideoCamera = async () => {
    const response = await launchCamera(videoCameraOptions);
    if (response?.assets) {
      setVideos([...videos, ...response.assets]);
    } else if (response.errorMessage) {
      Alert.alert('Có lỗi xảy ra', response.errorMessage);
    }
  };
  const openImageLibrary = async () => {
    const response = await launchImageLibrary(libraryOptions);
    if (response?.assets) {
      setImages([...images, ...response.assets]);
    } else if (response.errorMessage) {
      Alert.alert('Có lỗi xảy ra', response.errorMessage);
    }
  };

  const openVideoLibrary = async () => {
    const response = await launchImageLibrary(videoLibraryOptions);
    if (response?.assets) {
      setVideos([...videos, ...response.assets]);
    } else if (response.errorMessage) {
      Alert.alert('Có lỗi xảy ra', response.errorMessage);
    }
  };

  const pickMedia = async type => {
    if (type === 'image') {
      await openImageLibrary();
    } else if (type === 'video') {
      await openVideoLibrary();
    }
  };

  return {
    images,
    setImages,
    videos,
    setVideos,
    openImageLibrary,
    onOpenCamera,
    pickMedia,
    onOpenVideoCamera,
  };
};

export default useImagePicker;
