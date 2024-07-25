import {StyleSheet} from 'react-native';
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

Color();
const LoginScreen = () => {
  const [userAccount, setUserAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  return (
    <KeyboardAwareScrollView>
      <View flex padding-24 center>
        <Image
          width={110}
          height={110}
          source={require('../../assets/images/logo.png')}
        />
        <Text text30BL marginT-12>
          Welcome to Dreams
        </Text>
        <Text text16 lightText center marginT-12 style={styles.widthBox}>
          Connect with friends, discover new communities, and share your life
          with orthers.
        </Text>

        <Text text60BL style={{fontWeight: 'bold'}} marginT-12>
          Login to continue !
        </Text>

        <Text text14 left marginT-40 lightText style={styles.leftText}>
          Your email or phone number
        </Text>
        <EditText
          styleContainer={styles.editext}
          value={userAccount}
          onChangeText={setUserAccount}
        />
        <Text text14 lightText marginT-20 style={styles.leftText}>
          Password
        </Text>
        <EditText
          styleContainer={styles.editext}
          value={password}
          isPassword
          onChangeText={setPassword}
        />

        <View row spread centerV marginT-10>
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
        <Text text16 marginT-15>
          Or
        </Text>
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
        <View row marginT-30>
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
  widthBox: {
    width: '90%',
  },
  leftText: {
    alignSelf: 'flex-start',
  },
  editext: {
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
    marginBottom: 8,
    borderRadius: 10,
    marginTop: 30,
  },
});
