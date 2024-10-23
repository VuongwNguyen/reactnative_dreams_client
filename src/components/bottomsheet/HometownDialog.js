import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {bottomSheetStyle} from '../../styles/bottomsheet/BottomSheetStyle';
import {Assets, Colors} from '../../styles';
import {useTranslation} from 'react-i18next';

const HometownDialog = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));
  const {t} = useTranslation();
  const [hometown, setHometown] = useState('');
  const isDisabled = !hometown;
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
              {t('hometownDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc}>
              {t('hometownDialog.desc')}
            </Text>
            <TextInput
              style={bottomSheetStyle.input}
              placeholder={t('hometownDialog.placeholder')}
              placeholderTextColor={Colors.secondary}
              value={hometown}
              onChangeText={text => setHometown(text)}
            />

            <TouchableOpacity
              disabled={isDisabled}
              style={[
                bottomSheetStyle.btnContainer,
                isDisabled && {opacity: 0.5},
              ]}>
              <Text style={bottomSheetStyle.btnLabel}>
                {t('hometownDialog.confirm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default HometownDialog;
