import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';

const GridImage = props => {
  const {arrImages = []} = props;

  const openImage = () => {};

  const renderTwoImages = () => {
    return (
      <View style={styles.rowContainer}>
        {arrImages.slice(0, 2).map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={openImage}
            style={[styles.gridImageContainer, {width: '48%'}]}>
            <Image source={{uri: item.uri}} style={styles.gridImage} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderThreeImages = () => {
    return (
      <View style={{gap: 10}}>
        <View style={styles.rowContainer}>
          {arrImages.slice(0, 2).map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={openImage}
              style={[styles.gridImageContainer, {width: '48%'}]}>
              <Image source={{uri: item.uri}} style={styles.gridImage} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={openImage}
          style={[styles.gridImageContainer, {width: '100%'}]}>
          <Image source={{uri: arrImages[2].uri}} style={styles.gridImage} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderImageGrid = () => {
    return arrImages.slice(0, 4).map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={openImage}
        style={styles.gridImageContainer}>
        <Image source={{uri: item.uri}} style={styles.gridImage} />
        {index === 3 && arrImages.length > 4 && (
          <View style={styles.moreOverlay}>
            <Text style={styles.moreText}>+{arrImages?.length - 4}</Text>
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      {arrImages.length === 1 ? (
        <Image source={{uri: arrImages[0].uri}} style={styles.mainImage} />
      ) : arrImages.length === 2 ? (
        renderTwoImages()
      ) : arrImages.length === 3 ? (
        renderThreeImages()
      ) : (
        <View style={styles.gridContainer}>{renderImageGrid()}</View>
      )}
    </View>
  );
};

export default GridImage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  mainImageContainer: {
    marginBottom: 10,
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridImageContainer: {
    position: 'relative',
    width: '48%',
    height: 100,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  moreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  moreText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
