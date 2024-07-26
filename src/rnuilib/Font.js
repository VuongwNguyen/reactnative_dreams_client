import {Typography} from 'react-native-ui-lib';
import {Color} from './Color';
Color();
export const Font = () => {
  Typography.loadTypographies({
    heading: {fontSize: 30, fontWeight: 'bold'},
    title: {fontSize: 20, fontWeight: 'bold'},
    desc: {fontSize: 16, lineHeight: 25, color: '#6C757D'},
    labelInput: {fontSize: 14, fontWeight: 'light', color: '#6C757D'},
  });
};
