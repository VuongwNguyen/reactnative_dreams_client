import {useNavigation} from '@react-navigation/native';
import {
  useCalls,
  useStreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import {createContext, useContext, useEffect, useState} from 'react';
import uuid from 'react-native-uuid';
import {stackName} from '../navigations/screens';

const CallContext = createContext();

const callTypes = ['audio_room', 'default'];

export const CallProvider = ({children}) => {
  const allCall = useCalls();
  const incommingCall = allCall[0];
  const navigation = useNavigation();
  const client = useStreamVideoClient();

  useEffect(() => {
    if (!incommingCall) return;

    navigation.navigate(stackName.call.name);
  }, [incommingCall]);

  const registerCall = async (members = [], type = 1) => {
    try {
      if (client) {
        const id = uuid.v4();
        const newCall = client.call(callTypes[type], id);
        await newCall.getOrCreate({
          data: {
            members: members,
          },
          ring: true,
        });

        return;
      }

      throw new Error('Client may be null');
    } catch (e) {
      console.log('[CallContext] err: ', e);
    }
  };

  return (
    <CallContext.Provider value={{registerCall}}>
      {children}
    </CallContext.Provider>
  );
};

export const useCallContext = () => useContext(CallContext);

export default CallContext;
