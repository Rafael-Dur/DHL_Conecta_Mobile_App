import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Button from "./Button"; // Asegúrate de importar tu botón correctamente

const ServiceCard = ({ title, description, image, onPress }) => {
  return (
    <View style={styles.card}>
      {/* Header de la tarjeta */}
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.infoIcon}>i</Text>
      </View>
      {/* Imagen */}
      <Image source={{ uri: image }} style={styles.cardImage} />

      {/* Descripción */}
      <Text style={styles.cardDescription}>{description}</Text>

      {/* Botón reutilizable */}
      <Button 
        title="Comenzar" 
        onPress={onPress} 
        styleType="default" 
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
   // maxHeight: 40,
    maxWidth: 350,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  infoIcon: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF0000",
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
});

export default ServiceCard;
