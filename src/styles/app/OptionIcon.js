import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Sizing} from '../../styles';

export const OptionIcon = props => {
  const {type, icon} = props.icon;
  switch (type) {
    case 'Feather':
      return <Feather name={icon} size={Sizing.lg} color="black" />;
    case 'FontAwesome':
      return <FontAwesome name={icon} size={Sizing.lg} color="black" />;
    case 'Foundation':
      return <Foundation name={icon} size={Sizing.lg} color="black" />;
    case 'FontAwesome6':
      return <FontAwesome6 name={icon} size={Sizing.lg} color="black" />;
    case 'Ionicons':
      return <Ionicons name={icon} size={Sizing.lg} color="black" />;
    case 'MaterialIcons':
      return <MaterialIcons name={icon} size={Sizing.lg} color="black" />;
    case 'SimpleLineIcons':
      return <SimpleLineIcons name={icon} size={Sizing.lg} color="black" />;
    case 'AntDesign':
      return <AntDesign name={icon} size={Sizing.lg} color="black" />;
    case 'EvilIcons':
      return <EvilIcons name={icon} size={Sizing.lg} color="black" />;
    case 'Entypo':
      return <Entypo name={icon} size={Sizing.lg} color="black" />;
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons name={icon} size={Sizing.lg} color="black" />
      );
  }
};
