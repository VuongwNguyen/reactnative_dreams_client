import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import {PostedTabStyle} from '../../styles/profileStyle/PostedTabStyle';
import {Assets} from '../../styles';
const PostedTab = () => {
  const itemPostRender = ({item, index}) => (
    <View style={PostedTabStyle.itemContainer}>
      <View style={PostedTabStyle.row}>
        <Image
          style={PostedTabStyle.avatarItemPost}
          source={{
            uri: 'https://th.bing.com/th/id/R.57dd0a120b370c4a7c4e0c5dbb883756?rik=ybFTeUMssGMRtA&riu=http%3a%2f%2fsammedia.vn%2fpublic%2fuploads%2fposts%2ffiles%2fchau_tinh_tri4.jpeg&ehk=SV9zLheXpUVnzmagFQv1A7mnS06N7%2fl3kuZD9gV3Ekw%3d&risl=&pid=ImgRaw&r=0',
          }}
        />
        <View style={PostedTabStyle.nameGroupCoantainer}>
          <Text style={PostedTabStyle.name}>{'Chau Tinh Tri'}</Text>
          <Text>{'5h ago'}</Text>
        </View>
        <TouchableOpacity>
          <Image style={PostedTabStyle.iconMore} source={Assets.image.more} />
        </TouchableOpacity>
      </View>
      <Text style={PostedTabStyle.content}>{item.textContent}</Text>
      <View>
        {item.images.length > 0 && (
          <Swiper style={PostedTabStyle.swiper}>
            {item.images.map((image, index) => {
              return (
                <Image
                  source={{
                    uri: image,
                  }}
                  style={PostedTabStyle.post}
                  key={image}
                />
              );
            })}
          </Swiper>
        )}
      </View>

      <View style={PostedTabStyle.interactionContainer}>
        <TouchableOpacity style={PostedTabStyle.row}>
          <Image style={PostedTabStyle.interactionIcon} source={Assets.image.heart} />
          <Text>{'like'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PostedTabStyle.row}>
          <Image
            style={PostedTabStyle.interactionIcon}
            source={Assets.image.comment}
          />
          <Text>{'comment'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PostedTabStyle.row}>
          <Image style={PostedTabStyle.interactionIcon} source={Assets.image.share} />
          <Text>{'share'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  return (
    <View style={PostedTabStyle.container}>
      <FlatList
        scrollEnabled={false}
        nestedScrollEnabled={true}
        data={postsData}
        renderItem={itemPostRender}
        keyExtractor={item => item.name}
      />
    </View>
  );
};

export default PostedTab;

const postsData = [
  {
    id: 1,
    name: 'user 1',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
    date: '5h ago',
    textContent:
      'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
    images: [],
    like: '1.9k',
    comment: '1.9k',
    share: '1.9k',
  },
  {
    id: 2,
    name: 'user 2',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
    date: '5h ago',
    textContent:
      'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
    images: [
      'https://th.bing.com/th/id/R.dc173c88b61f33adea0a33847cbb2080?rik=1tsrYlLvrzv%2bvQ&pid=ImgRaw&r=0',
      'https://www.japantimes.co.jp/uploads/imported_images/uploads/2022/12/np_file_200317.jpeg',
      'https://th.bing.com/th/id/R.dc173c88b61f33adea0a33847cbb2080?rik=1tsrYlLvrzv%2bvQ&pid=ImgRaw&r=0',
      'https://www.japantimes.co.jp/uploads/imported_images/uploads/2022/12/np_file_200317.jpeg',
      'https://th.bing.com/th/id/R.dc173c88b61f33adea0a33847cbb2080?rik=1tsrYlLvrzv%2bvQ&pid=ImgRaw&r=0',
      'https://www.japantimes.co.jp/uploads/imported_images/uploads/2022/12/np_file_200317.jpeg',
      'https://th.bing.com/th/id/R.dc173c88b61f33adea0a33847cbb2080?rik=1tsrYlLvrzv%2bvQ&pid=ImgRaw&r=0',
      'https://www.japantimes.co.jp/uploads/imported_images/uploads/2022/12/np_file_200317.jpeg',
    ],
    like: '1.9k',
    comment: '1.9k',
    share: '1.9k',
  },
  {
    id: 3,
    name: 'user 3',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
    date: '5h ago',
    textContent:
      'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
    images: [
      'https://th.bing.com/th/id/R.dc173c88b61f33adea0a33847cbb2080?rik=1tsrYlLvrzv%2bvQ&pid=ImgRaw&r=0',
      'https://www.japantimes.co.jp/uploads/imported_images/uploads/2022/12/np_file_200317.jpeg',
    ],
    like: '1.9k',
    comment: '1.9k',
    share: '1.9k',
  },
  {
    id: 4,
    name: 'user 4',
    avatar:
      'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/d07bca98931623.5ee79b6a8fa55.jpg',
    date: '5h ago',
    textContent:
      'It is a long established fact that a reader will be distracted by te readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has it a more-or-less',
    images: [
      'https://th.bing.com/th/id/R.dc173c88b61f33adea0a33847cbb2080?rik=1tsrYlLvrzv%2bvQ&pid=ImgRaw&r=0',
    ],
    like: '1.9k',
    comment: '1.9k',
    share: '1.9k',
  },
];
