import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlingStyle} from '../../styles/flingstyle/FlingStyle';
import Header from '../../components/Header';
const data = [
  {
    name: 'Fling 1',
    folowwing: true,
  },
  {
    name: 'Fling 1',
    folowwing: true,
  },
  {
    name: 'Fling 1',
    folowwing: false,
  },
  {
    name: 'Fling 1',
    folowwing: false,
  },
  {
    name: 'Fling 1',
    folowwing: true,
  },
  {
    name: 'Fling 1',
    folowwing: true,
  },
];
const FlingScreen = () => {
  return (
    <View style={FlingStyle.container}>
      <Header title={'Fling Screen'} />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <View style={FlingStyle.item}>
            <Image
              style={FlingStyle.avatar}
              source={{
                uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
              }}
            />
            <Text style={FlingStyle.name}>{item.name}</Text>
            <TouchableOpacity
              style={item.folowwing ? FlingStyle.flowwing : FlingStyle.flowwed}>
              <Text
                style={
                  item.folowwing
                    ? FlingStyle.flowwingText
                    : FlingStyle.flowwedText
                }>
                {item.folowwing ? 'Followed' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default FlingScreen;
