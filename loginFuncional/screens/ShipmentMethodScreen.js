import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InternalHeader from "../components/InternalHeader";
import Button from "../components/Button";
import { COLORS, FONT_SIZES } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateShipmentField } from "../features/Shipments/ShipmentSlice";
import { ShippingMethod } from "../constants/enums";


const { width, height } = Dimensions.get("window");

const ShipmentMethodScreen = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null); // Estado para la opción seleccionada
  const dispatch = useDispatch();

  const handleNextPress = () => {
    if (!selectedOption) {
      alert("Por favor selecciona una opción de envío.");
      return;
    }

    // Actualizar el estado global con la opción seleccionada
    dispatch(updateShipmentField({ key: "shippingMethod", value: selectedOption }));

    navigation.navigate("ShipmentForm1");
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option); // Establecer la opción seleccionada
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Encabezado con botón de retroceso */}
      <InternalHeader showBackButton={true} />

      {/* Contenido principal */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Forma de envío</Text>
          <Text style={styles.subHeaderText}>Selecciona cómo quieres entregar el paquete a DHL.</Text>
        </View>

        {/* Opciones de envío en dos columnas */}
        <View style={styles.optionsContainer}>
          {/* Opción 1: Recolección */}
          <View style={styles.optionColumn}>
            <Text style={styles.subtitle}>Recolección</Text>
            <TouchableOpacity
              style={[
                styles.option,
                selectedOption === ShippingMethod.HousePickUp && styles.selectedOption, // Usando el enum
              ]}
              onPress={() => handleOptionSelect(ShippingMethod.HousePickUp)} // Usando el enum
            >
              <Image
                source={require("../assets/delivery-van.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.optionText}>DHL vendrá a buscar el envío</Text>
          </View>

          {/* Opción 2: En Sucursal */}
          <View style={styles.optionColumn}>
            <Text style={styles.subtitle}>En Sucursal</Text>
            <TouchableOpacity
              style={[
                styles.option,
                selectedOption === ShippingMethod.Store && styles.selectedOption, // Usando el enum
              ]}
              onPress={() => handleOptionSelect(ShippingMethod.Store)} // Usando el enum
            >
              <Image
                source={require("../assets/live-tracking.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text style={styles.optionText}>Iré a una tienda de DHL</Text>
          </View>
        </View>

        {/* Botón siguiente */}
        <Button
          onPress={handleNextPress}
          title="Siguiente"
          styleType="default"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    padding: width * 0.05,
    backgroundColor: COLORS.grayLight,
    alignItems: "center",
  },
  header: {
    marginBottom: 40,
  },
  headerText: {
    fontFamily: "Delivery", // Fuente personalizada principal
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20,
    color: COLORS.black,
    fontSize: FONT_SIZES.xlarge,
    width: '100%',
    maxWidth: 350,
  },
  subHeaderText: {
    fontFamily: 'Delivery2',
    fontSize: 22,
    color: '#666',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.08,
  },
  optionColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  option: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingVertical: 30,
    marginHorizontal: width * 0.02,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  selectedOption: {
    borderColor: COLORS.red,
    borderWidth: 3,
    backgroundColor: COLORS.lightBlue,
  },
  subtitle: {
    fontFamily: 'Delivery',
    fontSize: width * 0.045,
    //fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 10,
    textAlign: "center",
  },
  icon: {
    width: 150,
    height: 40,
    marginBottom: 10,
  },
  optionText: {
    fontFamily: 'Delivery2',
    fontSize: width * 0.05,
    textAlign: "center",
    color: COLORS.black,
    marginHorizontal: 10,
    marginTop: 20,
  },
});

export default ShipmentMethodScreen;
