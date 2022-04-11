import React from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from "react-native";



// Interface de mi componente
interface Props {
    title: string;
    position?: 'br' | 'bl' | 'center';
    onPress: () => void;


}


// Tengo que desestructurar los props que me llegan
export const Fab = ({ title, onPress, position  }: Props) => {
    return (

        <TouchableOpacity style={[
            styles.fabLocation,
            position === 'center' ? styles.fabLocationCenter : position === 'br' ? styles.fabLocationBR : styles.fabLocationTL]}
            onPress={() => { onPress() }}

        >
            <View style={styles.fab}>
                <Text style={styles.fabText}> {title} </Text>

            </View>



        </TouchableOpacity >


    )

}

const styles = StyleSheet.create({
    fabText: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
    },
    fab: {
        justifyContent: 'center',
        backgroundColor: "#0066CC",
        alignItems: 'center',
        width: 90,
        height: 60,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    fabLocation: {
        position: "absolute",
        bottom: 20,
    },
    fabLocationBR: {
        right: 20,
    },
    fabLocationTL: {
        left: 20,
    },
    fabLocationCenter: {
        alignSelf: 'center',
    },


});

