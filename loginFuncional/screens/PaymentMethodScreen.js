import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  useWindowDimensions,
} from "react-native";
import InternalHeader from "../components/InternalHeader"; // Header
import { COLORS } from "../constants/constants"; // Colores
import Button from "../components/Button"; // Botón reutilizable

const banks = [
  { id: 1, name: "BROU", logo: require("../assets/BankIcon_BROU.svg") },
  { id: 2, name: "HSBC", logo: require("../assets/BankIcon_HSBC.png") },
  { id: 3, name: "ITAU", logo: require("../assets/BankIcon_ITAU.png") },
  { id: 4, name: "Santander", logo: require("../assets/BankIcon_SANTANDER.png") },
  { id: 5, name: "Scotiabank", logo: require("../assets/BankIcon_SCOTIA.png") },
  { id: 6, name: "VISA", logo: require("../assets/BankIcon_VISA.png") },
];

export default function PaymentMethodScreen({ navigation }) {
  const [selectedBank, setSelectedBank] = useState(null); // Estado para el banco seleccionado
  const { width } = useWindowDimensions();

  const handleBankSelect = (bankId) => {
    setSelectedBank(bankId);
  };

  const handlePayment = () => {
    if (selectedBank) {
      Alert.alert(
        "Pago realizado",
        `Has seleccionado ${banks.find((bank) => bank.id === selectedBank)?.name}`
      );
      navigation.goBack(); // Navega hacia atrás
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
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Medio de Pago</Text>
        <Text style={styles.subText}>¿Cómo quieres pagarlo?</Text>
      </View>

      {/* Tarjetas de Bancos */}
      <View style={styles.cardContainer}>
        {banks.map((bank) => (
          <TouchableOpacity
            key={bank.id}
            style={[
              styles.card,
              selectedBank === bank.id && styles.selectedCard, // Estilo para la tarjeta seleccionada
            ]}
            onPress={() => handleBankSelect(bank.id)}
          >
            <Image source={bank.logo} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>{bank.name}</Text>
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
    backgroundColor: COLORS.lightGray, // Fondo similar al de inicio
    alignItems: "center",
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
  welcomeContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
  },
  subText: {
    fontSize: 16,
    color: COLORS.gray,
    marginTop: 5,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    width: "45%",
    marginBottom: 20,
  },
  selectedCard: {
    borderColor: COLORS.red,
    borderWidth: 2,
  },
  cardIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: "contain",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
    textAlign: "center",
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
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
