import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import InternalHeader from "../components/InternalHeader"; // Header
import { COLORS } from "../constants/constants"; // Colores
import ButtonGroup from "../components/ButtonGroup"; // Grupo de botones
import { Banks } from "../constants/enums"; // Enums de Bancos
import { useDispatch, useSelector } from "react-redux";
import { updateShipmentField, createShipment, createDocumentShipment, clearShipmentState } from "../features/Shipments/ShipmentSlice";
import BodyContainer from "../components/BodyContainer";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal"; // Asegúrate de tener un componente para éxito
import ProgressBar from "../components/ProgressBar"; // Asegúrate de tener un componente para progreso
import { SafeAreaView } from "react-native-safe-area-context";

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
  const { success, error, loading, DHLConfirmation, } = useSelector((state) => state.shipments);
  const shipments = useSelector((state) => state.shipments);
  const { shipmentPackageType } = useSelector((state) => state.shipments);


  const handleBankSelect = (bankId) => {
    setSelectedBank(bankId); // Actualiza el estado local
    dispatch(updateShipmentField({ key: "bank", value: bankId })); // Actualiza el estado global
  };

  const handlePayment = () => {
    if (!selectedBank) {
      Alert.alert("Error", "Por favor selecciona un método de pago.");
      return;
    }
    console.log(shipments);
    (shipmentPackageType === 1) ? dispatch(createShipment()) : dispatch(createDocumentShipment());

  };

  const handleCloseErrorModal = () => {
    // dispatch(clearShipmentError());
    navigation.goBack(); // Redirige al usuario después de cerrar el modal de error
  };

  const handleCloseSuccessModal = () => {
    dispatch(clearShipmentState());
    navigation.navigate("Home"); // Redirige al usuario después de cerrar el modal de éxito

  };

  // Maneja cambios en éxito o error
  useEffect(() => {
    if (success) {
      Alert.alert("Pago exitoso", `Confirmación: ${DHLConfirmation}`);
    }
  }, [success]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <InternalHeader showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>


        {/* Título */}
        <BodyContainer isGrayBackground={true}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Medio de Pago</Text>
          </View>
          {/* Indicador de Progreso */}
          <ProgressBar currentStep={6} />
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
          <View>
            <ButtonGroup
              leftButtonTitle="Volver"
              onLeftPress={() => navigation.goBack()}
              leftStyleType="outlined"
              rightButtonTitle={loading ? "Enviando..." : "Pagar"}
              onRightPress={handlePayment}
            />
          </View>


          {/* Modales */}
          <ErrorModal
            visible={!!error}
            title="¡Hubo un problema!"
            subtitle="No hemos podido procesar el pago."
            message={typeof error === "string" ? error : "Algo salió mal. Intenta nuevamente."}
            onClose={handleCloseErrorModal}
          />
          <SuccessModal
            visible={!!success}
            title="¡Éxito!"
            subtitle="El pago fue procesado con éxito."
            message={`Confirmación: ${DHLConfirmation}`}
            onClose={handleCloseSuccessModal}
          />
        </BodyContainer>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.gray,
    justifyContent: "center",
    alignItems: "center",
    //paddingBottom: 20,
    paddingTop: 220,
  },
  welcomeContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  welcomeText: {
    fontFamily: "Delivery", // Fuente personalizada principal
    fontSize: 24,
    color: COLORS.black,
  },
  subText: {
    fontFamily: "Delivery2", // Fuente personalizada secundaria
    fontSize: 16,
    color: COLORS.black,
    marginTop: 5,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    //width: "100%",
    maxWidth: '100%',
    maxHeight: '100%',
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
    width: "40%",
    height: "20%", // Tarjetas cuadradas
    marginBottom: 20,
  },
  selectedCard: {
    borderColor: COLORS.red,
    borderWidth: 2,
  },
  cardIcon: {
    width: '40%',
    height: '30%',
    marginBottom: 10,
    resizeMode: "contain",
  },
  cardTitle: {
    fontFamily: "Delivery", // Fuente personalizada principal
    fontSize: 16,
    color: COLORS.black,
    textAlign: "center",
  },
});

