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

const validateEmail = (email) => /^[\w.-]+@(gmail|hotmail|yahoo)\.com$/.test(email);
const validateCedula = (CI) => /^[0-9]{6,8}$/.test(CI);

const ShipmentForm2 = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    pais: "",
    codigoPostal: "",
    barrio: "",
    telefono: "",
    ciudad: "",
  });

  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState("");

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
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
    if (!formattedPhoneNumber.trim()) return alert("El teléfono debe ser válido.");

    navigation.navigate("PaymentMethodScreen"); // Navegar a la pantalla de métodos de pago
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <InternalHeader showBackButton={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.subheaderText}>¿Quién recibe en Uruguay?</Text>
        <Text style={styles.subheaderTextSecondary}>
          Completa los datos de destinatario
        </Text>

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
          <PhoneInput
            defaultCode="UY"
            layout="first"
            onChangeFormattedText={setFormattedPhoneNumber}
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneInputTextContainer}
            flagButtonStyle={styles.flagButton}
          />
        </View>

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
  subheaderText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subheaderTextSecondary: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
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
  button: {
    backgroundColor: COLORS.red,
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ShipmentForm2;
