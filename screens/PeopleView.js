import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import colors from "../config/colors"

export default function PeopleView() {
    return (
        <View style={styles.container}>
            <Text style={styles.textWhite}>Hello, from People List View!</Text>
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
