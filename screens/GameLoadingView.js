import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import colors from "../config/colors"
import text from "../config/text"
import { useStateValue } from "../helpers/StateProvider"

export default function GameLoadingView({ navigation }) {

    const [{ language }, dispatch] = useStateValue();

    return (
        <View style={styles.container}>
            <Text style={styles.textWhite}>{text[language].loadingScreen.loadingText}</Text>
            <TouchableOpacity style={styles.nextButton} onPress={() => navigation.replace("CardGameView")}>
                <Text style={styles.textBlack}>{text[language].loadingScreen.buttonText}</Text>
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
