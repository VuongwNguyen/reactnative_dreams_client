import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Navigator} from './src/navigations/Navigator';
import {persistor, store} from './src/store';

import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import PrivacySettingScreen from './src/screen/privacysetting/PrivacySettingScreen';
import UsernameDialog from './src/components/bottomsheet/UsernameDialog';
import NicknameDialog from './src/components/bottomsheet/NicknameDialog';
import LocationDialog from './src/components/bottomsheet/LocationDialog';
import HobbyDialog from './src/components/bottomsheet/HobbyDialog';
import GenderDialog from './src/components/bottomsheet/GenderDialog';
import DateOfBirthDialog from './src/components/bottomsheet/DateOfBirthDialog';
import NationalityDialog from './src/components/bottomsheet/NationalittyDialog';
import EducationDialog from './src/components/bottomsheet/EducationDialog';
// import HometownDialog from './src/components/bottomsheet/HomeTownDialog';
import DescriptionDialog from './src/components/bottomsheet/DescriptionDialog';

export default function App() {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            {/* <HobbyDialog /> */}
            <NavigationContainer>
              <Navigator />
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
