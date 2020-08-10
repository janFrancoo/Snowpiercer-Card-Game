import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { faHammer, faTrain } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import colors from "../config/colors"
import convertYear from "../helpers/yearConverter"
import { useStateValue } from "../helpers/StateProvider"

export default function BottomNav({ navigation }) {

    const [{ language, days }, dispatch] = useStateValue();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonLeft} onPress={() => navigation.navigate("PeopleView")}>
                <FontAwesomeIcon icon={ faTrain } size={ 32 } color={colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.daysPanel} onPress={() => navigation.navigate("CardGameView")}>
                <Text style={styles.textWhite}>{convertYear(language, days)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonRight} onPress={() => navigation.navigate("SettingsView")}>
                <FontAwesomeIcon icon={ faHammer } size={ 32 } color={colors.white} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: colors.black,
        paddingVertical: "4%"
    },
    buttonLeft: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: colors.white,
        borderWidth: 1
    },
    daysPanel: {
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        borderLeftColor: colors.white,
        borderRightColor: colors.white,
        borderWidth: 1
    },
    buttonRight: {
        width: "25%",
        justifyContent: "center",
        alignItems: "center",
        borderLeftColor: colors.white,
        borderWidth: 1
    },
    textWhite: {
        color: colors.white,
        fontSize: 18,
    }
})
