import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InternalHeader from '../components/InternalHeader';
import ShipmentCard from '../components/ShipmentCard';
import { COLORS } from '../constants/constants';

const MyShipmentsScreen = ({ navigation }) => {
  // Datos de ejemplo - En una implementación real, estos vendrían de una API o Redux
  const shipments = [
    {
      id: '782123134',
      status: 'En tránsito',
      origin: 'Madrid, ES',
      destination: 'Montevideo, UY',
      date: '19/01/2025',
      currentStep: 2,
    },
    {
      id: '5632678184',
      status: 'Entregado',
      origin: 'Roma, IT',
      destination: 'Montevideo, UY',
      date: '10/12/2024',
      currentStep: 5,
    },
  ];

  const handleShipmentPress = (shipmentId) => {
    // Navegar al detalle del envío
    console.log('Ver detalle del envío:', shipmentId);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <InternalHeader 
          title="Mis Envíos"
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
        />
        
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {shipments.map((shipment) => (
            <ShipmentCard
              key={shipment.id}
              trackingNumber={shipment.id}
              status={shipment.status}
              origin={shipment.origin}
              destination={shipment.destination}
              date={shipment.date}
              currentStep={shipment.currentStep}
              onPress={() => handleShipmentPress(shipment.id)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
  },
});

export default MyShipmentsScreen; 