import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {
  ActivityIndicator,
  PermissionsAndroid,
  StatusBar,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Navigator, navigatorRef} from './src/navigations/Navigator';
import {persistor, store} from './src/store';
import AlertDialog, {alertRef} from './src/components/dialog/AlertDialog';

export default function App() {
  React.useEffect(() => {
    SplashScreen.hide();
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
  }, []);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider style={{flex: 1}}>
          <GestureHandlerRootView>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <NavigationContainer
              ref={navigatorRef}
              fallback={
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size={'large'} color={'black'} />
                </View>
              }>
              <Navigator />
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
      <AlertDialog ref={alertRef} />
    </ReduxProvider>
  );
}
