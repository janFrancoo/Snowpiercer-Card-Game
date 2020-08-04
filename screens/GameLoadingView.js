import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import colors from "../config/colors"
import lang from "../config/lang"

export default function GameLoadingView({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.textWhite}>{lang[global.language || 'en'].loadingScreen.loadingText}</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.replace("CardGameView")}>
                <Text style={styles.textBlack}>{lang[global.language || 'en'].loadingScreen.buttonText}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textWhite: {
        color: colors.white
    },
    textBlack: {
        color: colors.black
    },
    nextButton: {
        width: "50%",
        padding: 10,
        alignItems: "center",
        backgroundColor: colors.white,
        marginTop: 50,
        borderRadius: 10
    }
})
