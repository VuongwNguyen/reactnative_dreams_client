import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {searchAccountStyle} from '../../styles/search/SearchAccountStyle';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import {Assets, Scaling, Sizing, Colors} from '../../styles';
const SearchAccountComponent = props => {
  const {avt, name, location, status} = props;
  return (
    <View style={searchAccountStyle.container}>
      <View style={searchAccountStyle.infContainer}>
        <Image source={avt} style={searchAccountStyle.avt} />
        <View style={searchAccountStyle.infText}>
          <Text style={searchAccountStyle.name}>{name}</Text>
          <View style={searchAccountStyle.locationContainer}>
            <EvilIcons
              name={Assets.icon.location}
              size={Sizing.lg}
              color="black"
            />
            <Text style={searchAccountStyle.location}>{location}</Text>
          </View>
        </View>
      </View>
      {status == 'follow' ? (
        <TouchableOpacity style={searchAccountStyle.followBtn}>
          <Text style={searchAccountStyle.followLabel}>Follow</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={searchAccountStyle.followedBtn}>
          <Feather name={Assets.icon.checked} size={Sizing.md} color="white" />
          <Text style={searchAccountStyle.followedLabel}>Follow</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchAccountComponent;

const styles = StyleSheet.create({});
