import {stackName} from '../../navigations/screens';
import {useEffect} from 'react';

export default function EmtyScreen({navigation}) {
  useEffect(() => {
    navigation.navigate(stackName.newPost.name);
  }, []);

  return <></>;
}
