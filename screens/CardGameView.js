import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";

const data = [
    {
        id: 1,
        text: "Card #1",
        possibilities: {
            toLeft: "left",
            toRight: "right"
        }
    },
    {
        id: 2,
        text: "Card #2",
        possibilities: {
            toLeft: "left",
            toRight: "right"
        }
    },
    {
        id: 3,
        text: "Card #3",
        possibilities: {
            toLeft: "left",
            toRight: "right"
        }
    }
]

const Card = ({ card }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.textWhite}>{card.text}</Text>
        </View>
    );
};

export default function CardGameView() {
    console.disableYellowBox = true;

    const { width } = Dimensions.get('window')
    const [index, setIndex] = React.useState(0)

    const onSwiped = () => {
        setIndex((index + 1) % data.length)
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.textWhite}>Top</Text>
            </View>
            <View style={styles.swiperContainer}>
                <Swiper
                    cards={data} 
                    cardIndex={index} 
                    renderCard={(card) => <Card card={card} />} 
                    onSwiped={onSwiped}
                    stackSize={data.length}
                    cardVerticalMargin={50}
                    disableTopSwipe
                    disableBottomSwipe
                    animateCardOpacity
                    animateOverlayLabelsOpacity
                    infinite
                    backgroundColor={"white"}
                    useViewOverflow={Platform.OS === 'ios'}
                    overlayLabels={{
                        left: {
                            title: 'No',
                            style: {
                                label: {
                                    color: "white",
                                    fontSize: 18
                                },
                                wrapper: {
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    justifyContent: "flex-start",
                                    marginTop: 20,
                                    marginRight: 20
                                }
                            }
                        },
                        right: {
                            title: 'Yes',
                            style: {
                                label: {
                                    color: "white",
                                    fontSize: 18
                                },
                                wrapper: {
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start",
                                    marginTop: 20,
                                    marginLeft: 20
                                }
                            }
                        },
                    }}>
                        <Text style={styles.swiperText}>TEST</Text>
                    </Swiper>
            </View>
            <View style={styles.bottomContainer}>
                <Text style={styles.textWhite}>Bottom</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    swiperContainer: {
        flex: 0.70
    },
    card: {
        height: "50%",
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "black",
        shadowColor: "white",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16,
        elevation: 24,
    },
    topContainer: {
        flex: 0.20,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center"
    },
    bottomContainer: {
        flex: 0.10,
        backgroundColor: "black",
        alignItems: "center",
        justifyContent: "center"
    },
    textWhite: {
        color: "white"
    },
    swiperText: {
        color: "black",
        textAlign: "center",
        marginTop: 20,
        fontSize: 16
    }
});
