import {StyleSheet, View} from 'react-native';
import React from 'react';
import GridImage from '../components/GirdImage';

const images = [
  {
    uri: 'https://i.pinimg.com/236x/df/82/4a/df824aa2a3b570dd1ba792823c9b88f2.jpg',
  },
  {
    uri: 'https://i.pinimg.com/236x/96/7e/f0/967ef0a02a0ac6428f2ba35cc08e70cb.jpg',
  },
  {
    uri: 'https://i.pinimg.com/236x/e8/57/d9/e857d91505e0a44234a6df642684dd08.jpg',
  },
  {
    uri: 'https://i.pinimg.com/236x/f2/6d/a9/f26da9f7ae846100b616528fd0f11a34.jpg',
  },
  {
    uri: 'https://i.pinimg.com/236x/15/51/9d/15519d372b10ec48fcba7b7f0d0edb8e.jpg',
  },
];

const Example = () => {
  return (
    <View style={styles.container}>
      <GridImage arrImages={images} />
    </View>
  );
};

export default Example;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    gap: 30,
  },
});
