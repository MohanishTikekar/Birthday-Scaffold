import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function AboutApp() {
    return (
        <View style={styles.container}>
            <Text>About this App!</Text>
            <Text>Made with L0\/3 by Mohanish</Text>
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
