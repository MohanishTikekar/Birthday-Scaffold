import React, { useState } from 'react';
import { ActivityIndicator, Modal, FlatList, Platform, StyleSheet, Text, ScrollView, View } from 'react-native';
import { Tile, Overlay, Image, Header, Tooltip, Button, Icon } from 'react-native-elements';
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
                    titleStyle={{ fontWeight: "100", fontFamily: "Bellota-Bold", }}
                    caption="OPEN"
                    captionStyle={{ backgroundColor: "#3b353a", fontFamily: "Bellota-Bold" }}
                    featured
                    onPress={() => navigation.navigate("Person_i", { personId: item.id })}
                    //! Image see
                    //imageSrc={require('./images/apurva.jpeg')}
                    imageSrc={{ uri: `${item.image}` }}
                    height={600}
                ></Tile>
            </Animatable.View >
        );
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.letsSee}>See what your people want to convey!</Text>
                <Text style={styles.letsSee}>Open the 'Wishing Wells' below!</Text>
                <FlatList
                    data={people}
                    renderItem={renderPeopleItem}
                    keyExtractor={item => item.id.toString()}
                />
                <Button
                    title="Toggle wish again! "
                    onPress={() => toggleModal()}
                    titleStyle={{ fontFamily: 'Bellota-Bold', fontSize: 18 }}
                    buttonStyle={{ alignContent: "center", backgroundColor: "#b95cdb" }}
                    type="solid"
                    icon={
                        <Icon
                            name="rocket"
                            type='font-awesome'
                            size={20}
                            color="white"
                        />
                    }
                    iconRight
                />
                <Button
                    title="Go to About App Section."
                    onPress={() => navigation.navigate('AboutApp')}
                    titleStyle={{ fontFamily: 'Bellota-Bold', fontSize: 18 }}
                    buttonStyle={{ alignContent: "center", backgroundColor: "#7a45de" }}
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
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
                                    <Text style={styles.modalText}>Cheers on turning {birthdayGuy[0].age}!</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1, alignItems: "center", marginBottom: 20 }}>
                                    <Text style={styles.modalText}>Come, Let's have  a blast!</Text>
                                </View>
                            </View>
                            <Button
                                onPress={() => toggleModal(!showModal)}
                                title="DOUBLE CLICK FOR A SURPRIZE!"
                                titleStyle={{ fontFamily: 'Bellota-Bold', fontSize: 18, color: "#fff" }}
                                buttonStyle={{ width: 170, alignContent: "center", marginLeft: 120, backgroundColor: "#512DA8" }}
                                type="outline"
                            />
                            <Animatable.Text animation="pulse"
                                easing="ease-out" iterationCount="infinite"
                                style={{ textAlign: 'center' }}>
                                ❤️
                        </Animatable.Text>
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
        marginBottom: 6
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
        fontSize: 21,
        margin: 0,
        fontFamily: 'Bellota-Bold'
    },
    OverlayImage: {
        marginLeft: 30,
        alignItems: 'center'
    }
});

//* Tool Tip Component
// <Tooltip popover={<Text>Info here</Text>}
// skipAndroidStatusBar
// height={190}
// highlightColor="#d6bff5">
// <Text h3>Press me</Text>
// </Tooltip>