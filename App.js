import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/HomeComponent';
import AboutApp from './components/AboutAppComponent';
import Person1 from './components/Person1Component'
import Person2 from './components/Person2Component'
import Person3 from './components/Person3Component'
import Person_i from './components/Person_iComponent'



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ title: 'T_H_C' }} />
        <Stack.Screen name="AboutApp" component={AboutApp} />
        <Stack.Screen name="Person1" component={Person1} />
        <Stack.Screen name="Person2" component={Person2} />
        <Stack.Screen name="Person3" component={Person3} />
        <Stack.Screen name="Person_i" component={Person_i} />
      </Stack.Navigator>
    </NavigationContainer>
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
