import {createContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {Loading} from '../screen/chatscreen/components';
import {
  StreamVideo,
  StreamVideoClient,
} from '@stream-io/video-react-native-sdk';
import {streamTokenProvider} from '../utils/token';

const apiKey = 'czyfn3v6sak6';

const StreamProvider = ({children}) => {
  const [client, setClient] = useState(null);

  const {authenticated} = useSelector(state => state.account);

  const {userBasicInfData} = useSelector(state => state.userBasicInf);

  useEffect(() => {
    if (!authenticated) return;

    if (
      !userBasicInfData?.avatar &&
      !userBasicInfData?._id &&
      !userBasicInfData?.fullname
    )
      return;

    const user = {
      id: userBasicInfData?._id,
      image: userBasicInfData?.avatar,
      name: userBasicInfData?.fullname,
    };

    const newClient = StreamVideoClient.getOrCreateInstance({
      apiKey,
      user,
      tokenProvider: streamTokenProvider,
    });

    setClient(newClient);

    return () => {
      console.log('stream client disconnect');
      newClient.disconnectUser();
      setClient(null);
    };
  }, [authenticated, userBasicInfData]);

  if (!client) {
    return <Loading />;
  }

  return <StreamVideo client={client}>{children}</StreamVideo>;
};

export default StreamProvider;
