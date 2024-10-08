import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {searchAccountStyle} from '../../styles/search/SearchAccountStyle';
import {Assets, Sizing} from '../../styles';
const SearchAccountComponent = props => {
  const {avt, name, location, status} = props;
  return (
    <View style={searchAccountStyle.container}>
      <View style={searchAccountStyle.infContainer}>
        <Image source={avt} style={searchAccountStyle.avt} />
        <View style={searchAccountStyle.infText}>
          <Text style={searchAccountStyle.name}>{name}</Text>
          <View style={searchAccountStyle.locationContainer}>
            <Image
              source={Assets.icon.location}
              style={{width: 20, height: 20}}
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
          <Image source={Assets.icon.check} style={{width: 20, height: 20}} />
          <Text style={searchAccountStyle.followedLabel}>Follow</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchAccountComponent;

const styles = StyleSheet.create({});
