import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/constants'; // Asegúrate de usar tus colores predefinidos

const ProgressIndicator = ({ totalPasos, pasoActual }) => {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalPasos }, (_, index) => {
        const paso = index + 1;
        const esPasoActual = paso === pasoActual;
        const esCompletado = paso < pasoActual;

        return (
          <View key={paso} style={styles.pasoContainer}>
            {/* Línea antes del círculo */}
            {paso > 1 && <View style={[styles.linea, esCompletado && styles.lineaCompletada]} />}

            {/* Círculo del paso */}
            <View style={[styles.circulo, esCompletado && styles.circuloCompletado, esPasoActual && styles.circuloActual]}>
              <Text style={[styles.textoCirculo, esPasoActual && styles.textoPasoActual]}>
                {esCompletado ? '✔' : paso}
              </Text>
            </View>

            {/* Línea después del círculo */}
            {paso < totalPasos && <View style={[styles.linea, esCompletado && styles.lineaCompletada]} />}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    flex: 1,
  },
  pasoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linea: {
    width: 30,
    height: 2,
    backgroundColor: COLORS.greenBright,
  },
  lineaCompletada: {
    backgroundColor: COLORS.greenBright,
  },
  circulo: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  circuloCompletado: {
    backgroundColor: COLORS.greenBright,
    borderColor: COLORS.greenBright,
    color: COLORS.white,
  },
  circuloActual: {
    borderColor: COLORS.black,
    borderWidth: 3,
  },
  textoCirculo: {
    fontSize: 14,
    color: COLORS.gray,
  },
  textoPasoActual: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});

export default ProgressIndicator;
