import React from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import ServiceCard from "../components/ServiceCard";
import BodyContainer from "../components/BodyContainer";
import { COLORS } from "../constants/constants";

export default function ServiceSelection() {
  const services = [
    {
      title: "Regalos Familiares",
      description:
        "Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Sed faucibus turpis in eu mi bibendum. Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
      image: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/tmot3k27lzb-I1782%3A232928%3B1150%3A1127?alt=media&token=1e5e48ef-50f7-48f9-87c1-09c58ee3e8b4",
    },
    {
      title: "Libros",
      description:
        "Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Sed faucibus turpis in eu mi bibendum. Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
      image: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/tmot3k27lzb-I1782%3A232928%3B1150%3A1166?alt=media&token=dcb096de-e96d-4bbc-baf6-e43ddc91bc63",
    },
    {
      title: "Ropa",
      description:
        "Amet nulla facilisi morbi tempus iaculis urna id volutpat lacus. Sed faucibus turpis in eu mi bibendum. Amet consectetur adipiscing elit pellentesque habitant morbi tristique.",
      image: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/tmot3k27lzb-I1782%3A232928%3B1154%3A742%3B1785%3A6843?alt=media&token=8892e6bd-e3ce-407c-8e15-799cd0e11e2a",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <BodyContainer isGrayBackground ={true} >
        <Text style={styles.headerText}>Comenzar envío</Text>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            image={service.image}
            onPress={() => alert(`Comenzar envío de ${service.title}`)}
          />
        ))}
        <Text style={styles.footerText}>
          Problemas? <Text style={styles.footerLink}>Contáctanos</Text>
        </Text>
      </BodyContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: COLORS.gray, // Fondo gris
    justifyContent: "center", // Centra verticalmente
    alignItems: "center", // Centra horizontalmente
    paddingBottom: 20,
    flexGrow: 1, // Permite que el contenido ocupe toda la pantalla
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.black,
    marginVertical: 20,
    textAlign: "center",
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
