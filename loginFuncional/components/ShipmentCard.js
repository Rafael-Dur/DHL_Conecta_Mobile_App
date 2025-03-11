import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/constants';

const ShipmentStatus = ({ steps, currentStep }) => {
  return (
    <View style={styles.statusContainer}>
      {Array(6).fill(0).map((_, index) => (
        <React.Fragment key={index}>
          {index > 0 && <View style={[
            styles.statusLine,
            { backgroundColor: index <= currentStep ? COLORS.green : COLORS.gray }
          ]} />}
          <View style={[
            styles.statusDot,
            { backgroundColor: index <= currentStep ? COLORS.green : COLORS.gray }
          ]}>
            {index <= currentStep && (
              <MaterialIcons name="check" size={12} color="white" />
            )}
          </View>
        </React.Fragment>
      ))}
    </View>
  );
};

const ShipmentCard = ({ 
  trackingNumber, 
  status, 
  origin, 
  destination, 
  date,
  currentStep = 2,
  onPress 
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.trackingNumber}># {trackingNumber}</Text>
        <MaterialIcons name="chevron-right" size={24} color={COLORS.black} />
      </View>

      <ShipmentStatus currentStep={currentStep} />
      
      <Text style={[
        styles.status,
        { color: status === 'Entregado' ? COLORS.green : COLORS.black }
      ]}>
        {status}
      </Text>

      <View style={styles.routeContainer}>
        <View style={styles.locationContainer}>
          <Text style={styles.label}>Origen:</Text>
          <Text style={styles.location}>{origin}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.label}>Destino:</Text>
          <Text style={styles.location}>{destination}</Text>
        </View>
      </View>

      <Text style={styles.date}>{date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  trackingNumber: {
    fontFamily: 'Delivery',
    fontSize: 16,
    color: COLORS.black,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.gray,
  },
  status: {
    fontFamily: 'Delivery2',
    fontSize: 14,
    marginBottom: 15,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  locationContainer: {
    flex: 1,
  },
  label: {
    fontFamily: 'Delivery2',
    fontSize: 14,
    color: COLORS.black,
    fontStyle: 'italic',
  },
  location: {
    fontFamily: 'Delivery2',
    fontSize: 14,
    color: COLORS.black,
  },
  date: {
    fontFamily: 'Delivery2',
    fontSize: 12,
    color: COLORS.gray,
  },
});

export default ShipmentCard; 