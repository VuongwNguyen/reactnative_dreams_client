import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {GridImageStyle} from '../styles/components/GridImage/GridImageStyle';
import ViewGallery from './ViewGrallery';
import ThumbnailVideo from './ThumbnailVideo';

const GridImage = props => {
  const {arrImages = [], arrVideos = []} = props;
  const [visible, setIsVisible] = useState(false);
  const [targetIndex, setTargetIndex] = useState(0);

  const openImage = index => {
    setTargetIndex(index);
    setIsVisible(true);
  };

  const images = arrImages.map(img => ({uri: img.url, type: 'image'}));
  const videos = arrVideos.map(video => ({uri: video.url, type: 'video'}));
  let galleries = images.concat(videos);

  const ImageORVideo = ({item}) => {
    if (item.type === 'image') {
      return (
        <Image source={{uri: item.uri}} style={GridImageStyle.gridImage} />
      );
    } else if (item.type === 'video') {
      return (
        <ThumbnailVideo
          videoUri={item.uri}
          style={GridImageStyle.gridImage}
          styleIcon={GridImageStyle.gridPlayIcon}
        />
      );
    }
  };

  const renderTwoImages = () => {
    return (
      <View style={GridImageStyle.rowContainer}>
        {galleries.slice(0, 2).map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => openImage(index)}
            style={[GridImageStyle.gridImageContainer, {width: '48%'}]}>
            <ImageORVideo item={item} />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderThreeImages = () => {
    return (
      <View style={{gap: 10}}>
        <View style={GridImageStyle.rowContainer}>
          {galleries.slice(0, 2).map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openImage(index)}
              style={[GridImageStyle.gridImageContainer, {width: '48%'}]}>
              <ImageORVideo item={item} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => openImage(2)}
          style={[GridImageStyle.gridImageContainer, {width: '100%'}]}>
          <ImageORVideo item={galleries[2]} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderImageGrid = () => {
    return galleries.slice(0, 4).map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => openImage(index)}
        style={GridImageStyle.gridImageContainer}>
        <ImageORVideo item={item} />
        {index === 3 && arrImages?.length > 4 && (
          <View style={GridImageStyle.moreOverlay}>
            <Text style={GridImageStyle.moreText}>+{galleries.length - 4}</Text>
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={GridImageStyle.container}>
      {galleries.length === 1 ? (
        <TouchableOpacity onPress={() => setIsVisible(true)}>
          {galleries[0].type === 'image' ? (
            <Image
              source={{uri: galleries[0].uri}}
              style={GridImageStyle.mainImage}
            />
          ) : (
            <ThumbnailVideo
              videoUri={galleries[0].uri}
              style={GridImageStyle.mainImage}
              styleIcon={GridImageStyle.mainPlayIcon}
            />
          )}
        </TouchableOpacity>
      ) : galleries.length === 2 ? (
        renderTwoImages()
      ) : galleries.length === 3 ? (
        renderThreeImages()
      ) : (
        <View style={GridImageStyle.gridContainer}>{renderImageGrid()}</View>
      )}
      <ViewGallery
        data={galleries}
        modalVisible={visible}
        setModalVisible={setIsVisible}
        targetIndex={targetIndex}
      />
    </View>
  );
};

export default GridImage;
