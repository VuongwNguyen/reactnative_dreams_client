import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ToastAndroid,
} from 'react-native';
import {MultiSelect} from 'react-native-element-dropdown';
import {Assets, Fonts} from '../../styles';
import {useDispatch} from 'react-redux';
import {APIGetFollowing} from '../../store/api/FollowAPI';

const MultiSelectComponent = () => {
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);
  const [fetchAPIStatus, setFetchAPIStatus] = useState('loading');
  let usernameTagList = [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(APIGetFollowing('67010e3da2ce9ed2d170ba13'))
      .then(res => {
        setFetchAPIStatus(res?.meta?.requestStatus);
        setData(res?.payload?.data?.list);
      })
      .catch(err => {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      });
  }, []);

  const userData = data?.map(item => {
    return {
      id: item?.following?._id,
      fullname: `${item?.following?.first_name} ${item?.following?.last_name}`,
    };
  });

  const renderItem = item => {
    return (
      <View style={styles.item} key={item.id}>
        <Image source={Assets.icons.user} />
        <Text style={styles.selectedTextStyle}>{item.fullname}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tag user</Text>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={userData}
        labelField="fullname"
        valueField="id"
        placeholder="Tag user"
        value={selected}
        search
        searchPlaceholder="Search..."
        onChange={item => {
          setSelected(item);
          const labelItem = userData.find(ele => ele.id === item)?.fullname;
          usernameTagList.push(labelItem);
          console.log(usernameTagList);
        }}
        renderLeftIcon={() => (
          <Image source={Assets.icons.tagUser} style={{marginRight: 10}} />
        )}
        renderItem={renderItem}
        renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity
            onPress={() => unSelect && unSelect(item)}
            key={item.id}>
            <View style={styles.selectedStyle}>
              <Text style={styles.textSelectedStyle}>{item.fullname}</Text>
              <Image source={Assets.icons.close} />
            </View>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.cancel}>Cancel</Text>
    </View>
  );
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  cancel: {
    fontSize: 14,
    fontFamily: Fonts.roboto.regular,
    textAlign: 'right',
    marginTop: 30,
    color: 'gray',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.roboto.bold,
    textAlign: 'center',
    marginBottom: 30,
    color: 'black',
  },
  container: {padding: 16},
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: 'white',
    shadowColor: '#000',
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
});
