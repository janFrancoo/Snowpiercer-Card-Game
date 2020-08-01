import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function GameLoadingView() {
    return (
        <View style={styles.container}>
            <Text style={styles.helloWorld}>{"Hello, Snowpiercer!"}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    helloWorld: {
        color: "white"
    }
})
