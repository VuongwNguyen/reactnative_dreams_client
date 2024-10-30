import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { createThumbnail } from 'react-native-create-thumbnail';
import { Assets } from '../styles';

const ThumbnailVideo = ({ videoUri, style, styleIcon }) => {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    // Tạo thumbnail khi component được mount
    createThumbnail({
      url: videoUri,
      timeStamp: 2000, // Thời điểm lấy thumbnail (đơn vị: ms)
    })
      .then(response => {        
        setThumbnail(response.path);
      })
      .catch(err => {
        console.error("Error creating thumbnail:", err);
      });
  }, [videoUri])

  return (
    <View style={[style,{backgroundColor:'black'}]} >
      {thumbnail && (
          <Image
            source={{ uri: thumbnail }}
            style={style}
          />
      )}
      <Image source={Assets.icons.play_video} style={styleIcon}/>
    </View>
  );
};

export default ThumbnailVideo;
