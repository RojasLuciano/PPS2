import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image } from "react-native";

import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const IndexScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()


    const handlerSignUp = () => {
        navigation.replace('SignUp');
    }

    const handlerSingIn = () => {
        navigation.replace('Login');
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">

            <Text style={styles.title}>   Bienvenido </Text>
            
            {<Image
                source={require('../assets/foodLogo.png')}
                resizeMode="contain"
                style={styles.logo}
            />}

            <View style={styles.buttonContainer} >
                
                <TouchableOpacity
                    onPress={handlerSingIn}

                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handlerSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    );
}

export default IndexScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        color: 'white',
        marginBottom: 20,
        alignSelf: 'center',
    },
    logo: {
        width: '50%',
        height: 250,
        alignSelf: 'center',
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: "#0066CC",
        width: '100%',
        padding: 15,
        borderRadius: 8,
        marginTop: 5,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#662483',
        borderWidth: 2,

    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0066CC',
        fontWeight: '700',
        fontSize: 16,
    },
})