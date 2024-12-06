import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InternalHeader from "../components/InternalHeader";
import { COLORS } from "../constants/constants";
//import PhoneInput from "react-native-phone-number-input";
import { useNavigation } from "@react-navigation/native";
import ProgressBar from "../components/ProgressBar";
import { updateShipmentField } from "../features/Shipments/ShipmentSlice";
import { useDispatch, useSelector } from "react-redux";
import ButtonGroup from "../components/ButtonGroup";


const ShipmentForm1 = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { sender } = useSelector((state) => state.shipments);


    const [formData, setFormData] = useState({
        nombre: "",
        cedula: "",
        direccion: "",
        pais: "",
        codigoPostal: "",
        barrio: "",
        telefono: "+59897679522",
        ciudad: "",
    });


    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");

    const validateCedula = (CI) => /^[0-9]{6,8}$/.test(CI);

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleStore = () => {
        const sender = {
            name: formData.nombre,
            address: formData.direccion,
            country: formData.pais,
            postalCode: formData.codigoPostal,
            neighborhood: formData.barrio,
            city: formData.ciudad,
            phoneNumber: formData.telefono,
        };
        dispatch(updateShipmentField({ key: "sender", value: sender }));

    };


    const handleValidation = () => {
        const { nombre, cedula, direccion, pais, codigoPostal, barrio, ciudad } = formData;

        if (!nombre.trim()) return alert("El nombre es obligatorio.");
        if (!validateCedula(cedula)) return alert("La cédula debe ser válida.");
        if (!direccion.trim()) return alert("La dirección es obligatoria.");
        if (!pais.trim()) return alert("El país es obligatorio.");
        if (!codigoPostal.trim()) return alert("El código postal es obligatorio.");
        if (!barrio.trim()) return alert("El barrio es obligatorio.");
        if (!ciudad.trim()) return alert("La ciudad es obligatoria.");
        //  if (!formattedPhoneNumber.trim()) return alert("El teléfono debe ser válido.");

        handleStore();
        navigation.navigate("ShipmentForm2");
        console.log("formData", formData);
        console.log("sender de store", sender);

    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <InternalHeader showBackButton={true} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.subheaderText}>¿Quién envía?</Text>
                <Text style={styles.subheaderTextSecondary}>
                    Completa los datos de remitente
                </Text>
                <ProgressBar currentStep={1} />

                {/* Campos del formulario */}
                {[
                    { label: "Nombre", key: "nombre" },
                    { label: "Cédula", key: "cedula" },
                    { label: "Dirección", key: "direccion" },
                    { label: "País", key: "pais" },
                    { label: "Código Postal", key: "codigoPostal" },
                    { label: "Barrio", key: "barrio" },
                    { label: "Ciudad", key: "ciudad" },
                ].map(({ label, key }, index) => (
                    <View key={index} style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>{label}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={`Ingresa ${label.toLowerCase()}`}
                            value={formData[key]}
                            onChangeText={(value) => handleInputChange(key, value)}
                        />
                    </View>
                ))}

                {/* Teléfono con formato internacional */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Teléfono</Text>
                    {/* Teléfono con formato internacional 
                    <PhoneInput
                        defaultCode="UY"
                        layout="first"
                        onChangeFormattedText={setFormattedPhoneNumber}
                        containerStyle={styles.phoneInputContainer}
                        textContainerStyle={styles.phoneInputTextContainer}
                        flagButtonStyle={styles.flagButton}
                    />
                    */}
                </View>

                {/* Botones: Atrás y Siguiente */}

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>Atrás</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={handleValidation}>
                        <Text style={styles.buttonText2}>Siguiente</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    subheaderText: {
        fontFamily: "Delivery", // Fuente personalizada
        fontSize: 24,
        textAlign: "center",
        marginVertical: 10,
    },
    subheaderTextSecondary: {
        fontFamily: "Delivery2", // Fuente personalizada secundaria
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontFamily: "Delivery2", // Fuente personalizada para etiquetas
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        //borderColor: COLORS.greenBright2,
        borderRadius: 5,
        height: 50,
        paddingHorizontal: 10,
        fontFamily: "Delivery2", // Fuente personalizada en campos de entrada
    },
    phoneInputContainer: {
        //borderColor: COLORS.greenBright2,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        height: 50,
        justifyContent: "center",
        width: "100%",
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        backgroundColor: COLORS.red,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 7,
        marginTop: 20,
        width: '100%',
        maxHeight: 40,
        maxWidth: 150,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 25,
        marginLeft: 25,

    },
    button2: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.red,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 7,
        marginTop: 20,
        width: '100%',
        maxHeight: 40,
        maxWidth: 150,
        alignItems: 'center',
        justifyContent: 'center',
        outlineColor: COLORS.red,
        marginRight: 25,
        marginLeft: 5,
    },
    buttonText: {
        fontFamily: "Delivery", // Fuente personalizada en botones
        color: COLORS.white,
        fontSize: 16,
    },
    buttonText2: {
        color: COLORS.red,
        fontSize: 14,
        fontWeight: 'bold',
    },
    backButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
        alignContent: 'center',
    },
});

export default ShipmentForm1;
