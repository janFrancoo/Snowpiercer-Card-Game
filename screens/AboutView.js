import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import text from "../config/text"
import colors from "../config/colors"
import { useStateValue } from "../helpers/StateProvider"

export default function AboutView() {

    const [{ language }, dispatch] = useStateValue();

    return (
        <View style={styles.container}>
            <View style={styles.about}>
                <Text style={styles.text}>
                    {text[language].settings.about}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    about: {
        width: "90%",
        height: "90%",
        backgroundColor: colors.gray,
        alignItems: "center",
        paddingTop: "10%",
        paddingHorizontal: "10%"
    },
    text: {
        color: colors.white,
        fontSize: 18
    }
})
