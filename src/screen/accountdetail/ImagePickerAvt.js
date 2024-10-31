import {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

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

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        Alert.alert('Camera permission denied');
        return false;
      }
    } else {
      const response = await request(PERMISSIONS.IOS.CAMERA);
      switch (response) {
        case RESULTS.GRANTED:
          return true;
        case RESULTS.DENIED:
        case RESULTS.UNAVAILABLE:
        case RESULTS.BLOCKED:
          Alert.alert('Camera permission denied');
          return false;
      }
    }
  };
  const onOpenCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      const response = await launchCamera(cameraOptions);
      if (response?.assets) {
        setImage(response.assets);
      } else {
      }
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
