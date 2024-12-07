import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, useWindowDimensions, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import InternalHeader from "../components/InternalHeader";
import { ShipmentType } from "../constants/enums";
import { updateShipmentField } from "../features/Shipments/ShipmentSlice";
import { COLORS } from "../constants/constants";
import { SafeAreaView } from "react-native-safe-area-context";

const packageIcon = require("../assets/package-icon.png");
const documentIcon = require("../assets/document-icon.png");

export default function HomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();

  // Maneja la selección de una tarjeta y la navegación
  const handleCardPress = (type) => {
    dispatch(updateShipmentField({ key: "shipmentPackageType", value: type })); // Actualiza el campo en el store
    if (type === ShipmentType.Package) {
      navigation.navigate("ServiceSelection");
    } else if (type === ShipmentType.Document) {
      navigation.navigate("ShipmentMethodScreen");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <InternalHeader showBackButton={false} />

        {/* Mensaje de bienvenida */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>¡Bienvenido!</Text>
          <Text style={styles.subText}>¿Qué necesitas enviar hoy?</Text>
        </View>

        {/* Tarjetas de opciones */}
        <View style={styles.cardContainer}>
          {/* Tarjeta de Paquete */}
          <TouchableOpacity
            style={[styles.card, { width: width * 0.4 }]}
            onPress={() => handleCardPress(ShipmentType.Package)}
          >
            <Image source={packageIcon} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Paquete</Text>
            <Text style={styles.cardDescription}>
              Necesito enviar varios artículos a Uruguay
            </Text>
            <MaterialIcons name="info" size={20} color="#C00" style={styles.infoIcon} />
          </TouchableOpacity>

          {/* Tarjeta de Documento */}
          <TouchableOpacity
            style={[styles.card, { width: width * 0.4 }]}
            onPress={() => handleCardPress(ShipmentType.Document)}
          >
            <Image source={documentIcon} style={styles.cardIcon} />
            <Text style={styles.cardTitle}>Documento</Text>
            <Text style={styles.cardDescription}>
              Necesito enviar sólo papeles a Uruguay
            </Text>
            <MaterialIcons name="info" size={20} color="#C00" style={styles.infoIcon} />
          </TouchableOpacity>
        </View>

        {/* Barra de navegación inferior */}
        <View style={styles.bottomNav}>
          <MaterialIcons name="location-on" size={30} color="#C00" />
          <MaterialIcons name="notifications" size={30} color="#C00" />
          <TouchableOpacity>
            <MaterialIcons name="add-circle" size={50} color="#C00" />
          </TouchableOpacity>
          <MaterialIcons name="local-shipping" size={30} color="#C00" />
          <MaterialIcons name="menu" size={30} color="#C00" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
  },
  welcomeContainer: {
    marginVertical: "5%",
    alignItems: "center",
  },
  welcomeText: {
    fontFamily: "Delivery",
    fontSize: 30,
    marginBottom: 10,
  },
  subText: {
    fontFamily: "Delivery2",
    fontSize: 20,
    color: "#666",
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "5%",
    width: "90%",
  },
  card: {
    backgroundColor: "#fff",
    padding: "5%",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  cardIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },
  cardTitle: {
    fontFamily: "Delivery",
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.black,
    marginBottom: 5,
  },
  cardDescription: {
    fontFamily: "Delivery2",
    textAlign: "center",
    fontSize: 14,
    color: COLORS.black,
  },
  infoIcon: {
    marginTop: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
  },
});
