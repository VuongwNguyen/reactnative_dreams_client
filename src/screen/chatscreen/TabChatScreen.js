import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Chat} from './components';
import {useNavigation} from '@react-navigation/native';
import {stackName} from '../../navigations/screens';

const TabChatScreen = () => {
  const navigation = useNavigation();

  const renderChat = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(stackName.conversation.name)}>
        <Chat name={`User - ${index}`} message={`message - ${index}`} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Array(10)}
        renderItem={renderChat}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default TabChatScreen;

const styles = StyleSheet.create({
  list: {
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});
