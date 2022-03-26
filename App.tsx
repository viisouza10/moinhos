import React from 'react';
import {  StatusBar } from 'react-native';
import { useFonts, Rubik_400Regular,Rubik_700Bold } from '@expo-google-fonts/rubik';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';
import Amplify from '@aws-amplify/core'
// @ts-ignore
import awsconfig from './aws-exports';
// @ts-ignore
import { withAuthenticator } from 'aws-amplify-react-native'


Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true
  }
})


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

export default withAuthenticator(App)