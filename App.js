import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Home from './components/HomeComponent';
import AboutApp from './components/AboutAppComponent';
import Person_i from './components/Person_iComponent'


//?: LOTTIE MAY CRASH THE WHOLE APP
//* SEE LOTTIE'S DOCUMENTATION FOR HELP

const Stack = createStackNavigator();

export default function App() {
  // get font
  //* Apply Font to the <Text> tag as Inline style ONLY.
  let [fontsLoaded] = useFonts({
    'Kaushan': require('./assets/fonts/KaushanScript-Regular.ttf'),
    'Shadows-Into-Light': require('./assets/fonts/ShadowsIntoLight-Regular.ttf'),
    'Satisfy-Regular': require('./assets/fonts/Satisfy-Regular.ttf'),
    'Bellota-Bold': require('./assets/fonts/Bellota-Bold.ttf')
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#7a45de',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'normal',
              fontFamily: "Bellota-Bold",
              fontSize: 25,
            },
          }}>
          <Stack.Screen name="Home" component={Home}
            options={{
              title: 'People',
              headerStyle: {
                backgroundColor: '#7a45de',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'normal',
                fontFamily: "Bellota-Bold",
                fontSize: 25,
              },
            }} />
          <Stack.Screen name="AboutApp" component={AboutApp} options={{ title: 'About App' }} />
          <Stack.Screen name="Person_i" component={Person_i} options={{ title: 'Happy Birthday!' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
