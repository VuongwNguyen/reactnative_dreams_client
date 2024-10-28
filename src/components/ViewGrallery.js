import React, { useState } from 'react';
import {
  View,
  Button,
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
  const {data = [], modalVisible, setModalVisible} = props
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  // const videoData = [
  //   { id: '1', type:'video', uri: 'https://firebasestorage.googleapis.com/v0/b/lazoViewGallery-75ae8.appspot.com/o/Recording%202024-10-21%20134036.mp4?alt=media&token=60b8ce26-ef6f-4d38-86dd-72751e3c367c' },
  //   { id: '2', type:'video', uri: 'https://firebasestorage.googleapis.com/v0/b/lazoapp-75ae8.appspot.com/o/20241024-0311-02.3027884.mp4?alt=media&token=20f28b56-6c6d-413a-878f-52ce97263c11' },
  //   { id: '3', type:'video', uri: 'https://firebasestorage.googleapis.com/v0/b/lazoapp-75ae8.appspot.com/o/20241024-0311-02.3027884.mp4?alt=media&token=20f28b56-6c6d-413a-878f-52ce97263c11' },
  //   { id: '4', type:'image', uri: 'https://firebasestorage.googleapis.com/v0/b/lazoapp-75ae8.appspot.com/o/Screenshot%202024-08-08%20134218.png?alt=media&token=94b06308-c1c5-4498-a883-02821ae86611' },
  //   { id: '5', type:'image', uri: 'https://firebasestorage.googleapis.com/v0/b/lazoapp-75ae8.appspot.com/o/Screenshot%202024-08-08%20134218.png?alt=media&token=94b06308-c1c5-4498-a883-02821ae86611' },
  //   { id: '6', type:'image', uri: 'https://firebasestorage.googleapis.com/v0/b/lazoapp-75ae8.appspot.com/o/Screenshot%202024-08-08%20134218.png?alt=media&token=94b06308-c1c5-4498-a883-02821ae86611' },
  //   // Add more video URLs as needed
  // ];
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
      {loading && <ActivityIndicator style={ViewGalleryStyle.loader} size="large" color="#0000ff" />}
    </View>
    )
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
              renderItem={({ item,index }) => (
                <RenderItem item={item} index={index} />
              )}
              snapToAlignment='center'
              snapToInterval={Dimensions.get('window').width}
              onViewableItemsChanged={({ viewableItems }) => {
                if (viewableItems.length > 0) {
                  setCurrentIndex(viewableItems[0].index);
                }
              }}
              viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
              horizontal={true}
              showsVerticalScrollIndicator={true}
              pagingEnabled={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewGallery;