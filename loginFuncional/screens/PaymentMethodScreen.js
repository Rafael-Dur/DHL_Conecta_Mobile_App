import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
} from "react-native";
import InternalHeader from "../components/InternalHeader"; // Asumimos que ya tienes este componente
import { COLORS } from "../constants/constants"; // Define tu esquema de colores
import Button from "../components/Button";

const banks = [
  { id: 1, name: "BROU", logo: require("../assets/LogoDHL.png") },
  { id: 2, name: "HSBC", logo: require("../assets/LogoDHL.png") },
  { id: 3, name: "ITAU", logo: require("../assets/LogoDHL.png") },
  { id: 4, name: "Santander", logo: require("../assets/LogoDHL.png") },
  { id: 5, name: "Scotiabank", logo: require("../assets/LogoDHL.png") },
  { id: 6, name: "VISA", logo: require("../assets/LogoDHL.png") },
];

export default function PaymentMethodScreen({ navigation }) {
  const [selectedBank, setSelectedBank] = useState(null); // Estado para el banco seleccionado
  const { width } = useWindowDimensions();

  const handleBankSelect = (bankId) => {
    setSelectedBank(bankId);
  };

  const handlePayment = () => {
    if (selectedBank) {
      Alert.alert("Pago realizado", `Has seleccionado ${banks.find(bank => bank.id === selectedBank)?.name}`);
      navigation.goBack(); // Puedes redirigir según lo necesario
    } else {
      Alert.alert("Error", "Por favor selecciona un método de pago.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <InternalHeader showBackButton={true} />

      {/* Progreso */}
      <View style={styles.progressContainer}>
        {[...Array(6)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressStep,
              index < 5 && styles.progressStepCompleted, // Estilo para pasos completados
            ]}
          />
        ))}
        <Text style={styles.stepNumber}>6</Text>
      </View>

      {/* Título */}
      <Text style={styles.title}>Medio de Pago</Text>
      <Text style={styles.subtitle}>¿Cómo quieres pagarlo?</Text>

      {/* Bancos */}
      <View style={styles.banksContainer}>
        {banks.map((bank) => (
          <TouchableOpacity
            key={bank.id}
            style={[
              styles.bankCard,
              selectedBank === bank.id && styles.selectedCard, // Estilo para la tarjeta seleccionada
            ]}
            onPress={() => handleBankSelect(bank.id)}
          >
            <Text style={styles.bankName}>{bank.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botones */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Atrás</Text>
        </TouchableOpacity>
        <Button title="Pagar" onPress={handlePayment} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  progressStep: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.lightGray,
    marginHorizontal: 5,
  },
  progressStepCompleted: {
    backgroundColor: COLORS.green,
  },
  stepNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
    color: COLORS.black,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
    textAlign: "center",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: "center",
    marginBottom: 20,
  },
  banksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  bankCard: {
    width: "45%",
    backgroundColor: COLORS.lightGray,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: COLORS.red,
  },
  bankName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  backButton: {
    backgroundColor: COLORS.lightRed,
  },
  payButton: {
    backgroundColor: COLORS.red,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
