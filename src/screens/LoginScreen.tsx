import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Button, Keyboard, Platform, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator } from "react-native";
import { auth } from "../database/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Fab } from "../components/Fab";
import {  Snackbar } from 'react-native-paper';



const LoginScreen = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.replace('Home');
            }
        })

        return unsubscribe;
    }, []);



    const [loading, setLoading] = React.useState(false);

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };


    
    const handlerLogin = async () => {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: { user: any; }) => {
                const user = userCredential.user;

                console.log("Logged in with", user.email);
            })
            .catch(error => {


                switch (error.code) {
                    case 'auth/invalid-email':
                        alert('Invalid email')
                        break;
                    case 'auth/user-not-found':
                        alert('User not found')
                        break;
                    case 'auth/wrong-password':
                        alert('Wrong password')
                        break;
                    case 'auth/internal-error':
                        alert('Enter password')
                        break;
                    default:
                        alert(error.message)
                        break;
                }
            })
    }

    const functionCombined = () => {
        handlerLogin();
        startLoading();
    }


    const onPressAdminHandler = () => {
        setEmail("admin@gmail.com");
        setPassword("admin123eeeeeeeee");
    }

    const onPressServiceHandler = () => {
        setEmail("service@gmail.com");
        setPassword("service");
    }

    const onPressUserHandler = () => {
        setEmail("user@gmail.com");
        setPassword("user123");
    }

    const handlerSignUp = () => {
        navigation.replace('SignUp');
    }

    const handlerBack = () => {
        navigation.replace('Index');
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>

                    <Text style={styles.header}>Bienvenido {"\n"}
                        <Text style={styles.subtitle} >Por favor complete los datos para continuar {"\n"}{"\n"}</Text>
                    </Text>

                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={"#ffffde"}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}

                        clearButtonMode="always"
                     
                    />




                    <TextInput
                        placeholder="Contraseña"
                        placeholderTextColor={"#ffffde"}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        style={styles.input}
                        secureTextEntry={true}

                    />
                    <View>
                        {loading ? (
                            <ActivityIndicator
                                //visibility of Overlay Loading Spinner
                                visible={loading}
                                //Text with the Spinner
                                textContent={'Loading...'}
                                //Text style of the Spinner Text
                                textStyle={styles.spinnerTextStyle}
                            />
                        ) : (
                            <>
                                <Text style={{ textAlign: 'center', fontSize: 20 }}>
                                    React Native ActivityIndicator
                                </Text>
                                <Button title="Ingresar" onPress={functionCombined}></Button>

                            </>
                        )}


                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "white" }}>No tiene una cuenta? </Text>
                            <TouchableOpacity onPress={handlerSignUp}>
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        color: "#0066CC",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    {" "}
                                    Regístrese
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Fab
                        title="User"
                        onPress={onPressUserHandler}
                        position='br'
                    />

                    <Fab
                        title="Admin"
                        onPress={onPressAdminHandler}
                        position='bl'
                    />

                    <Fab
                        title="Service"
                        onPress={onPressServiceHandler}
                        position='center'
                    />



                </View>
            </TouchableWithoutFeedback>

        </KeyboardAvoidingView >

    );
}

export default LoginScreen
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        padding: 24,
        flex: 1,
        justifyContent: "center",

    },
    header: {
        fontSize: 30,
        fontWeight: "700",
        color: "white",
        textAlign: "center",
        marginBottom: 20,
    },
    subtitle: {
        color: '#ffffde',
        fontSize: 15,
        fontWeight: "100",
        textAlign: "center"
    },
    input: {
        color: "white",
        borderBottomColor: "white",
        borderBottomWidth: 1,
        marginBottom: 10,
        padding: 10,
        fontSize: 18,
        fontWeight: "100"

    },
    btnContainer: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,


    },
    logo: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain'
    },
    ingresarText: {
        color: "#0066CC",
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});

