import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './src/routes/app.routes';
import { AppProvider } from './src/hooks/storage';
import theme from './src/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <NavigationContainer>
          <AppRoutes />
        </NavigationContainer>
      </AppProvider>
    </ThemeProvider>
  );
}
