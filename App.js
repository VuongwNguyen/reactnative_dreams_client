import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Navigator} from './src/navigations/Navigator';
import {persistor, store} from './src/store';

import {StatusBar} from 'react-native';
import MultiSelectComponent from './src/screen/newpost/TagUserDialog';

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
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <NavigationContainer>
              <Navigator />
            </NavigationContainer>
            {/* <MultiSelectComponent /> */}
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
