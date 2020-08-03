import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import colors from "../config/colors"

export default function SettingsView({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.settingsContainer}>

            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.buttonLeft} onPress={() => navigation.navigate("PeopleView")}>
                    <Text style={styles.textWhite}>People</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.daysPanel} onPress={() => navigation.navigate("CardGameView")}>
                    <Text style={styles.textWhite}>Day 0</Text>
                </TouchableOpacity>
                <View style={styles.buttonRight}>
                    <Text style={styles.textWhite}>Settings</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
    settingsContainer: {
        flex: 0.9,
    },
    bottomContainer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },
    buttonLeft: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: colors.white,
        borderTopColor: colors.white,
        borderWidth: 1
    },
    daysPanel: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderLeftColor: colors.white,
        borderRightColor: colors.white,
        borderTopColor: colors.white,
        borderWidth: 1
    },
    buttonRight: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        borderLeftColor: colors.white,
        borderTopColor: colors.white,
        borderWidth: 1
    },
    textWhite: {
        color: colors.white
    }
})
