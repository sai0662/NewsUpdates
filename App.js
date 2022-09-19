/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
} from 'react-native';
import Home from './src/Screens/Home';
import messaging from '@react-native-firebase/messaging';
const App = () => {
  useEffect(() => {
    getRequest();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  });

  const getRequest = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getToken();
    }
  };
  const getToken = () => {
    messaging()
      .getToken()
      .then(token => {
        console.log('token for notification', token);
      })
      .catch(error => {
        console.log('error to get a token', error);
      });

    messaging()
      .subscribeToTopic('customers')
      .then(() => {
        console.log('subscribed to topic customers');
      });
  };
  return (
    <View>
      <Home />
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
