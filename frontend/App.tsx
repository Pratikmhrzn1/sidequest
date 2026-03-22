import React, { useEffect } from 'react';
import Navigator from '../frontend/src/navigation/Navigator';
import SplashScreen from 'react-native-splash-screen';
export default function App() {
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return <Navigator />;
}