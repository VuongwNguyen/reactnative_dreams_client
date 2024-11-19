import {
  StyleSheet,
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
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {APIUpdateInf} from '../../store/api/InfAPI';
import AppButton from '../Button';

const DescriptionDialog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [desc, setDesc] = useState(props?.data);
  const isDisable = !desc;
  const [inputEditable, setInputEditable] = useState(true);

  useEffect(() => {
    if (props?.data) {
      setDesc(props.data);
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
    const body = {key: 'des', value: desc};

    dispatch(APIUpdateInf(body))
      .unwrap()
      .then(() => {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(desc);
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
            <Image source={Assets.icons.close} />
          </TouchableOpacity>
          <View style={bottomSheetStyle.bodyContainer}>
            <Text style={bottomSheetStyle.titleDialog}>
              {t('descDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc} numberOfLines={1}>
              {t('descDialog.desc')}
            </Text>
            <TextInput
              style={[bottomSheetStyle.input, bottomSheetStyle.descInput]}
              placeholder={t('descDialog.placeholder')}
              placeholderTextColor={Colors.secondary}
              value={desc}
              onChangeText={text => {
                if (text.length <= 100) {
                  setDesc(text);
                  setInputEditable(true);
                } else {
                  setInputEditable(false);
                }
              }}
              multiline={true}
            />
            {!inputEditable && (
              <Text style={bottomSheetStyle.warmText}>
                {t('descDialog.warm')}
              </Text>
            )}

            <AppButton
              title={t('descDialog.confirm')}
              onPress={() => handleSubmit()}
              isDisabled={isDisable}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default DescriptionDialog;

const styles = StyleSheet.create({});
