import React, { useState } from 'react';
import {
  View,
  Button,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import Video from 'react-native-video';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  const videoData = [
    { id: '1', type:'video', uri: 'https://firebasestorage.googleapis.com/v0/b/lazoapp-75ae8.appspot.com/o/Recording%202024-10-21%20134036.mp4?alt=media&token=60b8ce26-ef6f-4d38-86dd-72751e3c367c' },
    { id: '2', type:'video', uri: 'https://firebasestorage.googleapis.com/v0/b/lazoapp-75ae8.appspot.com/o/20241024-0311-02.3027884.mp4?alt=media&token=20f28b56-6c6d-413a-878f-52ce97263c11' },
    { id: '3', type:'video', uri: 'https://firebasestorage.googleapis.com/v0/b/lazoapp-75ae8.appspot.com/o/20241024-0311-02.3027884.mp4?alt=media&token=20f28b56-6c6d-413a-878f-52ce97263c11' },
    { id: '4', type:'image', uri: 'https://firebasestorage.googleapis.com/v0/b/lazoapp-75ae8.appspot.com/o/Screenshot%202024-08-08%20134218.png?alt=media&token=94b06308-c1c5-4498-a883-02821ae86611' },
    { id: '5', type:'image', uri: 'https://firebasestorage.googleapis.com/v0/b/lazoapp-75ae8.appspot.com/o/Screenshot%202024-08-08%20134218.png?alt=media&token=94b06308-c1c5-4498-a883-02821ae86611' },
    { id: '6', type:'image', uri: 'https://firebasestorage.googleapis.com/v0/b/lazoapp-75ae8.appspot.com/o/Screenshot%202024-08-08%20134218.png?alt=media&token=94b06308-c1c5-4498-a883-02821ae86611' },
    // Add more video URLs as needed
  ];

  return (
    <View style={styles.container}>
      <Button title="Show Videos" onPress={toggleModal} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
              <Text style={styles.countText}>{`${currentIndex + 1}/${videoData.length}`}</Text>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <FlatList
              data={videoData}
              keyExtractor={(item) => item.id}
              renderItem={({ item,index }) => {
                return(
                  <View style={styles.videoContainer}>
                  {
                    item.type === 'video' ? (
                      <Video
                        source={{ uri: item.uri }}
                        style={styles.video}
                        resizeMode="contain"
                        controls
                      />
                    ) : (
                      <Image
                        source={{ uri: item.uri }}
                        style={styles.image}
                        resizeMode="contain"
                      />
                    )
                  }
                </View>
                )
              }}
              snapToAlignment='center'
              snapToInterval={Dimensions.get('window').width}
              onViewableItemsChanged={({ viewableItems }) => {
                if (viewableItems.length > 0) {
                  setCurrentIndex(viewableItems[0].index);
                }
              }}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    flexDirection:'row'
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
    position:'absolute',
    right:10,
    top:7
  },
  videoContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * (19/20), // 16:9 aspect ratio
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  countText:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'white',
    flex:1,
    textAlign:'center',
  },
  image: {
    width: '100%',
    height: '100%',
  }
});

export default App;
