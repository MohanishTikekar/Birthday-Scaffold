import React, { useState } from 'react';
import { ActivityIndicator, Modal, FlatList, Platform, StyleSheet, Text, ScrollView, Button, View } from 'react-native';
import { Tile, Overlay, Image, Header, Tooltip } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from "expo-linear-gradient";
import { PEOPLE } from "../shared/people";
import { BIRTHDAYGUY } from "../shared/birthdayGuy"
import LottieView from 'lottie-react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

// TODO: LOTTIE TYPE ARIBNB ANIMATIONS
// TODO: FONTSTYLE.
// TODO: ADD IMAGES
// TODO: FLOATING HEART-> Turn Person_i component into Class component, then can do. OR Turn his code into Functional Component.
// TODO: NICE BACKGROUND IMAGE IN THE ABOUTAPP COMPONENT.

export default function Home({ navigation }) {
    // Fonts
    let [fontsLoaded] = useFonts({
        'KaushanScript-Regular': require('../assets/fonts/KaushanScript-Regular.ttf'),
        'Shadows-Into-Light': require('../assets/fonts/ShadowsIntoLight-Regular.ttf'),
        'Satisfy-Regular': require('../assets/fonts/Satisfy-Regular.ttf'),
        'Bellota-Bold': require('../assets/fonts/Bellota-Bold.ttf')
    });

    //Hooks
    const [people, setPeople] = useState(PEOPLE);
    const [showModal, toggleModal] = useState(true);
    const [birthdayGuy, setBirthdayGuy] = useState(BIRTHDAYGUY)

    const renderPeopleItem = ({ item, index }) => {

        return (
            <Animatable.View
                animation="tada"
                direction="alternate"
                duration={2}
                easing="ease-in-out-cubic">
                <Tile
                    key={index}
                    title={item.name}
                    caption="OPEN"
                    featured
                    onPress={() => navigation.navigate("Person_i", { personId: item.id })}
                    //! Image see
                    imageSrc={require('./images/apurva.jpeg')}
                ></Tile>
            </Animatable.View>
        );
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.letsSee}>Let's see what your people want to convey!</Text>
                <Text style={styles.letsSee}>Click on the Wishing Wells below!</Text>
                <FlatList
                    data={people}
                    renderItem={renderPeopleItem}
                    keyExtractor={item => item.id.toString()}
                />
                <Button
                    title="Go to About App Section."
                    onPress={() => navigation.navigate('AboutApp')}
                />
                <Animatable.View
                    animation="tada"
                    direction="alternate"
                    duration={2000}
                    easing="ease-in-out-cubic">
                    <Overlay animationType="slide" transparent={true}
                        isVisible={showModal}
                        onBackdropPress={() => toggleModal(!showModal)}
                        onRequestClose={() => toggleModal(!showModal)}>
                        <View style={styles.modal}>
                            <LinearGradient
                                colors={['rgba(95, 255, 255, 0.09)', 'rgba(95, 0, 255, 0.33)', 'rgba(95, 255, 255, 0.33)', 'rgba(95, 0, 255, 0.33)', 'transparent']}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    height: 600,
                                }}
                                start={[0.0, 0.0]}
                            />
                            <Animatable.Text style={styles.modalTitle}
                                animation="rubberBand"
                                direction="alternate"
                                duration={2000}
                                easing="ease-in-out-cubic"
                            >Happy Birthday! {birthdayGuy[0].name}
                            </Animatable.Text>
                            <Image
                                source={require('./images/apurva.jpeg')}
                                style={{ width: 300, height: 300 }}
                                PlaceholderContent={<ActivityIndicator />}
                                containerStyle={styles.OverlayImage}
                                transition
                                transparent
                            />
                            <Text style={styles.modalText}>Cheers on turning {birthdayGuy[0].age}!</Text>
                            <Text style={styles.modalText}>Come, Let's have  a blast!</Text>
                            <Tooltip popover={<Text>Info here</Text>}
                                skipAndroidStatusBar
                                height={190}
                                highlightColor="#d6bff5">
                                <Text h3>Press me</Text>
                            </Tooltip>
                            <Button
                                onPress={() => toggleModal(!showModal)}
                                color="#512DA8"
                                title="SUrprizeee"
                                fontFamily='Bellota-Bold'
                                fontSize={40}
                            />
                            <Animatable.Text animation="pulse"
                                easing="ease-out" iterationCount="infinite"
                                style={{ textAlign: 'center' }}>
                                ❤️
                        </Animatable.Text>
                            <Tooltip popover={<Text>Info here</Text>}
                                skipAndroidStatusBar
                                height={90}
                                highlightColor="#d6bff5">
                                <Text h3>Press me</Text>
                            </Tooltip>
                        </View>
                    </Overlay>
                    <View style={styles.lottieMessage}>
                        <LottieView source={require('../assets/the-happy-birthday.json')}
                            autoPlay loop>
                        </LottieView>
                    </View>
                </Animatable.View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ccb3fc',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
    },
    lottieMessage: {
        position: "absolute",
        height: 100,
    },
    letsSee: {
        justifyContent: 'center',
        fontFamily: 'Satisfy-Regular',
        alignItems: 'center',
        marginLeft: 20,
        fontSize: 23,
    },
    modal: {
        justifyContent: 'center',
        margin: 0
    },
    modalTitle: {
        fontSize: 40,
        fontFamily: 'Satisfy-Regular',
        // fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 0,
        fontFamily: 'Bellota-Bold'
    },
    OverlayImage: {
        marginLeft: 30,
        alignItems: 'center'
    }
});
