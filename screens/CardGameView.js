import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import Swiper from "react-native-deck-swiper";
import scenerios from "../scenerios/scenerios"
import colors from "../config/colors"

const Card = ({ card }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.textWhite}>{card.text}</Text>
        </View>
    );
};

export default function CardGameView() {
    console.disableYellowBox = true;
    const { width, height} = Dimensions.get('window');

    const [index, setIndex] = React.useState(0)

    const onSwiped = (idx, direction) => {
        console.log(scenerios[idx].onSwiped[direction])
        setIndex((index + 1) % scenerios.length)
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.textWhite}>Top</Text>
            </View>
            <View style={styles.swiperContainer}>
                <Swiper
                    cards={scenerios}
                    cardIndex={index}
                    renderCard={(card) => <Card card={card} />} 
                    onSwipedLeft={(idx) => onSwiped(idx, "left")}
                    onSwipedRight={(idx) => onSwiped(idx, "right")}
                    stackSize={scenerios.length}
                    disableTopSwipe
                    disableBottomSwipe
                    animateCardOpacity
                    cardHorizontalMargin={width * 10 / 100}
                    infinite
                    backgroundColor={colors.white}
                    useViewOverflow={Platform.OS === 'ios'}
                    overlayLabels={{
                        left: {
                            title: scenerios[index].choices.left,
                            style: {
                                label: {
                                    color: colors.white,
                                    fontSize: 16
                                },
                                wrapper: {
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    justifyContent: "flex-start",
                                    marginTop: height * 15 / 100,
                                    marginRight: width * 10 / 100
                                }
                            }
                        },
                        right: {
                            title: scenerios[index].choices.right,
                            style: {
                                label: {
                                    color: colors.white,
                                    fontSize: 16
                                },
                                wrapper: {
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    justifyContent: "flex-start",
                                    marginTop: height * 15 / 100,
                                    marginLeft: width * 10 / 100
                                }
                            }
                        },
                    }}>
                    <Text style={styles.swiperText}>{scenerios[index].text}</Text>
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
        flex: 1,
        backgroundColor: colors.black,
        justifyContent: "flex-end"
    },
    swiperContainer: {
        flex: 0.70,
        justifyContent: "center",
        alignItems: "center"
    },
    card: {
        marginTop: "30%",
        height: "50%",
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.black
    },
    topContainer: {
        flex: 0.20,
        alignItems: "center",
        justifyContent: "center"
    },
    bottomContainer: {
        flex: 0.10,
        alignItems: "center",
        justifyContent: "center"
    },
    textWhite: {
        color: colors.white
    },
    swiperText: {
        color: colors.black,
        textAlign: "center",
        marginTop: 20,
        fontSize: 16
    }
});
