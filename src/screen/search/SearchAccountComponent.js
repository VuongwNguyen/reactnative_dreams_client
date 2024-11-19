import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import {searchAccountStyle} from '../../styles/search/SearchAccountStyle';
import {Assets, Sizing} from '../../styles';
import { useDispatch } from 'react-redux';
import { APIToggleFollow } from '../../store/api/FollowAPI';
import { useNavigation } from '@react-navigation/native';
import { stackName } from '../../navigations/screens';
const SearchAccountComponent = props => {
  const {avt, name, location, id} = props;
  const [status, setStatus] = useState(props.status);
  const dispatch = useDispatch();

  const toggleFollow = () => {
    dispatch(APIToggleFollow({following: id}))
      .unwrap()
      .then(res => {
        setStatus(!status);
      })
      .catch(err => console.log('[SearchAccountComponent] toggle follow failed: ', err));
  };
  const navigation = useNavigation();

  
  return (
    <TouchableOpacity 
      style={searchAccountStyle.container} 
      onPress={() => {
        navigation.navigate(stackName.profile.name, {
          userViewId: id,
      });
  }}
    >
      <View style={searchAccountStyle.infContainer}>
        {
          avt && <Image source={{uri: avt || ''}} style={searchAccountStyle.avt} />
        }
        <View style={searchAccountStyle.infText}>
          <Text style={searchAccountStyle.name}>{name}</Text>
          <View style={searchAccountStyle.locationContainer}>
            <Image
              source={Assets.icons.zone}
              style={{width: 18, height: 18}}
            />
            <Text style={searchAccountStyle.location}>{location}</Text>
          </View>
        </View>
      </View>
      {!status ? (
        <TouchableOpacity style={searchAccountStyle.followBtn} onPress={() => toggleFollow()}>
          <Text style={searchAccountStyle.followLabel}>Follow</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={searchAccountStyle.followedBtn} onPress={() => toggleFollow()}>
          <Image source={Assets.icons.check} style={{width: 16, height: 16}} />
          <Text style={searchAccountStyle.followedLabel}>Follow</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default SearchAccountComponent;

const styles = StyleSheet.create({});
