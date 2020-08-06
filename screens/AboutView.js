import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import lang from "../config/lang"
import colors from "../config/colors"

export default function AboutView() {
    return (
        <View style={styles.container}>
            <View style={styles.about}>
                <Text style={styles.text}>
                    {lang[global.language || 'en'].settings.about}
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
