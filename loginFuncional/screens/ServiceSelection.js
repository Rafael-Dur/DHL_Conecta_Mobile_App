import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import ServiceCard from "../components/ServiceCard";
import BodyContainer from "../components/BodyContainer";
import { COLORS } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateShipmentField } from "../features/Shipments/ShipmentSlice";
import InternalHeader from '../components/InternalHeader';
import { ShipmentPackageType } from "../constants/enums";


export default function ServiceSelection({navigation}) {
  const dispatch = useDispatch();
  const { success, error, loading, shipment } = useSelector((state) => state.shipments);

  const services = [
    {
      title: "Regalos Familiares",
      description:
        "Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Sed faucibus turpis in eu mi bibendum. Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
      image: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/tmot3k27lzb-I1782%3A232928%3B1150%3A1127?alt=media&token=1e5e48ef-50f7-48f9-87c1-09c58ee3e8b4",
      packageType: ShipmentPackageType.FamilyPresents,
    },
    {
      title: "Libros",
      description:
        "Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Sed faucibus turpis in eu mi bibendum. Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
      image: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/tmot3k27lzb-I1782%3A232928%3B1150%3A1166?alt=media&token=dcb096de-e96d-4bbc-baf6-e43ddc91bc63",
      packageType: ShipmentPackageType.Books,
    },
    {
      title: "Ropa",
      description:
        "Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Sed faucibus turpis in eu mi bibendum. Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
      image: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/tmot3k27lzb-I1782%3A232928%3B1150%3A1127?alt=media&token=1e5e48ef-50f7-48f9-87c1-09c58ee3e8b4",
      packageType: ShipmentPackageType.Clothes,
    },
  ];

  
// Maneja la selección de una tarjeta
const handleStore = (type) => {
  dispatch(updateShipmentField({ key: "shipmentPackageType", value: type })); // Actualiza el campo en el store

};
const handleCardPress = (type) => {
  handleStore(type);
  navigation.navigate("ShipmentMethodScreen"); 
};
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <InternalHeader showBackButton={true} />
      <BodyContainer isGrayBackground={true}>
        <Text style={styles.headerText}>Comenzar envío</Text>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            image={service.image}
            onPress={() => handleCardPress(service.packageType)}
          />
        ))}
        <Text style={styles.footerText}>
          ¿Problemas? <Text style={styles.footerLink}>Contáctanos</Text>
        </Text>
      </BodyContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: COLORS.gray,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    flexGrow: 1,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
    marginVertical: 20,
    textAlign: "center",
  },
  loadingText: {
    color: COLORS.grayDark,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  successContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: COLORS.greenLight,
    borderRadius: 5,
  },
  successText: {
    color: COLORS.green,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  referenceText: {
    color: COLORS.greenDark,
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.grayDark,
    textAlign: "center",
    marginTop: 20,
  },
  footerLink: {
    color: COLORS.red,
    fontWeight: "bold",
  },
});
