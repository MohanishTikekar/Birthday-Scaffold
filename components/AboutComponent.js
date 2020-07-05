import React, { useEffect, useState } from 'react';
import { TouchableOpacity, PanResponder, ActivityIndicator, StyleSheet, Text, View, Share, Animated, ScrollView } from 'react-native';
import { Card, Icon, Image, Button } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from 'react-native-animatable';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import HeartApp from './TheHeartComponent.js'

import { PEOPLE } from "../shared/people";
const limit = PEOPLE.length;


export default function Person_i({ route, navigation }) {

    // Fonts
    let [fontsLoaded] = useFonts({
        'KaushanScript-Regular': require('../assets/fonts/KaushanScript-Regular.ttf'),
        'Shadows-Into-Light': require('../assets/fonts/ShadowsIntoLight-Regular.ttf'),
        'Satisfy-Regular': require('../assets/fonts/Satisfy-Regular.ttf'),
        'Bellota-Bold': require('../assets/fonts/Bellota-Bold.ttf')
    });

    return (
        <React.Fragment>
            <ScrollView>
                <View style={styles.container}>
                    <Text>Made with <Animatable.Text animation="pulse"
                        easing="ease-out" iterationCount="infinite"
                        style={{ textAlign: 'center' }}>
                        ❤️
            </Animatable.Text> by Mohanish</Text>
                </View>
            </ScrollView>
        </React.Fragment>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#69420f',
        alignItems: 'center',
        justifyContent: 'center',
        // marginTop: 10,
    },
    cardItem: {
    },
    addButton: {
        backgroundColor: "#378ad9",
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 32,
        left: 32,
    },
});
