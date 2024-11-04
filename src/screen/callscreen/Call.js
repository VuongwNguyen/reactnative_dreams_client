import {useNavigation} from '@react-navigation/native';
import {
  CallContent,
  RingingCallContent,
  StreamCall,
} from '@stream-io/video-react-native-sdk';
import React from 'react';
import {StyleSheet} from 'react-native';
import {useCallContext} from '../../contexts/CallContext';
import {Loading} from '../chatscreen/components';

const Call = () => {
  const {callState} = useCallContext();
  const navigation = useNavigation();

  if (!callState) {
    return <Loading />;
  }

  return (
    <StreamCall call={callState}>
      <RingingCallContent
        CallContent={() => (
          <CallContent
            onHangupCallHandler={() => {
              if (navigation.canGoBack()) navigation.goBack();
            }}
            onBackPressed={() => {
              if (navigation.canGoBack()) navigation.goBack();
            }}
          />
        )}
      />
    </StreamCall>
  );
};

export default Call;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
