import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {APIUpdateInf} from '../../store/api/InfAPI';

const LocationDialog = forwardRef((props, ref) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [location, setLocation] = useState(props?.data);
  const isDisable = !location;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (props?.data) {
      setLocation(props.data);
    }
  }, [props?.data]);
  
  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));

  const handleSubmit = () => {
    const body = {key: 'zone', value: location};
    dispatch(APIUpdateInf(body))
      .unwrap()
      .then(() => {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(location);
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setVisible(false)}>
      <View style={bottomSheetStyle.modalBackground}>
        <View style={bottomSheetStyle.container}>
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Image
              source={Assets.icons.close}
              style={{height: 20, width: 20}}
            />
          </TouchableOpacity>
          <View style={bottomSheetStyle.bodyContainer}>
            <Text style={bottomSheetStyle.titleDialog}>
              {t('locationDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc}>
              {t('locationDialog.desc')}
            </Text>
            <TextInput
              style={bottomSheetStyle.input}
              placeholder={t('locationDialog.placeholder')}
              placeholderTextColor={Colors.secondary}
              value={location}
              onChangeText={text => setLocation(text)}
            />

            <TouchableOpacity
              onPress={() => handleSubmit()}
              disabled={isDisable}
              style={[
                bottomSheetStyle.btnContainer,
                isDisable && {opacity: 0.5},
              ]}>
              <Text style={bottomSheetStyle.btnLabel}>
                {t('locationDialog.confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default LocationDialog;
