import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';

const SecurityCodeScreen = () => {
  const [securityCode, setSecurityCode] = useState('');
  const navigation = useNavigation();

  // Validación del código de seguridad
  const validateSecurityCode = (code) => /^\d{6}$/.test(code);

  const handleContinue = () => {
    // Validar si el campo está vacío
    if (!securityCode.trim()) {
      return Alert.alert('Error', 'Por favor, ingrese el código de seguridad.');
    }

    // Validar que el código sea numérico y tenga 6 dígitos
    if (!validateSecurityCode(securityCode)) {
      return Alert.alert(
        'Código inválido',
        'El código debe contener exactamente 6 dígitos numéricos.'
      );
    }

    navigation.navigate('Reset_Password');
  };

  return (
    <View style={styles.container}>
      <Header title="Ingrese código" title2={"de seguridad"} />

      <BackButton onPress={() => navigation.navigate('Validate_Mail')} />

      <Text style={styles.label}>Código de recuperación</Text>

      <InputField
        placeholder="Ingrese el código aquí"
        value={securityCode}
        onChangeText={setSecurityCode}
        keyboardType="numeric"
      />

      <Text style={styles.instructionText}>
        Acceda a su correo electrónico{"\n"}para obtener su código de recuperación
      </Text>

      <Button
        title="Continuar"
        onPress={handleContinue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 14,
  },
  instructionText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default SecurityCodeScreen;
