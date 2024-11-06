import {useNavigation} from '@react-navigation/native';
import {
  CallContent,
  RingingCallContent,
  StreamCall,
  useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import React, {useEffect} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {useCallContext} from '../../contexts/CallContext';
import {Loading} from '../chatscreen/components';

const Call = () => {
  const {callState, setCall} = useCallContext();
  const navigation = useNavigation();

  useEffect(() => {
    const unsub = BackHandler.addEventListener(
      'hardwareBackPress',
      async () => {
        if (!callState) return true;
        else {
          await callState.leave();
          navigation.canGoBack() && navigation.goBack();
          return true;
        }
      },
    );

    return () => {
      unsub.remove();
    };
  }, [callState]);

  useEffect(() => {
    if (!callState) return;
    const unsubs = [];

    unsubs.push(
      callState.on('call.rejected', event => {
        if (
          navigation.canGoBack() &&
          event?.call?.session?.participants?.length < 2
        ) {
          setCall(null);
          navigation.goBack();
        }
      }),
    );

    unsubs.push(
      callState.on('call.ended', () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }),
    );

    return () => {
      unsubs.forEach(unsub => unsub());
    };
  }, []);

  if (!callState) {
    return <Loading />;
  }

  return (
    <StreamCall call={callState}>
      <RingingCallContent
        CallContent={() => (
          <CallContent
            onHangupCallHandler={async () => {
              if (navigation.canGoBack()) navigation.goBack();
            }}
            onBackPressed={async () => {
              await callState.leave();
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
