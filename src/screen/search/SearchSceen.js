import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {searchStyle} from '../../styles/search/SearchStyle';
import Feather from 'react-native-vector-icons/Feather';
import {Assets, Colors, Scaling, Sizing, Typography} from '../../styles';
import ItemPost from '../../components/ItemPost';
import SearchAccountComponent from './SearchAccountComponent';
const SearchSceen = props => {
  //   const {navigation} = props;
  const [searchValue, setSearchValue] = useState('');
  const optionsArr = ['All', 'Post', 'Accounts'];
  const [isSelected, setIsSelected] = useState(optionsArr[0]);
  const goBack = () => {
    // navigation.goBack();
  };
  return (
    <View style={searchStyle.container}>
      {/* header */}
      <View style={searchStyle.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Feather name={Assets.icon.back} size={Sizing.lg} color="black" />
        </TouchableOpacity>
        <View style={searchStyle.searchContainer}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor={Colors.secondary}
            value={searchValue}
            onChangeText={text => setSearchValue(text)}
            style={searchStyle.searchInput}
          />
          {!!searchValue ? (
            <Feather
              name={Assets.icon.x}
              size={Sizing.lg}
              color="black"
              style={searchStyle.rightIconContainer}
            />
          ) : (
            <Feather
              name={Assets.icon.search}
              size={Sizing.lg}
              color="black"
              style={searchStyle.rightIconContainer}
            />
          )}
        </View>
      </View>
      {/* tag options filter */}
      <View style={searchStyle.tagContainer}>
        {optionsArr.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={
              item == isSelected
                ? searchStyle.tagSelected
                : searchStyle.tagUnSelected
            }
            onPress={() => {
              setIsSelected(item);
            }}>
            <Text
              style={
                item == isSelected
                  ? searchStyle.tagLabelSelected
                  : searchStyle.tagLabelUnSelected
              }>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* show result search */}
      <ScrollView
        style={searchStyle.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={searchStyle.resultContainer}>
          {accountArr.map((item, index) => (
            <SearchAccountComponent
              key={index}
              avt={item.avt}
              name={item.username}
              location={item.location}
              status={item.status}
            />
          ))}
          {postArr.map((item, index) => (
            <ItemPost key={index} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchSceen;
const accountArr = [
  {
    avt: Assets.image.avt,
    username: 'User_Account',
    location: 'Hồ Chí Minh',
    status: 'follow',
  },
  {
    avt: Assets.image.avt,
    username: 'Username',
    location: 'Hà Nội',
    status: 'followed',
  },
];

const postArr = [
  {
    name: 'Velerie Hiddersley 1',
    avatar:
      'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
    hour: '1 hour ago',
    title:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    content:
      'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
    image: [
      'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
    ],
    like: 0,
    comment: 0,
    share: 0,
  },
  {
    name: 'Velerie Hiddersley 2',
    avatar:
      'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
    hour: '1 hour ago',
    title:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    content:
      'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
    image: [],
    like: 0,
    comment: 0,
    share: 0,
  },
];
