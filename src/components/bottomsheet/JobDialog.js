import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ToastAndroid,
} from 'react-native';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';
import { useDispatch } from 'react-redux';
import { APIUpdateInf } from '../../store/api/InfAPI';

const JobDialog = forwardRef((props, ref) => {
  const {t} = useTranslation();
  const dispatch = useDispatch()
  const [job, setJob] = useState('');
  const [workplace, setWorkplace] = useState('');
  const isDisable = !job;
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));

  const handleSubmit = () => {
    const body = {key: 'job', value: job};
    dispatch(APIUpdateInf(body))
      .unwrap()
      .then(() => {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(job);
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
              {t('jobDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc}>{t('jobDialog.desc')}</Text>
            <View style={bottomSheetStyle.inputGroup}>
              <TextInput
                style={bottomSheetStyle.input}
                placeholder={t('jobDialog.job')}
                placeholderTextColor={Colors.secondary}
                value={job}
                onChangeText={text => setJob(text)}
              />
              <TextInput
                style={bottomSheetStyle.input}
                placeholder={t('jobDialog.workplace')}
                placeholderTextColor={Colors.secondary}
                value={workplace}
                onChangeText={text => setWorkplace(text)}
              />
            </View>

            <TouchableOpacity
             onPress={()=>handleSubmit()}
              disabled={isDisable}
              style={[
                bottomSheetStyle.btnContainer,
                isDisable && {opacity: 0.5},
              ]}>
              <Text style={bottomSheetStyle.btnLabel}>
                {t('educationDialog.confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default JobDialog;
