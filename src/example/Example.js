import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import AppInput from '../components/Input';
import AppHeader from '../components/Header';
import AppButton from '../components/Button';

const Example = () => {
  const [value, setValue] = useState('');
  const [value1, setValue1] = useState('');
  return (
    <View style={styles.container}>
      <AppHeader title={'Example'} />
      <AppHeader title={'Example'} rightButton rightButtonTitle ={"Save"} />
      <AppInput placeholder={'placeholder'} value={value} setValue={setValue} />
      <AppInput
        placeholder={'placeholder'}
        value={value1}
        setValue={setValue1}
        isPassword={true}
      />
      <AppButton title={'Button'} />
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
