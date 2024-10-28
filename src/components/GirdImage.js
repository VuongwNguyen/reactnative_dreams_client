import React, {useState} from 'react';
import {Image, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GridImageStyle} from '../styles/components/GridImage/GridImageStyle';
import ImageViewing from 'react-native-image-viewing';
import ViewGallery from './ViewGrallery';

const GridImage = props => {
  const {arrImages = []} = props;
  const [visible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openImage = index => {
    setCurrentIndex(index);
    setIsVisible(true);
  };

  // Chuyển đổi arrImages sang định dạng { uri: 'image-url' }
  const images = arrImages.map(img => ({uri: img.url}));

  const renderTwoImages = () => {
    return (
      <View style={GridImageStyle.rowContainer}>
        {arrImages.slice(0, 2).map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => openImage(index)}
            style={[GridImageStyle.gridImageContainer, {width: '48%'}]}>
            <Image source={{uri: item.url}} style={GridImageStyle.gridImage} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderThreeImages = () => {
    return (
      <View style={{ gap: 10 }}>
        <View style={GridImageStyle.rowContainer}>
          {arrImages.slice(0, 2).map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openImage(index)}
              style={[GridImageStyle.gridImageContainer, {width: '48%'}]}>
              <Image
                source={{uri: item.url}}
                style={GridImageStyle.gridImage}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => openImage(2)}
          style={[GridImageStyle.gridImageContainer, {width: '100%'}]}>
          <Image
            source={{ uri: arrImages[2].url }}
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
        onPress={() => openImage(index)}
        style={GridImageStyle.gridImageContainer}>
        <Image source={{ uri: item.url }} style={GridImageStyle.gridImage} />
        {index === 3 && arrImages?.length > 4 && (
          <View style={GridImageStyle.moreOverlay}>
            <Text style={GridImageStyle.moreText}>
              +{arrImages.length - 4}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={GridImageStyle.container}>
      {arrImages.length === 1 ? (
        <TouchableOpacity onPress={() => openImage(0)}>
          <Image
            source={{uri: arrImages[0].url}}
            style={GridImageStyle.mainImage}
        />
        </TouchableOpacity>
      ) : arrImages.length === 2 ? (
        renderTwoImages()
      ) : arrImages.length === 3 ? (
        renderThreeImages()
      ) : (
        <View style={GridImageStyle.gridContainer}>{renderImageGrid()}</View>
      )}
      <ViewGallery data={images.map(img => ({type: 'image', uri: img.uri}))} modalVisible={visible} setModalVisible={setIsVisible}/>
    </View>
  );
};

export default GridImage;