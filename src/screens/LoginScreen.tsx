import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Button, Keyboard, Platform, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator } from "react-native";
import { auth } from "../database/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Fab } from "../components/Fab";
import Spinner from "react-native-loading-spinner-overlay/lib";





const LoginScreen = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    setTimeout(() => {
        setMessage(false);
    }, 5000);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const startLoading = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    };


    const handlerLogin = async () => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: { user: any; }) => {
                const user = userCredential.user;
                console.log("Logged in with", user.email);
            }).then(() => { navigation.replace('Home'); })
            .catch(error => {
                switch (error.code) {
                    case 'auth/invalid-email':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/internal-error':
                    case 'auth/too-many-requests':
                        setMessage("Credenciales inválidas");
                        break;
                    default:
                        setMessage(error.message)
                        break;
                }
            }).finally(() => { setLoading(false) });
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


                    <View style={styles.inputContainer}>
                        {!!message ? <TouchableOpacity
                            style={styles.buttonError}
                        >
                            <Text style={styles.buttonText}>{message}</Text>
                        </TouchableOpacity> : null}
                    </View>



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
                        {loading
                            &&
                            <View style={styles.spinContainer}>
                                <Spinner
                                    visible={loading}
                                    textStyle={styles.spinnerTextStyle}
                                />
                            </View>}

                        <Text style={styles.ingresarText} onPress={functionCombined}>Ingresar </Text>

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
        color: 'white',
    },
    spinContainer: {
        position: 'absolute',
        display: 'flex',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: 100,
    },
    inputContainer: {
        width: '80%',
        marginTop: -70,
        marginBottom: 10,
        alignSelf: 'center',

    },
    buttonError: {
        backgroundColor: 'red',
        width: '100%',
        padding: 15,
        borderRadius: 18,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});