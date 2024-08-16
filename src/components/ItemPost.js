import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';

import {Assets, Colors, Fonts, Typography} from './../styles';
import GridImage from './GirdImage';

export default ItemPost = props => {
  const {item, isLike = true} = props;
  const [like, setLike] = useState(isLike);
  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        {/* avater */}
        <Image source={{uri: item.avatar}} style={styles.avatar} />
        {/* name, hour */}
        <View>
          <Text style={Typography.postName}>{item.name}</Text>
          <Text style={styles.headerLabel}>{item.hour}</Text>
        </View>
      </View>
      {/* content */}
      <View style={styles.content}>
        {/* title */}
        <Text numberOfLines={2} style={Typography.postTitle}>
          {item.title}
        </Text>
        {/* content */}
        <TouchableOpacity onPress={() => {}}>
          <Text numberOfLines={3} style={Typography.postContent}>
            {'\t'}
            {item.content}
          </Text>
        </TouchableOpacity>
      </View>
      {/* image */}
      {item.image.length > 0 && <GridImage arrImages={item.image} />}
      {/* interact */}
      <View style={styles.interactContainer}>
        {/* like */}
        <TouchableOpacity
          style={styles.itemInteract}
          onPress={() => setLike(!like)}>
          {like ? (
            <Entypo
              name={Assets.icon.heartFill}
              size={24}
              color={Colors.error}
            />
          ) : (
            <Entypo name={Assets.icon.heart} size={24} color={Colors.black} />
          )}
          <Text style={styles.interactLabel}>{item.like}</Text>
        </TouchableOpacity>
        {/* comment */}
        <TouchableOpacity style={styles.itemInteract}>
          <EvilIcon name={Assets.icon.comment} size={24} color={Colors.black} />
          <Text style={styles.interactLabel}>{item.comment}</Text>
        </TouchableOpacity>
        {/* share */}
        <TouchableOpacity style={styles.itemInteract}>
          <Image source={Assets.image.share} style={styles.image}></Image>
          <Text style={styles.interactLabel}>{item.share}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLabel: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    fontStyle: 'normal',
    fontFamily: Fonts.nunitonSans.regular,
  },
  container: {
    paddingHorizontal: 5,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  content: {
    gap: 10,
  },
  interactContainer: {
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderColor: Colors.secondary,
    padding: 5,
    paddingHorizontal: 10,
  },
  interactLabel: {
    fontFamily: Fonts.roboto.semibold,
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 18,
    marginLeft: 5,
  },
  itemInteract: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 20,
    height: 20,
  },
});
