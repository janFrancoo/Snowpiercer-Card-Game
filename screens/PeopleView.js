import React from 'react'
import { StyleSheet, SafeAreaView, View, Text, Image, FlatList, TouchableOpacity, Platform } from 'react-native'
import colors from "../config/colors"
import people from "../scenerios/people"
import { useStateValue } from "../helpers/StateProvider"
import BottomNav from "./BottomNav"

export default function PeopleView({ navigation }) {

    const [{ language }, dispatch] = useStateValue();
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.listContainer}>
                <FlatList
                    data={people}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("PersonDetailView", { person: item })}>
                            <View style={styles.card}>
                                <Text style={styles.textWhite}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={card => card.id}
                    showsVerticalScrollIndicator={false}
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
        paddingTop: Platform.OS === 'android' ? 25 : 0,
    },
    listContainer: {
        flex: 0.9,
        backgroundColor: colors.white,
        alignItems: "center"
    },
    bottomContainer: {
        flex: 0.1,
        justifyContent: "center"
    },
    card: {
        backgroundColor: colors.black,
        paddingHorizontal: "25%",
        paddingVertical: "10%",
        marginVertical: "5%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12
    },
    avatar: {
        top: 10,
        start: 10,
        position: "absolute",
        width: "50%",
        height: "10%"
    },
    textWhite: {
        color: colors.white,
        fontSize: 17
    },
})
