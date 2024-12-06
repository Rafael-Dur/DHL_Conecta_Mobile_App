import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InternalHeader from "../components/InternalHeader";
import { COLORS } from "../constants/constants";
import PhoneInput from "react-native-phone-number-input";
import Button from "../components/Button"; // Importar el componente Button

const ShipmentForm1 = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    cedula: "",
    direccion: "",
    pais: "",
    codigoPostal: "",
    barrio: "",
    telefono: "",
    ciudad: "",
  });

  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(""); // Número formateado
  const validateEmail = (email) => /^[\w.-]+@(gmail|hotmail|yahoo)\.com$/.test(email);
  const validateCedula = (cedula) => /^[0-9]{6,8}$/.test(cedula); // Ejemplo de validación de cédula

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
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
    if (!formattedPhoneNumber.trim()) return alert("El teléfono debe ser válido.");

    alert("Formulario válido. Continuar...");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <InternalHeader showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.subheaderText}>¿Quién envía?</Text>
        <Text style={styles.subheaderTextSecondary}>
          Completa los datos de remitente
        </Text>

        <View style={styles.progressBar}>
          {[1, 2, 3, 4, 5].map((step, index) => (
            <View
              key={index}
              style={[
                styles.stepCircle,
                index === 0 ? styles.currentStep : styles.upcomingStep,
              ]}
            >
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

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
          <PhoneInput
            defaultCode="UY"
            layout="first"
            onChangeFormattedText={setFormattedPhoneNumber}
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneInputTextContainer}
            flagButtonStyle={styles.flagButton}
          />
        </View>

        {/* Botón de siguiente */}
        <TouchableOpacity style={styles.button} onPress={handleValidation}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.greenBright2,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 10,
    paddingVertical: 10,
    padding: 0,
  },
  subheaderText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subheaderTextSecondary: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  currentStep: {
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  upcomingStep: {
    borderColor: "#d3d3d3",
    backgroundColor: "#f5f5f5",
  },
  stepText: {
    color: "#000",
    fontWeight: "600",
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
    paddingVertical: 10,
    padding: 10,
  },
  phoneInputText: {
    fontSize: 14,
    padding: 10,
    flex: 1,
  },
  flagButton: {
    marginRight: 10,
  },
  button: {
    backgroundColor: COLORS.red,
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
    width: "90%",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShipmentForm1;
