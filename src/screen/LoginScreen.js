import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {
  View,
  Image,
  Text,
  KeyboardAwareScrollView,
  Colors,
  TouchableOpacity,
  Checkbox,
} from 'react-native-ui-lib';
import EditText from '../component/EditText';
import AppButton from '../component/AppButton';
import {Color} from '../rnuilib/Color';
import {Font} from '../rnuilib/Font';

Color();
Font();
const {width, height} = Dimensions.get('window');
const statusBarHeight = StatusBar.currentHeight || 0;
const logoSize = width * 0.293;

const LoginScreen = () => {
  const [userAccount, setUserAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  return (
    <KeyboardAwareScrollView>
      <View bg-white padding-24 center style={styles.container}>
        <Image
          width={logoSize}
          height={logoSize}
          source={require('../../assets/images/logo.png')}
        />
        <Text heading marginT-12>
          Welcome to Dreams
        </Text>
        <Text desc center marginT-12>
          Connect with friends, discover new communities, and share your life
          with orthers.
        </Text>

        <Text title style={{fontWeight: 'bold'}} marginT-12>
          Login to continue !
        </Text>

        <Text labelInput left marginT-30 style={styles.leftText}>
          Your email or phone number
        </Text>
        <EditText
          styleContainer={styles.editText}
          value={userAccount}
          onChangeText={setUserAccount}
        />
        <Text labelInput marginT-10 style={styles.leftText}>
          Password
        </Text>
        <EditText
          styleContainer={styles.editText}
          value={password}
          isPassword
          onChangeText={setPassword}
        />

        <View row spread centerV marginT-5>
          <View flex>
            <Checkbox
              value={isRemember}
              onValueChange={() => setIsRemember(!isRemember)}
              size={24}
              borderRadius={12}
              color={Colors.primary}
              label="Remember me ?"
              labelStyle={styles.labelCheckbox}
            />
          </View>

          <TouchableOpacity>
            <Text text14 primary>
              Forgot password ?
            </Text>
          </TouchableOpacity>
        </View>

        <AppButton
          label={'SIGN IN'}
          buttonStyle={styles.button}
          labelStyle={styles.labelBtn}
        />
        <Text text16>Or</Text>
        <View row marginT-10 centerH>
          <TouchableOpacity>
            <Image
              width={50}
              height={50}
              source={require('../../assets/images/gg.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity marginL-44>
            <Image
              width={50}
              height={50}
              source={require('../../assets/images/github.png')}
            />
          </TouchableOpacity>
        </View>
        <View row marginT-20>
          <Text text14>You don't have an account?</Text>
          <TouchableOpacity>
            <Text text14 primary marginL-8>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height - statusBarHeight,
  },
  labelBtn: {
    fontWeight: 'bold',
  },
  rememberContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelCheckbox: {
    fontSize: 14,
  },

  leftText: {
    alignSelf: 'flex-start',
  },
  editText: {
    flex: 1,
    width: '100%',
    maxHeight: 60,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    maxHeight: 60,
    minWidth: '100%',
    height: 60,
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 20,
  },
});
