import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Person3() {
    return (
        <View style={styles.container}>
            <Text>Person3</Text>
            <Text>His Message</Text>
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
});
