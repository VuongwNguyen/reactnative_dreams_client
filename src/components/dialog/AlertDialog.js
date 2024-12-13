import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {Assets, Colors} from '../../styles';

const {width, height} = Dimensions.get('window');

export const alertRef = createRef();

const AlertDialog = (_, ref) => {
  const [show, setShow] = useState(false);
  const [cancelAction, setCancelAction] = useState({});
  const [rejectAction, setRejectAction] = useState({});
  const [resolveAction, setResolveAction] = useState({});
  const [label, setLabel] = useState('Alert');
  const [content, setContent] = useState('This is a content');

  useImperativeHandle(ref, () => {
    return {
      alert: (label, title, {cancel, resolve, reject}) => {
        setLabel(label);
        setContent(title);

        if (cancel != null) {
          setCancelAction({
            text: cancel.text,
            onPress: cancel.onPress || onReset,
          });
        }

        if (reject != null) {
          setRejectAction({
            text: reject.text,
            onPress: reject.onPress || onReset,
          });
        }

        if (resolve != null) {
          setResolveAction({text: resolve.text, onPress: resolve.onPress});
        }

        setShow(true);
      },
    };
  });

  const onReset = () => {
    setCancelAction({});
    setRejectAction({});
    setResolveAction({});
    setLabel('Alert');
    setContent('This is a content');
    setShow(false);
  };

  return (
    show && (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.alert}>
            <View style={styles.padding}>
              <View style={styles.wrap}>
                <Image style={styles.logo} source={Assets.image.logo} />
              </View>
            </View>

            <Text style={styles.label}>{label}</Text>
            <Text style={styles.content}>{content}</Text>
            <View style={styles.gap} />
            <View style={styles.row}>
              {!!cancelAction.text ? (
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={cancelAction.onPress}>
                  <Text style={styles.cancel}>{cancelAction.text}</Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}
              <View style={[styles.row, {justifyContent: 'flex-end'}]}>
                {!!rejectAction.text ? (
                  <TouchableOpacity
                    onPress={() => {
                      rejectAction.onPress();
                      setShow(false);
                    }}>
                    <Text style={styles.reject}>{rejectAction.text}</Text>
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
                {!!resolveAction.text ? (
                  <TouchableOpacity
                    onPress={() => {
                      resolveAction.onPress();
                      setShow(false);
                    }}>
                    <Text style={styles.resolve}>{resolveAction.text}</Text>
                  </TouchableOpacity>
                ) : (
                  <View />
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  );
};

export default forwardRef(AlertDialog);

const styles = StyleSheet.create({
  padding: {
    padding: 12,
    backgroundColor: 'white',
    position: 'absolute',
    top: -70,
    borderRadius: 110,
  },
  wrap: {
    padding: 10,
    backgroundColor: Colors.primary,
    top: 0,
    alignSelf: 'flex-start',
    borderRadius: 90,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 70,
  },
  gap: {
    height: 12,
  },
  cancel: {
    color: 'grey',
  },
  resolve: {
    color: Colors.primary,
  },
  reject: {
    color: 'rgba(255, 0, 0, 0.6)',
  },
  cancelBtn: {
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    maxWidth: width * 0.9,
    minWidth: width * 0.7,
    alignSelf: 'stretch',
  },
  content: {
    fontSize: 16,
    color: 'black',
  },
  label: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alert: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    maxWidth: width * 0.9,
    minWidth: width * 0.7,
    gap: 12,
    elevation: 10,
  },
  container: {
    width,
    height,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
