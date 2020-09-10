import React from 'react'
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text } from 'react-native'
import { useStateValue } from "../helpers/StateProvider"
import colors from "../config/colors"
import text from "../config/text"

export default function SplashView({ navigation }) {

    const [{ language }, dispatch] = useStateValue()
    
    const image = { uri: "https://reactjs.org/logo-og.png" }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.replace("CardGameView")}>
                    <Text style={styles.buttonText}>{text[language].splashScreen.buttonText}</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    nextButton: {
        width: "30%",
        height: "5%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.white,
        borderRadius: 10,
        marginBottom: "10%",
        marginEnd: "10%"
    },
    buttonText: {
        color: colors.black,
        fontSize: 20
    }
})
