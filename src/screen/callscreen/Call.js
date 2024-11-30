import {useNavigation} from '@react-navigation/native';
import {
  CallContent,
  RingingCallContent,
  StreamCall,
  useCall,
  useCalls,
} from '@stream-io/video-react-native-sdk';
import React, {useEffect} from 'react';
import {BackHandler, StyleSheet} from 'react-native';
import {Loading} from '../chatscreen/components';

const Call = () => {
  const calls = useCalls();
  const call = calls[0];
  const navigation = useNavigation();

  useEffect(() => {
    const unsub = BackHandler.addEventListener(
      'hardwareBackPress',
      async () => {
        if (!call) {
          navigation.canGoBack() && navigation.goBack();
          return true;
        } else {
          await call.leave();
          navigation.canGoBack() && navigation.goBack();
          return true;
        }
      },
    );

    return () => {
      unsub.remove();
    };
  }, [call]);

  useEffect(() => {
    if (!call) return;

    const unsubs = [];

    unsubs.push(
      call.on('call.rejected', event => {
        if (
          navigation.canGoBack() &&
          event?.call?.session?.participants?.length < 2
        ) {
          navigation.goBack();
        }
      }),
    );

    unsubs.push(
      call.on('call.ended', () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      }),
    );

    return () => {
      unsubs.forEach(unsub => unsub());
    };
  }, [call]);

  if (!call) {
    return <Loading />;
  }

  return (
    <StreamCall call={call}>
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
