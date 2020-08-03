import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity, Platform } from 'react-native'
import { faHammer, faTrain } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import colors from "../config/colors"
import people from "../scenerios/people"

const Card = ({ title }) => (
    <View style={styles.card}>
        <Text style={styles.textWhite}>{title}</Text>
    </View>
);

export default function PeopleView({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listContainer}>
                <FlatList
                    data={people}
                    renderItem={({ item }) => (<Card title={item.title} />)}
                    keyExtractor={card => card.id}
                    numColumns={2}
                />
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.buttonLeft}>
                    <FontAwesomeIcon icon={ faTrain } size={ 32 } color={colors.white} />
                </View>
                <TouchableOpacity style={styles.daysPanel} onPress={() => navigation.navigate("CardGameView")}>
                    <Text style={styles.textWhite}>Day 0</Text>
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
    listContainer: {
        flex: 0.9,
        backgroundColor: colors.white
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
    card: {
        backgroundColor: colors.black,
        width: "40%",
        padding: 20,
        marginVertical: "5%",
        marginHorizontal: "5%",
        alignItems: "center",
        justifyContent: "center"
    },
    textWhite: {
        color: colors.white,
        fontSize: 17
    },
})
