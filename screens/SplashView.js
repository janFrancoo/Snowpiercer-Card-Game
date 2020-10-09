import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { useStateValue } from "../helpers/StateProvider"
import colors from "../config/colors"
import text from "../config/text"
import introText from "../scenerios/splash"
import { Video } from 'expo-av'

export default function SplashView({ navigation }) {

    const [{ language }, dispatch] = useStateValue()

    let countText = 1
    const [line, setLine] = React.useState(introText[language][countText.toString()].line)

    const updateText = () => {
        setTimeout(() => {
            countText += 1
            setLine(introText[language][countText.toString()].line)

            console.log(countText)

            if (countText < 4)
                updateText()
        }, 3000)
    }

    return (
        <View style={styles.container}>
            <View style={styles.videoContainer}>
                <Video
                    source={require("../assets/intro.mp4")}
                    shouldPlay
                    resizeMode="cover"
                    isMuted={false}
                    rate={1.0}
                    volume={1.0}
                    style={styles.video}
                    onLoad={() => updateText()}
                />
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.replace("CardGameView")}>
                    <Text style={styles.buttonText}>{text[language].splashScreen.buttonText}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.textWhite}>
                    { line }
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.black
    },
    videoContainer: {
        flex: 0.8
    },
    video: {
        width: "100%",
        height: "100%"
    },
    textContainer: {
        flex: 0.2,
        alignItems: "center",
        justifyContent: "center"
    },
    nextButton: {
        position: "absolute",
        right: "5%",
        top: "5%",
        justifyContent: "center",
        alignItems: "center",
        width: "20%",
        height: "5%",
        backgroundColor: colors.white,
        borderRadius: 10,
    },
    buttonText: {
        color: colors.black,
        fontSize: 20
    },
    textWhite: {
        color: colors.white
    }
})
