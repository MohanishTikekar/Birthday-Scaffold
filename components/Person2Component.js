import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Person2() {
    return (
        <View style={styles.container}>
            <Text>Person2</Text>
            <Text>His Message</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a420c4',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
