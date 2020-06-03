import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Person1() {
    return (
        <View style={styles.container}>
            <Text>Person1</Text>
            <Text>His Message</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3223b3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
