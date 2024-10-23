import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const CameraScreen = () => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const camera = useRef(null);

  if (!hasPermission) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Request permission"
          onPress={() => requestPermission()}
        />
      </View>
    );
  }

  if (device === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Not found Camera device</Text>
        <Button title="Go back" onPress={() => {}} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFillObject}
        device={device}
        isActive
        ref={camera}
        photo
        onPreviewStarted={() => console.log('Preview started!')}
        onPreviewStopped={() => console.log('Preview stopped!')}
      />
      <View style={styles.controller}>
        <Button title="Take photo" onPress={() => camera.current.takePhoto()} />
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  controller: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
  },
});
