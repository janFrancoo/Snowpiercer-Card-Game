import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView, Platform } from 'react-native'
import colors from "../config/colors"
import lang from "../config/lang"
import { faHammer, faTrain } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default function PersonDetailView({ navigation, route }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.detailContainer}>
                <Image
                    style={styles.personImage}
                    source={require("../assets/icon.png")}
                />
                <Text style={styles.personTitle}>{route.params.person.title}</Text>
                <ScrollView style={styles.scrollText}>
                    <Text style={styles.personText}>{route.params.person.text}</Text>
                </ScrollView>
            </View>
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.buttonLeft} onPress={() => navigation.navigate("PeopleView")}>
                    <FontAwesomeIcon icon={ faTrain } size={ 32 } color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.daysPanel} onPress={() => navigation.navigate("CardGameView")}>
                    <Text style={styles.textWhite}>{lang[global.language || 'en'].bottomNav.middleButton}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRight} onPress={() => navigation.navigate("SettingsView")}>
                    <FontAwesomeIcon icon={ faHammer } size={ 32 } color={colors.white} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    detailContainer: {
        flex: 0.9,
        backgroundColor: colors.white,
        alignItems: "center"
    },
    personImage: {
        marginTop: "10%"
    },
    personTitle: {
        marginTop: "10%",
        fontSize: 20,
        fontWeight: "bold"
    },
    scrollText:{
        marginTop: "5%",
        marginHorizontal: "5%",
        marginBottom: "2%"
    },
    personText: {
        fontSize: 16,
        fontStyle: "italic"
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
        color: colors.white
    }
})
