import React, { useEffect, useState } from 'react';
import { TouchableOpacity, PanResponder, ActivityIndicator, StyleSheet, Text, View, Button, Share, Animated, ScrollView } from 'react-native';
import { Card, Icon, Image } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from 'react-native-animatable';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

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
        navigation.setOptions({ title: `${PEOPLE[personId].name}'s wish!` })
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
            <ScrollView>
                <View style={styles.container}>
                    <LinearGradient
                        colors={['rgba(95, 255, 255, 0.09)', 'rgba(95, 255, 255, 0.17)', 'rgba(95, 255, 255, 0.33)', 'rgba(95, 0, 255, 0.33)', 'transparent']}
                        style={{
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            top: 0,
                            height: 600,
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
                            title={PEOPLE[personId].name}
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
                                    height: 600,
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
                                    source={require('./images/heromain.jpg')}
                                    style={{ width: 300, height: 300, marginLeft: 20 }}
                                    PlaceholderContent={<ActivityIndicator />}
                                    containerStyle={styles.OverlayImage}
                                    transition
                                    transparent
                                />
                                <Ionicons name="md-checkmark-circle" size={32} color="green" style={{ alignItems: 'flex-end' }} />
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
                                    <Text style={{ fontFamily: 'KaushanScript-Regular', fontSize: 18 }}>Heartfelt ??</Text>
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
                            <Text style={{ fontFamily: 'Bellota-Bold', fontSize: 18 }} >Swipe Left the Image above!</Text>
                            <Text style={{ fontFamily: 'Bellota-Bold', fontSize: 15 }}>Or press the button below</Text>
                            <Button
                                title="NEXT WISH!"
                                onPress={() => nextPerson()}
                                fontFamily='Bellota-Bold'
                                fontSize={40}
                            />

                        </Card>
                    </Animatable.View>

                    <Animated.View style={[styles.heartContainer]}>
                        <Heart color="purple" />
                    </Animated.View>
                    <TouchableOpacity style={styles.addButton}>
                        <AntDesign name="plus" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Button
                        title="Back To Home"
                        fontFamily='Bellota-Bold'
                        fontSize={40}
                        onPress={() => navigation.navigate('Home')}
                    />
                </View>
            </ScrollView>
        );
    }
}

const Heart = props => (
    <View {...props} style={[styles.heart, props.style]}>
        <AntDesign name="heart" size={48} color={props.color} />
    </View>
)

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
