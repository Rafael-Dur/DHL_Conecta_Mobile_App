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
import { Banks } from "../constants/enums"; // Enums de Bancos
import ProgressIndicator from "../components/ProgressIndicator"; // Indicador de progreso
import { useDispatch, useSelector } from "react-redux";
import { updateShipmentField } from "../features/Shipments/ShipmentSlice";

const banks = [
  { id: Banks.BROU, name: "BROU", logo: require("../assets/BankIcon_BROU.svg") },
  { id: Banks.HSBC, name: "HSBC", logo: require("../assets/BankIcon_HSBC.png") },
  { id: Banks.ITAU, name: "ITAU", logo: require("../assets/BankIcon_ITAU.png") },
  { id: Banks.SANTANDER, name: "Santander", logo: require("../assets/BankIcon_SANTANDER.png") },
  { id: Banks.SCOTIABANK, name: "Scotiabank", logo: require("../assets/BankIcon_SCOTIA.png") },
  { id: Banks.VISA, name: "VISA", logo: require("../assets/BankIcon_VISA.png") },
];

export default function PaymentMethodScreen({ navigation }) {
  const [selectedBank, setSelectedBank] = useState(null); // Estado local para el banco seleccionado
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { success, error, loading, bank } = useSelector((state) => state.shipments);

  const handleBankSelect = (bankId) => {
    setSelectedBank(bankId); // Actualiza el estado local
    dispatch(updateShipmentField({ key: "bank", value: bankId })); // Actualiza el estado global

    console.log("Banco seleccionado:", bank);

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
      {/* Título */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Medio de Pago</Text>
      </View>
        {/* Indicador de Progreso */}
        <ProgressIndicator totalPasos={6} pasoActual={6} />
        <View style={styles.welcomeContainer}>
        <Text style={styles.subText}>¿Cómo quieres pagarlo?</Text>
      </View>

      {/* Tarjetas de Bancos */}
      <View style={styles.cardContainer}>
        {banks.map((bank) => (
          <TouchableOpacity
            key={bank.id}
            style={[
              styles.card,
              selectedBank === bank.id && styles.selectedCard, // Resalta la tarjeta seleccionada
            ]}
            onPress={() => handleBankSelect(bank.id)}
          >
            <Image source={bank.logo} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>{bank.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botones */}
      <View >
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
    height: "45%", // Tarjetas cuadradas
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
