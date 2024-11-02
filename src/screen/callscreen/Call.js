import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  RingingCallContent,
  StreamCall,
} from '@stream-io/video-react-native-sdk';
import {useCallContext} from '../../contexts/CallContext';
import {Loading} from '../chatscreen/components';

const Call = () => {
  const {callState} = useCallContext();

  if (!callState) {
    return <Loading />;
  }

  return (
    <StreamCall call={callState}>
      <RingingCallContent />
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
