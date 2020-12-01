import React from 'react'
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from 'react-native'
import { useStateValue } from "../helpers/StateProvider"
import colors from "../config/colors"
import text from "../config/text"
import introText from "../scenerios/splash"
import { Video } from 'expo-av'

export default function SplashView({ navigation }) {

    const [{ language }, dispatch] = useStateValue()

    let countText = 1
    const [line, setLine] = React.useState(introText[language][countText.toString()].line)

    const updateText = (time) => {
        setTimeout(() => {
            countText += 1
            setLine(introText[language][countText.toString()].line)

            if (countText == 2)
                updateText(8000)
            else if (countText < 3)
                updateText()
        }, time)
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
                    onLoad={() => updateText(6000)}
                />
                <TouchableOpacity style={styles.nextButton} onPress={() => navigation.replace("CardGameView")}>
                    <Text style={styles.buttonText}>{text[language].splashScreen.buttonText}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.textWhite}>
                        { line }
                    </Text>
                </ScrollView>
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
        flex: 0.7
    },
    video: {
        width: "100%",
        height: "100%"
    },
    textContainer: {
        flex: 0.3,
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
        borderRadius: 6,
    },
    buttonText: {
        color: colors.black,
        fontSize: 16
    },
    textWhite: {
        fontWeight: "bold",
        fontStyle: "italic",
        fontSize: 18,
        marginHorizontal: "10%",
        color: colors.white
    }
})
