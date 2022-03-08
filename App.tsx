import React from 'react';
import {  StatusBar } from 'react-native';
import { useFonts, Rubik_400Regular,Rubik_700Bold } from '@expo-google-fonts/rubik';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';

const App = () =>{
  let [fontsLoaded] = useFonts({
    Rubik_400Regular,
    Rubik_700Bold,
  });
  
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return(
    <>
      <StatusBar barStyle="dark-content" />
      <Routes/>
    </>
  )
}

export default App