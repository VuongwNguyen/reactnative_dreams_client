import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navigator} from './src/navigations/Navigator';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/store';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './src/screen/LoginScreen';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <GestureHandlerRootView>
            <NavigationContainer
              onReady={() => {
                SplashScreen.hide();
              }}>
              {/* <Navigator /> */}
              <LoginScreen />
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
