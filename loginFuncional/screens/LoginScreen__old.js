import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ProgressIndicator from '../components/ProgressIndicator';

const ExampleScreen = () => {
  const totalPasos = 3;
  const pasoActual = 2; // Cambia esto dinámicamente según el progreso

  return (
    <View style={styles.container}>
      <ProgressIndicator totalPasos={totalPasos} pasoActual={pasoActual} />
      <Text style={styles.text}>Paso {pasoActual} de {totalPasos}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },
});

export default ExampleScreen;
