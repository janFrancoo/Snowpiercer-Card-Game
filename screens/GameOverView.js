import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from "../config/colors"
import gameOver from "../scenerios/gameOver"

export default function GameOverView({ route }) {
    return (
        <View style={styles.container}>
            <Text style={styles.textWhite}>{gameOver[route.params.e.p][route.params.e.q].text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: "center",
        alignItems: "center"
    },
    textWhite: {
        color: colors.white
    }
})
