import React from 'react';
import { StyleSheet, Text, View, Button, Share } from 'react-native';
import { Card, Icon } from 'react-native-elements';
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
            <Card
                featuredTitle={PEOPLE[personId].name}
                //! Image see
                image={require('./images/alberto.png')}
            >
                <Text style={{ margin: 10 }}>{PEOPLE[personId].description}</Text>
                <View style={{ flexDirection: "row" }}>
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
                    <View style={{ flex: 1, alignItems: "flex-start" }}>
                        <Text>Heartfelt?</Text>
                        <Text>Share this message...</Text>
                    </View>
                </View>
            </Card>
            <Button
                title="GO TO Next Person i+1"
                onPress={() => nextPerson()}
            />
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
