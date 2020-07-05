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


    const [hearts, setHearts] = useState([]);

    // Params
    const { personId } = route.params;
    const nextPerson = () => {
        if (personId < limit - 1) {
            navigation.push('Person_i', { personId: personId + 1 })
        }
        else {
            navigation.popToTop();
        }
    }

    //UseEffect HOOK
    useEffect(() => {
        navigation.setOptions({ title: `${PEOPLE[personId].name}` })
    }, []);

    // FOR SHARING VIA ANY APP (SHARE API FROM REACT NATIVE)
    const shareMessage = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        }, {
            dialogTitle: 'Share ' + title
        })
    }

    // GESTURES
    // PANRESPONDER FOR GESTURE
    var viewRef;
    const handleViewRef = ref => viewRef = ref;
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if (dx < -100)
            return true;
        else
            return false;
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        // For the SWING effect on the card bcoz of our gesture.
        onPanResponderGrant: () => {
            // THIS IS SWING EFFECT (SAME ANIMATABLE NAME)
            viewRef.swing(1000)
                .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
        },
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState)) {
                //TODO: INSERT LOTTIE ANIMATION
                nextPerson()
            }
            return true;
        }
    })

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    else {

        return (
            <React.Fragment>
                <ScrollView>
                    <View style={styles.container}>
                        <LinearGradient
                            colors={['rgba(95, 255, 255, 0.09)', 'rgba(95, 255, 255, 0.17)', 'rgba(95, 255, 255, 0.33)', 'rgba(95, 0, 255, 0.33)', 'transparent']}
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                height: 800,
                            }}
                            start={[0.0, 0.0]}
                        />
                        <Text
                            style={{
                                fontFamily: 'KaushanScript-Regular',
                                fontSize: 20
                            }}>
                            Let's see what they have to share...</Text>
                        <Animatable.View
                            animation="lightSpeedIn"
                            direction="normal"
                            duration={300}
                            easing="ease-in-back">
                            <Card
                                title={`${PEOPLE[personId].name}'s wish!`}
                                titleStyle={{ fontFamily: "Bellota-Bold" }}
                            //! Image see
                            //image={require('./images/alberto.png')}
                            >
                                <LinearGradient
                                    colors={['rgba(95, 255, 255, 0.09)', 'rgba(95, 255, 255, 0.17)', 'rgba(95, 255, 255, 0.33)', 'rgba(95, 0, 255, 0.33)', 'transparent']}
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        height: 950,
                                    }}
                                    start={[0.0, 0.0]}
                                />
                                <Animatable.View
                                    animation="fadeInLeft"
                                    direction="normal"
                                    duration={500}
                                    easing="ease-in-back"
                                    ref={handleViewRef}
                                    {...panResponder.panHandlers}>
                                    <Image
                                        // source={require(`${PEOPLE[personId].image}`)}
                                        source={{ uri: `${PEOPLE[personId].image}` }}
                                        style={{ width: 300, height: 400, marginLeft: 20 }}
                                        PlaceholderContent={<ActivityIndicator />}
                                        containerStyle={styles.OverlayImage}
                                        transition
                                        transparent
                                    />
                                </Animatable.View>
                                <Text
                                    style={{
                                        margin: 10,
                                        fontFamily: 'Satisfy-Regular',
                                        fontSize: 22
                                    }}>
                                    {PEOPLE[personId].description}
                                </Text>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        <Text style={{ fontFamily: 'Bellota-Bold', fontSize: 18 }}>Heartfelt ??</Text>
                                        <Text style={{ fontFamily: 'KaushanScript-Regular', fontSize: 18 }}>Share this message...</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        <Icon
                                            raised
                                            reverse
                                            name='share'
                                            type='font-awesome'
                                            color='#51D2A8'
                                            style={styles.cardItem}
                                            onPress={() => shareMessage(PEOPLE[personId].name, PEOPLE[personId].description, 'www.wikipedia.com')} />
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        <Text style={{ fontFamily: 'Bellota-Bold', fontSize: 18 }}>Liked it ??</Text>
                                        <Text style={{ fontFamily: 'KaushanScript-Regular', fontSize: 18 }}>Try Liking. Rapidly!</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: "center" }}>
                                        <HeartApp />
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
                                        <Text style={{ fontFamily: 'Bellota-Bold', fontSize: 18 }} >Swipe Left the Image above!</Text>
                                        <Text style={{ fontFamily: 'Bellota-Bold', fontSize: 18 }} >for the next wish.</Text>
                                        <Text style={{ fontFamily: 'Bellota-Bold', fontSize: 28 }} >OR.</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ flex: 1, alignItems: "center", marginBottom: 20 }}>
                                        <Text style={{ fontFamily: 'Bellota-Bold', fontSize: 18 }}>Press the button below!</Text>
                                    </View>
                                </View>
                                <Button
                                    onPress={() => nextPerson()}
                                    title="NEXT WISH "
                                    titleStyle={{ fontFamily: 'Bellota-Bold', fontSize: 18 }}
                                    buttonStyle={{ width: 180, alignContent: "center", marginLeft: 90, backgroundColor: "#512DA8" }}
                                    type="solid"
                                    icon={
                                        <Icon
                                            name="hand-o-right"
                                            type='font-awesome'
                                            size={20}
                                            color="white"
                                        />
                                    }
                                    iconRight
                                />

                            </Card>
                        </Animatable.View>
                        <Button
                            title="Back To Home"
                            titleStyle={{ fontFamily: 'Bellota-Bold', fontSize: 18 }}
                            onPress={() => navigation.navigate('Home')}
                            buttonStyle={{ width: 170, alignContent: "center", backgroundColor: "#512DA8" }}
                        />
                    </View>
                    <View>
                        <Text>

                        </Text>
                    </View>
                </ScrollView>
            </React.Fragment >
        );
    }
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
