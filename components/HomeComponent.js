import React, { useState } from 'react';
import { PanResponder, ActivityIndicator, Modal, FlatList, Platform, StyleSheet, Text, ScrollView, Button, View } from 'react-native';
import { Tile, Overlay, Image, Header, LinearGradient, Tooltip } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { PEOPLE } from "../shared/people";
import { BIRTHDAYGUY } from "../shared/birthdayGuy"

//TODO: ADD IMAGE ON OVERLAY ON START
export default function Home({ navigation }) {
    //Hooks
    const [people, setPeople] = useState(PEOPLE);
    const [showModal, toggleModal] = useState(true);
    const [birthdayGuy, setBirthdayGuy] = useState(BIRTHDAYGUY)

    const renderPeopleItem = ({ item, index }) => {
        // PANRESPONDER FOR GESTURE
        var viewRef;
        const handleViewRef = ref => viewRef = ref;
        const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
            if (dx < -200)
                return true;
            else
                return false;
        }
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true;
            },
            // For the Rubberband effect on the card bcoz of our gesture.
            onPanResponderGrant: () => {
                viewRef.rubberBand(1000)
                    .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
            },
            onPanResponderEnd: (e, gestureState) => {
                console.log("pan responder end", gestureState);
                if (recognizeDrag(gestureState)) {
                    navigation.navigate("Person_i", { personId: item.id })
                }
                return true;
            }
        })
        return (<Animatable.View
            animation="rubberBand"
            direction="alternate"
            duration={2}
            easing="ease-in-out-cubic"
            ref={handleViewRef}
            {...panResponder.panHandlers}>
            <Tile
                key={index}
                title={item.name}
                caption="Swipe Right ->"
                featured
                onPress={() => navigation.navigate("Person_i", { personId: item.id })}
                //! Image see
                imageSrc={require('./images/alberto.png')}
            ></Tile>
        </Animatable.View>);
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
                    animation="rubberBand"
                    direction="alternate"
                    duration={2000}
                    easing="ease-in-out-cubic">
                    <Overlay animationType="slide" transparent={false}
                        isVisible={showModal}
                        onBackdropPress={() => toggleModal(!showModal)}
                        onRequestClose={() => toggleModal(!showModal)}>
                        <View style={styles.modal}>
                            <Animatable.Text style={styles.modalTitle}
                                animation="rubberBand"
                                direction="alternate"
                                duration={2000}
                                easing="ease-in-out-cubic"
                            >Happy Birthday! {birthdayGuy[0].name}
                            </Animatable.Text>
                            <Image
                                source={require('./images/alberto.png')}
                                style={{ width: 200, height: 200 }}
                                PlaceholderContent={<ActivityIndicator />}
                                containerStyle={styles.OverlayImage}
                                transition
                                transparent
                            />
                            <Text style={styles.modalText}>Cheers on turning {birthdayGuy[0].age}!</Text>
                            <Text>Come, Let's have  a blast!</Text>
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
                </Animatable.View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6e3ff',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
    },
    letsSee: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 80
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    OverlayImage: {
        // marginLeft: 80
    }
});
