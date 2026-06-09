/**
 * Little Steps — baby companion app.
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {RootNavigator} from './src/navigation/RootNavigator';
import {initI18n} from './src/i18n';
import {useAppStore} from './src/store/useAppStore';
import {colors} from './src/theme';

function App(): React.JSX.Element {
  const language = useAppStore((s) => s.language);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const i18n = initI18n(language);
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
    setReady(true);
  }, [language]);

  if (!ready) {
    return <GestureHandlerRootView style={{flex: 1}} />;
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={colors.background}
        />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
