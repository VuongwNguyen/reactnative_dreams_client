import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {searchStyle} from '../../styles/search/SearchStyle';
import {Assets, Colors, Sizing} from '../../styles';
import ItemPost from '../../components/ItemPost';
import SearchAccountComponent from './SearchAccountComponent';
import {useNavigation} from '@react-navigation/native';
import { APISearch, APISearchHashtag, APISearchPost } from '../../store/api/SearchAPI';
import { useDispatch } from 'react-redux';
import { se } from 'rn-emoji-keyboard';

const options = ['All', 'Post', 'Accounts', 'Hashtag'];

const SearchSceen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [isSelected, setIsSelected] = useState(options[0]);
  const [postArr, setPostArr] = useState([]);
  const [accountArr, setAccountArr] = useState([]);

  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  useEffect(() => {
    console.log('isSelected', isSelected);
    setAccountArr([]);
    setPostArr([]);
    if (isSelected === 'Post' && searchValue !== '') {
      dispatch(APISearchPost(searchValue))
        .unwrap()
        .then(res => {    
          setPostArr(res.data.list);
        })
        .catch(err => {
          console.log('err', err);
        })
    }else if (isSelected === 'Accounts' && searchValue !== '') {            
      dispatch(APISearch(searchValue))
        .unwrap()
        .then(res => {          
          setAccountArr(res.data.list);
        })
        .catch(err => {
          console.log('err', err);
        })
    }else if (isSelected === 'Hashtag' && searchValue !== '') {
      dispatch(APISearchHashtag(searchValue))
        .unwrap()
        .then(res => {
          setPostArr(res.data.list);
        })
        .catch(err => {
          console.log('err', err);
        })
    }else if (isSelected === 'All' && searchValue !== ''){
      dispatch(APISearchPost(searchValue))
        .unwrap()
        .then(res => {    
          setPostArr(res.data.list);
        })
        .catch(err => {
          console.log('err', err);
        })

      dispatch(APISearch(searchValue))
        .unwrap()
        .then(res => {          
          setAccountArr(res.data.list);
        })
        .catch(err => {
          console.log('err', err);
        })
    }
     
  }, [searchValue, isSelected]);

  return (
    <View style={searchStyle.container}>
      {/* header */}
      <View style={searchStyle.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Image
            source={Assets.icons.arrowLeft}
            style={{height: 20, width: 20}}
          />
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
            <TouchableOpacity
              style={searchStyle.rightIconContainer}
              onPress={() => setSearchValue('')}>
              <Image
                source={Assets.icons.close}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
          ) : (
            <Image
              source={Assets.icons.search}
              style={searchStyle.rightIconContainer}
            />
          )}
        </View>
      </View>
      {/* tag options filter */}
      <View style={searchStyle.tagContainer}>
        {options.map((item, index) => (
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
          {(isSelected === 'Accounts' || isSelected === 'All') && accountArr.map((item, index) => (
            <SearchAccountComponent
              key={index}
              avt={item.avatar}
              name={item.fullname}
              location={item.location}
              status={item.isFollowed}
              id={item._id}
            />
          ))}
          {(isSelected === 'Post' || isSelected === 'All'  || isSelected === 'Hashtag') && postArr.map((item, index) => (
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