import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <Text>Home Screen of the app!</Text>
            <Button
                title="Go to"
                onPress={() => navigation.navigate('Person1')}
            />
            <Button
                title="Person1 name"
                onPress={() => navigation.navigate('Person2')}
            />
            <Button
                title="Person2 name"
                onPress={() => navigation.navigate('Person2')}
            />
            <Button
                title="Person3 name"
                onPress={() => navigation.navigate('Person3')}
            />
            <Button
                title="Person_i name"
                onPress={() => navigation.navigate('Person_i')}
            />
            <Button
                title="Go to About App Section."
                onPress={() => navigation.navigate('AboutApp')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#555',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
