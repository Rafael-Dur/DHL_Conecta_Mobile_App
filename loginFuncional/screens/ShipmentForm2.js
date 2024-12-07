import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InternalHeader from "../components/InternalHeader";
import { COLORS } from "../constants/constants";
import ProgressBar from "../components/ProgressBar";
import { updateShipmentField } from "../features/Shipments/ShipmentSlice";
import { useDispatch, useSelector } from "react-redux";

const validateCedula = (CI) => /^[0-9]{6,8}$/.test(CI);

const ShipmentForm2 = ({ navigation }) => {

    const dispatch = useDispatch();
    const { shipmentPackageType } = useSelector((state) => state.shipments);
    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        pais: "",
        codigoPostal: "",
        barrio: "",
        telefono: "", // Número de teléfono por defecto
        ciudad: "",
    });

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
        const { nombre, CI, telefono, direccion, pais, codigoPostal, barrio, ciudad } = formData;

        if (!nombre.trim()) return alert("El nombre es obligatorio.");
        if (!validateCedula(CI)) return alert("La cédula debe ser válida.");
        if (!telefono.trim()) return alert("El teléfono debe ser válido.");
        if (!direccion.trim()) return alert("La dirección es obligatoria.");
        if (!pais.trim()) return alert("El país es obligatorio.");
        if (!codigoPostal.trim()) return alert("El código postal es obligatorio.");
        if (!barrio.trim()) return alert("El barrio es obligatorio.");
        if (!ciudad.trim()) return alert("La ciudad es obligatoria.");
        handleStore();

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

                {shipmentPackageType === 1 ? (
                    <ProgressBar currentStep={2} totalSteps={6} />
                ) : (
                    <ProgressBar currentStep={2} totalSteps={5} />
                )}

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

                {/* Teléfono como input normal */}
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Teléfono</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingresa tu número de teléfono"
                        keyboardType="phone-pad"
                        value={formData.telefono}
                        onChangeText={(value) => handleInputChange("telefono", value)}
                    />
                </View>

                {/* Botones: Atrás y Siguiente */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button2}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.buttonText2}>Atrás</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleValidation}>
                        <Text style={styles.backButtonText}>Siguiente</Text>
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
        borderRadius: 5,
        height: 50,
        paddingHorizontal: 10,
        fontFamily: "Delivery2", // Fuente personalizada en campos de entrada
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
    },
});

export default ShipmentForm2;
