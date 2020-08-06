import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, FlatList, TouchableOpacity, Platform } from 'react-native'
import { faHammer, faTrain } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import colors from "../config/colors"
import text from "../config/text"
import people from "../scenerios/people"
import { useStateValue } from "../helpers/StateProvider"
import BottomNav from "./BottomNav"

export default function PeopleView({ navigation }) {

    const [{ language, volume, days }, dispatch] = useStateValue();
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listContainer}>
                <FlatList
                    data={people}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("PersonDetailView", { person: item })}>
                            <Text style={styles.textWhite}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={card => card.id}
                    numColumns={2}
                />
            </View>
            <View style={styles.bottomContainer}>
                <BottomNav navigation={navigation} />
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
        justifyContent: "center"
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
