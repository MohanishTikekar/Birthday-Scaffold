import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button, Share } from 'react-native';
import { Card, Icon, Image } from 'react-native-elements';
import { LinearGradient } from "expo";
import * as Animatable from 'react-native-animatable';

import { PEOPLE } from "../shared/people";
const limit = PEOPLE.length;


export default function Person_i({ route, navigation }) {
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
        navigation.setOptions({ title: PEOPLE[personId].name })
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



    return (
        <View style={styles.container}>
            <Text>Person ith</Text>
            <Text>His Message</Text>
            <Animatable.View
                animation="fadeInDownBig"
                direction="alternate"
                duration={1000}
                easing="ease-in-out-cubic">
                <Card
                    title={PEOPLE[personId].name}
                //! Image see
                //image={require('./images/alberto.png')}
                >
                    <Image
                        source={require('./images/alberto.png')}
                        style={{ width: 200, height: 200 }}
                        PlaceholderContent={<ActivityIndicator />}
                        containerStyle={styles.OverlayImage}
                        transition
                        transparent
                    />
                    <Button
                        title="Update the title"
                        onPress={() => navigation.setOptions({ title: 'Updated!' })}
                    />
                    <Text style={{ margin: 10 }}>{PEOPLE[personId].description}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text>Heartfelt?</Text>
                            <Text>Share this message...</Text>
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
                    <Button
                        title="NEXT WISH!"
                        onPress={() => nextPerson()}
                    />
                </Card>
            </Animatable.View>
            <Button
                title="Back To Home"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#69420f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardItem: {
    },
});
