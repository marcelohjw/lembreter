import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function App() {

  useEffect(() => {
    //Permissions.getAsync(Permissions.NOTIFICATIONS);
    Notifications.getPermissionsAsync().then(statusObj => {
      if (statusObj.status !== 'granted') {
        return Permissions.askAsync(Permissions.NOTIFICATIONS);
      }
      return statusObj;
    }).then(statusObj => {
      if (statusObj.status !== 'granted') {
        return;
      }
    });
  }, []);

  const triggerNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'A primeira de todas!',
        body: 'Uma notificação simples'
      },
      trigger: {
        seconds: 10
      }
    });
  };


  return (
    <View style={styles.container}>
      <Button 
        title='Aperte' 
        onPress={triggerNotificationHandler} 
      />
      <Text>Esse é o app de notificação!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
