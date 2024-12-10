import React, {useEffect, useState} from 'react';
import {Pressable, Text, View, Image, ToastAndroid} from 'react-native';
import {MentionInput} from 'react-native-controlled-mentions';
import {Colors} from '../../styles';
import {useDispatch} from 'react-redux';
import {APIGetFollowing} from '../../store/api/FollowAPI';
import {setIds} from '../../store/slices/IdsTagUserSlice';

const TagUserMention = ({tagList}) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [followingUserList, setFollowingUserList] = useState([]);
  const [listTagUser, setListTagUser] = useState([]);
  useEffect(() => {
    dispatch(APIGetFollowing({user_id_view: ''}))
      .then(res => {
        const resData = res?.payload?.list;
        const usersTransformed = resData.map(item => ({
          id: item.user._id,
          name: item.user.fullname,
          avatar: item.user.avatar,
        }));
        if (resData) {
          setListTagUser(usersTransformed);
          setFollowingUserList(usersTransformed);
        } else {
          ToastAndroid.show('Danh sách following trống!', ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  }, []);

  const renderSuggestions =
    data =>
    ({keyword, onSuggestionPress}) => {
      if (!value) {
        return null;
      }
      return (
        <View
          style={{
            position: 'absolute',
            top: 50,
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            zIndex: 1,
          }}>
          {data
            .filter(one =>
              one.name
                ?.toLocaleLowerCase()
                .includes(keyword?.toLocaleLowerCase()),
            )
            .map(one => (
              <Pressable
                key={one?.id}
                onPress={() => {
                  onSuggestionPress(one);
                }}
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  alignItems: 'center',
                  backgroundColor: '#f0f0f0',
                  borderRadius: 8,
                  marginBottom: 5,
                }}>
                <Image
                  source={{uri: one?.avatar}}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    marginRight: 10,
                  }}
                />
                <Text style={{color: 'black'}}>{one?.name}</Text>
              </Pressable>
            ))}
        </View>
      );
    };
  useEffect(() => {
    if (!!tagList) {
      const tagString = tagList
        .map(user => `@[${user.fullname}](${user._id})`)
        .join(' ');

      console.log(tagString);
      setValue(tagString);
    }
  }, []);
  useEffect(() => {
    const idMatches = value.match(/\(([^)]+)\)/g);
    const ids = idMatches ? idMatches.map(id => id.replace(/[()]/g, '')) : [];
    const filteredFollowingUserList = listTagUser.filter(
      user => !ids.includes(user.id),
    );
    setFollowingUserList(filteredFollowingUserList);
    dispatch(setIds(ids));
  }, [value]);

  return (
    <View>
      {followingUserList?.length == 0 ? (
        ''
      ) : (
        <MentionInput
          autoFocus
          value={value}
          onChange={setValue}
          partTypes={[
            {
              trigger: '@',
              renderSuggestions: renderSuggestions(followingUserList),
              textStyle: {fontWeight: 'bold', color: Colors.primary},
            },
          ]}
          style={{
            fontSize: 15,
          }}
          placeholder="Tag others with @username"
          placeholderTextColor={Colors.secondary}
        />
      )}
    </View>
  );
};

export default TagUserMention;
