import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  Image,
  ActivityIndicator
} from 'react-native';
import Video from 'react-native-video';
import { ViewGalleryStyle } from '../styles/components/view/ViewGalleryStyle';

const ViewGallery = (props) => {
  const { data = [], modalVisible, setModalVisible, targetIndex = 0 } = props;
  const [currentIndex, setCurrentIndex] = useState(targetIndex);
  const flatlistRef = useRef(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({
          index: targetIndex,
          animated: true,
        });
      }, 0);
    }
  }, [modalVisible, targetIndex]);

  const RenderItem = React.memo(({ item, index }) => {
    const [loading, setLoading] = useState(true);
    const handleLoad = () => {
      setLoading(false);
    };

    return (
      <View style={ViewGalleryStyle.videoContainer}>
        {item.type === 'video' ? (
          <Video
            source={{ uri: item.uri }}
            style={ViewGalleryStyle.video}
            resizeMode="contain"
            controls
            onLoad={handleLoad}
            paused={index !== currentIndex} // Play only the current video
          />
        ) : (
          <Image
            source={{ uri: item.uri }}
            style={ViewGalleryStyle.image}
            resizeMode="contain"
            onLoad={handleLoad}
          />
        )}
        {loading && (
          <ActivityIndicator
            style={ViewGalleryStyle.loader}
            size="large"
            color="#0000ff"
          />
        )}
      </View>
    );
  });

  return (
    <View style={ViewGalleryStyle.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={ViewGalleryStyle.modalContainer}>
          <View style={ViewGalleryStyle.modalContent}>
            <TouchableOpacity onPress={toggleModal} style={ViewGalleryStyle.closeButton}>
              <Text style={ViewGalleryStyle.countText}>{`${currentIndex + 1}/${data.length}`}</Text>
              <Text style={ViewGalleryStyle.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => <RenderItem item={item} index={index} />}
              ref={flatlistRef}
              snapToAlignment="center"
              snapToInterval={Dimensions.get('window').width}
              onViewableItemsChanged={({ viewableItems }) => {
                if (viewableItems.length > 0) {
                  setCurrentIndex(viewableItems[0].index);
                }
              }}
              viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              getItemLayout={(data, index) => ({
                length: Dimensions.get('window').width,
                offset: Dimensions.get('window').width * index,
                index,
              })}
              onScrollToIndexFailed={(info) => {
                setTimeout(() => {
                  flatlistRef.current?.scrollToIndex({
                    index: info.index,
                    animated: true,
                  });
                }, 100);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewGallery;
