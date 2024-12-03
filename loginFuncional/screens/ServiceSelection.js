import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import ServiceCard from "../components/ServiceCard";
import BodyContainer from "../components/BodyContainer";
import { COLORS } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { setShipmentData, createShipment } from "../features/Shipments/ShipmentSlice";
import InternalHeader from '../components/InternalHeader';

export default function ServiceSelection() {
  const dispatch = useDispatch();
  const { success, error, loading, shipment } = useSelector((state) => state.shipments);

  const services = [
    {
      title: "Regalos Familiares",
      description:
        "Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Sed faucibus turpis in eu mi bibendum. Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
      image: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/tmot3k27lzb-I1782%3A232928%3B1150%3A1127?alt=media&token=1e5e48ef-50f7-48f9-87c1-09c58ee3e8b4",
      packageType: 1,
    },
    {
      title: "Libros",
      description:
        "Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Sed faucibus turpis in eu mi bibendum. Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
      image: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/tmot3k27lzb-I1782%3A232928%3B1150%3A1166?alt=media&token=dcb096de-e96d-4bbc-baf6-e43ddc91bc63",
      packageType: 2,
    },
    {
      title: "Ropa",
      description:
        "Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Sed faucibus turpis in eu mi bibendum. Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
      image: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/tmot3k27lzb-I1782%3A232928%3B1150%3A1127?alt=media&token=1e5e48ef-50f7-48f9-87c1-09c58ee3e8b4",
      packageType: 3,
    },
  ];


  const handleCreateShipment = (packageType) => {
    const shipmentData = {
      shipmentPackageType: packageType,
      shippingMethod: 1,
      sender: {
        name: "PRUEBA!!!",
        address: "Caldas 1234",
        country: "Uruguay",
        postalCode: "11900",
        neighborhood: "Belvedere",
        city: "Montevideo",
        phoneNumber: "+59899073333",
      },
      receiver: {
        name: "Marcelo Yuane",
        address: "Agraciada 1234",
        country: "Chile",
        postalCode: "11900",
        neighborhood: "La Teja",
        city: "Montevideo",
        phoneNumber: "+598999999",
      },
      shipmentBox: {
        boxType: 1,
        length: 10,
        width: 10,
        height: 10,
        shipmentPackageUnit: 1,
        weight: 10,
        weightUnit: 1,
      },
      shipmentItems: [
        {
          description: "Te sabor beso negro",
          shipmentProductTypeId: "c6066e87-b893-4b30-a285-98c7985f69fb",
          quantity: 1,
          value: 10,
        },
      ],
      bank: 1,
    };

    // Llama al thunk y pasa shipmentData
    dispatch(createShipment(shipmentData));

  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <internalHeader showBackButton={true} />
      <BodyContainer isGrayBackground={true}>
        <Text style={styles.headerText}>Comenzar envío</Text>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            image={service.image}
            onPress={() => handleCreateShipment(service.packageType)}
          />
        ))}
        {loading && <Text style={styles.loadingText}>Creando envío...</Text>}
        {success && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>Envío creado exitosamente.</Text>
            <Text style={styles.referenceText}>Referencia DHL: {shipment?.internalDhlReference}</Text>
          </View>
        )}
        {error && <Text style={styles.errorText}>Error: {error}</Text>}
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
