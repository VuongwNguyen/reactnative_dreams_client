import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {InfomationTabStyle} from '../../styles/profileStyle/InformationTabStyle';
import Animated from 'react-native-reanimated';

const InfomationTab = props => {
  const {scrollHandler} = props;
  const data = [
    {
      id: 1,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 2,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 3,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 4,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 5,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 6,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 7,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
    {
      id: 8,
      title: 'Title',
      content: 'Content',
      icon: 'https://th.bing.com/th/id/OIP.LExjPtkL7REQHCyY-tQauAHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7',
    },
  ];
  const Item = props => {
    const {title = '', content = '', icon = '', onPress} = props;
    return (
      <TouchableOpacity
        style={InfomationTabStyle.itemContainer}
        onPress={onPress}>
        <Image style={InfomationTabStyle.icon} source={{uri: icon}} />
        <Text style={InfomationTabStyle.title}>{title}</Text>
        <Text style={InfomationTabStyle.value}>{content}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={InfomationTabStyle.container}>
      <Animated.FlatList
        onScroll={scrollHandler}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Item
            key={item.id}
            title={item.title}
            content={item.content}
            icon={item.icon}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default InfomationTab;
