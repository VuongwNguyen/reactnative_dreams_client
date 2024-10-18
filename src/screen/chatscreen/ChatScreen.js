import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TopBarNavigationChat from '../../navigations/TopBarNavigationChat';
import {Assets} from '../../styles';
import {UserOnline} from './components';

const {width} = Dimensions.get('window');

const ChatScreen = () => {
  const renderUsersOnline = ({item, index}) => {
    return <UserOnline name={`User - ${index}`} />;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={{uri: mock_image}} style={styles.avatar} />
        <Text style={styles.label}>CHATS</Text>
        <TouchableOpacity>
          <Image source={Assets.icons.add} style={styles.icon} />
        </TouchableOpacity>
      </View>
      {/* Search */}
      <TouchableOpacity style={styles.search}>
        <Image source={Assets.icons.search} style={styles.searchIcon} />
        <Text>Search ...</Text>
      </TouchableOpacity>

      <View>
        <FlatList
          contentContainerStyle={styles.user}
          data={Array(10)}
          renderItem={renderUsersOnline}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: 20}} />}
        />
      </View>

      <TopBarNavigationChat />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  user: {
    marginTop: 14,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  search: {
    marginTop: 32,
    marginHorizontal: 29,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#6C757D',
    borderRadius: 30,
    alignItems: 'center',
  },
  input: {
    padding: 0,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginEnd: 14,
  },
  label: {
    color: 'black',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    position: 'absolute',
    width: width,
    textAlign: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

const mock_image =
  'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg';
