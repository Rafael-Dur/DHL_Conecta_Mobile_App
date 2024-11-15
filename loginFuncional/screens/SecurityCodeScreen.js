import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Header from '../components/Header';

const SecurityCodeScreen = () => {
  const [securityCode, setSecurityCode] = useState('');
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('Reset_Password');
  };

  return (
    <View style={styles.container}>
      <Header title="Ingrese código " title2={"de seguridad"} />

      <TouchableOpacity style={styles.backButton} onPress={() => { navigation.navigate('Validate_Mail') }}>
        <Ionicons name="chevron-back" size={24} color="red" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

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
        style={styles.continueButton}
      />
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft: 260,
  },
  backText: {
    color: 'red',
    fontSize: 16,
    marginLeft: 5,
  },
  instructionText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,

  },
  continueButton: {
    width: '100%',
    marginTop: 20,
    backgroundColor: 'red',
  },
  problemText: {
    fontSize: 14,
    color: '#666',
    marginTop: 20,
  },
  contactText: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
});

export default SecurityCodeScreen;
