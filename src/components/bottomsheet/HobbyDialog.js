import {
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
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

const HobbyDialog = forwardRef((props, ref) => {
  const [arrHobby, setArrHobby] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [count, setCount] = useState(0);
  const [isShowInput, setIsShowInput] = useState(false);
  const [otherHobby, setOtherHobby] = useState('');
  const [isTouchable, setIsTouchable] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));

  const {t} = useTranslation();

  const hobbyData = [
    {
      id: '1',
      icon: Assets.image.music,
      label: t('hobbyDialog.music'),
    },
    {
      id: '2',
      icon: Assets.image.game,
      label: t('hobbyDialog.game'),
    },
    {
      id: '3',
      icon: Assets.image.sport,
      label: t('hobbyDialog.sport'),
    },
    {
      id: '4',
      icon: Assets.image.film,
      label: t('hobbyDialog.movie'),
    },
    {
      id: '5',
      icon: Assets.image.book,
      label: t('hobbyDialog.book'),
    },
    {
      id: '6',
      icon: Assets.image.pet,
      label: t('hobbyDialog.pet'),
    },
    {
      id: '7',
      icon: Assets.image.technology,
      label: t('hobbyDialog.tech'),
    },
    {
      id: '8',
      icon: Assets.image.food,
      label: t('hobbyDialog.cooking'),
    },
    {
      id: '9',
      icon: Assets.image.travelling,
      label: t('hobbyDialog.travel'),
    },
    {
      id: '10',
      icon: Assets.image.photo,
      label: t('hobbyDialog.photo'),
    },
    {
      id: '11',
      label: t('hobbyDialog.other'),
    },
  ];

  const handlePress = item => {
    if (checkedItems[item.id]) {
      setCheckedItems(prev => {
        const updated = {...prev};
        delete updated[item.id];
        return updated;
      });

      setArrHobby(prev => {
        if (item.label === 'Other') {
          setIsShowInput(false);
          setOtherHobby('');
          return prev.filter(hobby => hobby !== otherHobby);
        } else {
          return prev.filter(hobby => hobby !== item.label);
        }
      });

      setCount(prev => prev - 1);
    } else if (count < 3) {
      setCheckedItems(prev => ({...prev, [item.id]: true}));
      setCount(prev => prev + 1);

      if (item.label === 'Other') {
        setIsShowInput(true);
      } else {
        setArrHobby(prev => [...prev, item.label]);
      }
    }
  };

  useEffect(() => {
    setIsTouchable(
      (isShowInput && otherHobby) || (!isShowInput && count === 3),
    );
  }, [isShowInput, otherHobby, count]);

  const onConfirm = () => {
    if (isShowInput && otherHobby && !arrHobby.includes(otherHobby)) {
      setArrHobby(prev => [...prev, otherHobby]);
    }
    const hobbyString = arrHobby.join(', ');
    console.log(hobbyString);

    const body = {key: 'hobby', value: hobbyString};

    dispatch(APIUpdateInf(body))
      .unwrap()
      .then(() => {
        ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
        setVisible(false);
      })
      .catch(err => ToastAndroid.show(err.message, ToastAndroid.SHORT));

    props.onSubmit(hobbyString);
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
              {t('hobbyDialog.title')}
            </Text>
            <Text style={bottomSheetStyle.desc}>{t('hobbyDialog.desc')}</Text>
            <View style={bottomSheetStyle.hobbyContainer}>
              {hobbyData.map((item, index) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handlePress(item)}
                    style={[
                      bottomSheetStyle.hobbyItem,
                      isChecked && {backgroundColor: '#7ee1ff'},
                    ]}>
                    {item.icon && (
                      <Image
                        source={item.icon}
                        style={bottomSheetStyle.hobbyIcon}
                      />
                    )}
                    <Text style={bottomSheetStyle.labelHobby}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            {isShowInput && (
              <View style={bottomSheetStyle.inputContainer}>
                <TextInput
                  style={bottomSheetStyle.input}
                  placeholder={t('hobbyDialog.placeholder')}
                  placeholderTextColor={Colors.secondary}
                  value={otherHobby}
                  onChangeText={text => setOtherHobby(text)}
                />
              </View>
            )}
            <View style={bottomSheetStyle.btnContainer}>
              <AppButton
                title={t('hobbyDialog.confirm')}
                isDisable={!isTouchable}
                onPress={onConfirm}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
});

export default HobbyDialog;
