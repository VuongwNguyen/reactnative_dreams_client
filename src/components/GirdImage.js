import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GridImageStyle} from '../styles/components/GridImage/GridImageStyle';

const GridImage = props => {
  const {arrImages = []} = props;

  const openImage = () => {};

  const renderTwoImages = () => {
    return (
      <View style={GridImageStyle.rowContainer}>
        {arrImages.slice(0, 2).map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={openImage}
            style={[GridImageStyle.gridImageContainer, {width: '48%'}]}>
            <Image source={{uri: item}} style={GridImageStyle.gridImage} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderThreeImages = () => {
    return (
      <View style={{gap: 10}}>
        <View style={GridImageStyle.rowContainer}>
          {arrImages.slice(0, 2).map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={openImage}
              style={[GridImageStyle.gridImageContainer, {width: '48%'}]}>
              <Image source={{uri: item}} style={GridImageStyle.gridImage} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={openImage}
          style={[GridImageStyle.gridImageContainer, {width: '100%'}]}>
          <Image
            source={{uri: arrImages[2]}}
            style={GridImageStyle.gridImage}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderImageGrid = () => {
    return arrImages.slice(0, 4).map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={openImage}
        style={GridImageStyle.gridImageContainer}>
        <Image source={{uri: item}} style={GridImageStyle.gridImage} />
        {index === 3 && arrImages.length > 4 && (
          <View style={GridImageStyle.moreOverlay}>
            <Text style={GridImageStyle.moreText}>
              +{arrImages?.length - 4}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={GridImageStyle.container}>
      {arrImages.length === 1 ? (
        <Image source={{uri: arrImages[0]}} style={GridImageStyle.mainImage} />
      ) : arrImages.length === 2 ? (
        renderTwoImages()
      ) : arrImages.length === 3 ? (
        renderThreeImages()
      ) : (
        <View style={GridImageStyle.gridContainer}>{renderImageGrid()}</View>
      )}
    </View>
  );
};

export default GridImage;
