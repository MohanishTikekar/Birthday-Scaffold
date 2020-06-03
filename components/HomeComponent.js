import React, { useState } from 'react';
import { Modal, FlatList, Platform, StyleSheet, Text, View, Button } from 'react-native';
import { Tile } from 'react-native-elements';
import { PEOPLE } from "../shared/people";
import { BIRTHDAYGUY } from "../shared/birthdayGuy"

//TODO: MODAL ON START
export default function Home({ navigation }) {
    //Hooks
    const [people, setPeople] = useState(PEOPLE);
    const [showModal, toggleModal] = useState(true);
    const [birthdayGuy, setBirthdayGuy] = useState(BIRTHDAYGUY)

    const renderPeopleItem = ({ item, index }) => {
        return (<Tile
            key={index}
            title={item.name}
            caption={item.description}
            featured
            onPress={() => navigation.navigate("Person_i", { personId: item.id })}
            //! Image see
            imageSrc={require('./images/alberto.png')}
        />);
    };

    return (
        <View style={styles.container}>
            <Text>Home Screen of the app!</Text>
            <Button
                title="Person_i name"
                onPress={() => navigation.navigate('Person_i')}
            />
            <FlatList
                data={people}
                renderItem={renderPeopleItem}
                keyExtractor={item => item.id.toString()}
            />
            <Button
                title="Go to About App Section."
                onPress={() => navigation.navigate('AboutApp')}
            />
            <Modal animationType="slide" transparent={false}
                visible={showModal}
                onDismiss={() => toggleModal(!showModal)}
                onRequestClose={() => toggleModal(!showModal)}>
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Happy Birthday! {birthdayGuy[0].name}</Text>
                    <Text style={styles.modalText}>Cheers on turning {birthdayGuy[0].age}!</Text>
                    <Text>Come, Let's have  a blast!</Text>
                    <Button
                        onPress={() => toggleModal(!showModal)}
                        color="#512DA8"
                        title="SUrprizeee"
                    />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight,
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
    }
});
