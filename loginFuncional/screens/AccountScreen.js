import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InternalHeader from '../components/InternalHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/constants';

const MenuOption = ({ icon, title, onPress }) => (
  <TouchableOpacity style={styles.optionCard} onPress={onPress}>
    <MaterialIcons name={icon} size={24} color={COLORS.red} style={styles.icon} />
    <Text style={styles.optionText}>{title}</Text>
    <MaterialIcons name="chevron-right" size={24} color={COLORS.black} />
  </TouchableOpacity>
);

export default function AccountScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <InternalHeader showBackButton={true} />
        
        <View style={styles.content}>
          <Text style={styles.title}>¿Qué deseas hacer hoy?</Text>

          <View style={styles.optionsContainer}>
            <MenuOption
              icon="local-shipping"
              title="Creación de Envío"
              onPress={() => navigation.navigate('ServiceSelection')}
            />

            <MenuOption
              icon="search"
              title="Rastrear un envío"
              onPress={() => navigation.navigate('TrackShipment')}
            />

            <MenuOption
              icon="help"
              title="Solicitar ayuda"
              onPress={() => navigation.navigate('ContactModal')}
            />

            <MenuOption
              icon="location-on"
              title="Sucursales"
              onPress={() => navigation.navigate('Branches')}
            />

            <MenuOption
              icon="question-answer"
              title="Preguntas frequentes"
              onPress={() => navigation.navigate('FAQ')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  title: {
    fontFamily: 'Delivery',
    fontSize: 24,
    color: COLORS.black,
    marginBottom: 30,
  },
  optionsContainer: {
    gap: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  icon: {
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontFamily: 'Delivery2',
    fontSize: 16,
    color: COLORS.black,
  },
}); 