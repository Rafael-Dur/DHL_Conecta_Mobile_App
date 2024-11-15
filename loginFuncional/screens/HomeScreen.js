import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Importa los íconos desde tus assets si tienes archivos SVG o PNG
const packageIcon = require('../assets/package-icon.png');
const documentIcon = require('../assets/document-icon.png');
const dhlLogo = require('../assets/LogoDHL.png');

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={dhlLogo} style={styles.logo} />
      </View>

      {/* Mensaje de bienvenida */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bienvenido!</Text>
        <Text style={styles.subText}>¿Qué necesitas enviar hoy?</Text>
      </View>

      {/* Tarjetas de opciones */}
      <View style={styles.cardContainer}>
        {/* Tarjeta de Paquete */}
        <TouchableOpacity style={styles.card}>
          <Image source={packageIcon} style={styles.cardIcon} />
          <Text style={styles.cardTitle}>Paquete</Text>
          <Text style={styles.cardDescription}>
            Necesito enviar varios artículos a Uruguay
          </Text>
          <MaterialIcons name="info" size={20} color="#C00" style={styles.infoIcon} />
        </TouchableOpacity>

        {/* Tarjeta de Documento */}
        <TouchableOpacity style={styles.card}>
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
        <TouchableOpacity onPress={() => navigation.navigate('NewShipment')}>
          <MaterialIcons name="add-circle" size={50} color="#C00" />
        </TouchableOpacity>
        <MaterialIcons name="local-shipping" size={30} color="#C00" />
        <MaterialIcons name="menu" size={30} color="#C00" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#FFD700',
    paddingVertical: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  welcomeContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subText: {
    fontSize: 18,
    color: '#555',
    marginTop: 5,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: 150,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  cardIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C00',
    marginBottom: 5,
  },
  cardDescription: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
  },
  infoIcon: {
    marginTop: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});
