import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Keyboard, Platform, TouchableWithoutFeedback } from "react-native";
import { auth } from "../database/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";
import Modal from "react-native-modal";


const SignScreen = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [rePassword, setRePassword] = React.useState("");
    const [displayName, setDisplayName] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    setTimeout(() => {
        setMessage(false);
    }, 5000);

   

    const handlerSingUp = async () => {
        if (displayName === "" || email === "" || password === "" || rePassword === "") {
            setMessage("Todos los campos son obligatorios");
        } else if (password === rePassword) {
            setLoading(true);
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential: { user: any; }) => {
                    userCredential.user
                }).then(() => {

                    toggleModal();
                    setTimeout(() => {
                        navigation.replace('Login');
                    }, 2000);
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/invalid-email':
                            setMessage("Correo inválido");
                            break;
                        case 'auth/email-already-in-use':
                            setMessage("Correo ya registrado");
                            break;
                        case 'auth/missing-email':
                            setMessage("Correo no ingresado");
                            break;
                        case 'auth/internal-error':
                            setMessage("Ingrese contraseña");
                            break;
                        default:
                            setMessage(error.message)
                            break;
                    }
                }).finally(() => { setLoading(false) });
        } else {
            setMessage("Las contraseñas no coinciden");
        }
    }

    const handlerBack = () => {
        navigation.replace('Login');
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
                            <Text style={styles.buttonText} onPress={toggleModal} >{message}</Text>
                        </TouchableOpacity  > : null}
                    </View>

                    <View>

                        {!!isModalVisible ? <Modal isVisible={isModalVisible}>
                            <View style={styles.modalContainer}>
                             <Text style={styles.modalText}>Usuario creado con exito.</Text>

                            </View>
                        </Modal> : null}

                    
            
                       

                    </View>
                    

                    <TextInput
                        placeholder="Nombre"
                        placeholderTextColor={"#ffffde"}
                        value={displayName}
                        onChangeText={text => setDisplayName(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Correo electrónico"
                        placeholderTextColor={"#ffffde"}
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />

                    <TextInput
                        placeholder="Contraseña"
                        placeholderTextColor={"#ffffde"}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                    <TextInput
                        placeholder="Confirmar contraseña"
                        placeholderTextColor={"#ffffde"}
                        value={rePassword}
                        onChangeText={text => setRePassword(text)}
                        style={styles.input}
                        secureTextEntry
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




                        <Text style={styles.ingresarText} onPress={handlerSingUp}>Registrarse </Text>


                        
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: "white" }}>Ya tiene una cuenta? </Text>
                            <TouchableOpacity onPress={handlerBack}>
                                <Text
                                    style={{
                                        fontWeight: "700",
                                        color: "#0066CC",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    {" "}
                                    Ingrese
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >

    );
}

export default SignScreen

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
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonOk: {
        backgroundColor: 'green',
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 13,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#8BC34A',
        width: '60%',
        height: '10%',
        position: 'absolute',
        borderRadius: 10,
        
        margin: 'auto',
        textAlign: 'center',
        alignSelf: 'center',
    },
    modalText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 10,
        alignSelf: 'center',

    },
});