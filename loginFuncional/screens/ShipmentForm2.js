import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InternalHeader from "../components/InternalHeader";
import { COLORS } from "../constants/constants";
//import PhoneInput from "react-native-phone-number-input";
import ProgressBar from "../components/ProgressBar";
import { updateShipmentField } from "../features/Shipments/ShipmentSlice";
import { useDispatch, useSelector } from "react-redux";

const validateCedula = (CI) => /^[0-9]{6,8}$/.test(CI);

const ShipmentForm2 = ({ navigation }) => {

    const dispatch = useDispatch();
    const { receiver } = useSelector((state) => state.shipments);

    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        pais: "",
        codigoPostal: "",
        barrio: "",
        telefono: "+59897679522",
        ciudad: "",
    });

    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");

    const handleInputChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    };

    const handleStore = () => {
        const receiver = {
            name: formData.nombre,
            address: formData.direccion,
            country: formData.pais,
            postalCode: formData.codigoPostal,
            neighborhood: formData.barrio,
            city: formData.ciudad,
            phoneNumber: formData.telefono,
        };
        dispatch(updateShipmentField({ key: "receiver", value: receiver }));

    };

    const handleValidation = () => {
        const { nombre, CI, direccion, pais, codigoPostal, barrio, ciudad } = formData;

        if (!nombre.trim()) return alert("El nombre es obligatorio.");
        if (!validateCedula(CI)) return alert("La cédula debe ser válida.");
        if (!direccion.trim()) return alert("La dirección es obligatoria.");
        if (!pais.trim()) return alert("El país es obligatorio.");
        if (!codigoPostal.trim()) return alert("El código postal es obligatorio.");
        if (!barrio.trim()) return alert("El barrio es obligatorio.");
        if (!ciudad.trim()) return alert("La ciudad es obligatoria.");
        //  if (!formattedPhoneNumber.trim()) return alert("El teléfono debe ser válido.");
        handleStore();
        console.log("formData", formData);
        console.log("receiver de store", receiver);

        navigation.navigate("ShipmentForm3");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <InternalHeader showBackButton={true} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.subheaderText}>¿Quién recibe en Uruguay?</Text>
                <Text style={styles.subheaderTextSecondary}>
                    Completa los datos de destinatario
                </Text>
                <ProgressBar currentStep={2} />

                {/* Campos del formulario */}
                {[
                    { label: "Nombre", key: "nombre" },
                    { label: "Cédula", key: "CI" },
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
                        style={[styles.button, styles.backButton]}
                        onPress={() => navigation.navigate("ShipmentForm1")}
                    >
                        <Text style={styles.backButtonText}>Atrás</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleValidation}>
                        <Text style={styles.buttonText}>Siguiente</Text>
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
        fontFamily: "Delivery", // Fuente personalizada principal
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
        fontFamily: "Delivery2", // Fuente secundaria para etiquetas
        fontSize: 14,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.greenBright2,
        borderRadius: 5,
        height: 50,
        paddingHorizontal: 10,
        fontFamily: "Delivery2", // Fuente personalizada en campos de entrada
    },
    phoneInputContainer: {
        borderColor: COLORS.greenBright2,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        height: 50,
        justifyContent: "center",
        width: "100%",
        marginBottom: 15,
        padding: 0,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        flex: 0.48, // Ocupar el 48% del ancho para dejar espacio entre los botones
        backgroundColor: COLORS.red,
        padding: 15,
        alignItems: "center",
        borderRadius: 8,
    },
    backButton: {
        flex: 0.48,
        backgroundColor: COLORS.white,
        borderWidth: 3,
        borderColor: COLORS.red,
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
    },
    buttonText: {
        fontFamily: "Delivery", // Fuente personalizada en botones
        color: COLORS.white,
        fontSize: 16,
    },
    backButtonText: {
        fontFamily: "Delivery", // Fuente personalizada en el texto del botón de retroceso
        color: COLORS.red,
        fontSize: 16,
    },
});


export default ShipmentForm2;
