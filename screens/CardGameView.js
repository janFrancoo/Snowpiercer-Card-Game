import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function CardGameView() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, from CardGameView!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "white"
    }
})
