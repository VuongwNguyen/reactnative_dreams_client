import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import ItemPost from '../../components/ItemPost';
import Animated from 'react-native-reanimated';

const TrendingPostTab = props => {
  const {scrollHandler} = props;
  const [dataPosts, setDataPosts] = useState(postsData);
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={{marginTop: 10}}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}>
        {dataPosts.map((item, index) => (
          <ItemPost key={index} item={item} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default TrendingPostTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

const postsData = [
  {
    name: 'Velerie Hiddersley 1',
    avatar:
      'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
    hour: '1 hour ago',
    title:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    content:
      'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
    image: [
      'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
    ],
    like: 0,
    comment: 0,
    share: 0,
  },
  {
    name: 'Velerie Hiddersley 2',
    avatar:
      'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
    hour: '1 hour ago',
    title:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    content:
      'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
    image: [],
    like: 0,
    comment: 0,
    share: 0,
  },
  {
    name: 'Velerie Hiddersley 3',
    avatar:
      'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
    hour: '1 hour ago',
    title:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    content:
      'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
    image: [
      'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
      'https://i.pinimg.com/236x/db/7b/f4/db7bf49e8745f88a21fb74d73851d572.jpg',
      'https://i.pinimg.com/236x/16/90/2d/16902d6ebaefea0fb48fdbc70bac939d.jpg',
    ],
    like: 8,
    comment: 0,
    share: 0,
  },
  {
    name: 'Velerie Hiddersley 4',
    avatar:
      'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
    hour: '1 hour ago',
    title:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    content:
      'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
    image: [
      'https://i.pinimg.com/236x/9a/c0/8d/9ac08d3f4936eaabe47145b57a93b3fe.jpg',
      'https://i.pinimg.com/236x/db/7b/f4/db7bf49e8745f88a21fb74d73851d572.jpg',
      'https://i.pinimg.com/236x/c4/72/c5/c472c5aa885fee264dba6bc30d9db057.jpg',
      'https://i.pinimg.com/236x/db/12/ca/db12caeb3afa6e2df4e93e2fc01d6518.jpg',
      'https://i.pinimg.com/474x/aa/e3/a0/aae3a00dcb0c1ab098bf43f2f83a6332.jpg',
    ],
    like: 0,
    comment: 0,
    share: 0,
  },
];
