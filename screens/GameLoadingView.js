import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export default function GameLoadingView({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, Snowpiercer!</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("CardGameView")}>
                <Text style={styles.text}>Start</Text>
            </TouchableOpacity>
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
    text: {
        color: "white"
    },
    nextButton: {
        width: "50%",
        padding: 10,
        alignItems: "center",
        backgroundColor: "#841584",
        marginTop: 50,
        borderRadius: 10
    }
})
