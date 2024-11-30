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

  const setData = ({type, searchValue}) => {
    if (type === 'Post' && searchValue !== '') {
      dispatch(APISearchPost(searchValue))
        .unwrap()
        .then(res => {    
          setPostArr(res.data.list);
        })
        .catch(err => {
          console.log('err', err);
        })
    }else if (type === 'Accounts' && searchValue !== '') {            
      dispatch(APISearch(searchValue))
        .unwrap()
        .then(res => {          
          setAccountArr(res.data.list);
        })
        .catch(err => {
          console.log('err', err);
        })
    }else if (type === 'Hashtag' && searchValue !== '') {
      dispatch(APISearchHashtag(searchValue))
        .unwrap()
        .then(res => {
          setPostArr(res.data.list);
        })
        .catch(err => {
          console.log('err', err);
        })
    }else if (type === 'All' && searchValue !== ''){
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
  }

  //keywork change
  useEffect(() => {
    setAccountArr([]);
    if (isSelected === 'Accounts' && searchValue !== '') {
      setData({type: isSelected, searchValue});
    }
  }, [searchValue, isSelected]);

  //tag change
  useEffect(() => {
    if (isSelected === 'Post' && searchValue !== '') {
      setData({type: isSelected, searchValue});
    }else if (isSelected === 'Hashtag' && searchValue !== '') {
      setData({type: isSelected, searchValue});
    }else if (isSelected === 'All' && searchValue !== ''){
      setData({type: isSelected, searchValue});
    }
  },[isSelected])

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
            inputMode = 'search'
            onSubmitEditing={() => setData({type: isSelected, searchValue})}
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
            <TouchableOpacity
              style={searchStyle.rightIconContainer}>
                <Image
                  style={searchStyle.rightIcon}
                  source={Assets.icons.search}
                />
            </TouchableOpacity>
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
        {
          (postArr.length === 0 && accountArr.length === 0) 
          ? (
            <View style={searchStyle.noContent}>
              <Text style={searchStyle.noResult}>
                Không có kết quả phù hợp
              </Text>
            </View>
          )
          :
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
        }
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