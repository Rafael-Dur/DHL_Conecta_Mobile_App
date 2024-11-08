import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { useNavigation } from '@react-navigation/native';

const SecurityCodeScreen = () => {
  const [securityCode, setSecurityCode] = useState('');
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('Reset_Password');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/LogoDHL.png')} style={styles.logo} />
      <Text style={styles.title}>Ingrese código de seguridad</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => { navigation.navigate('Validate_Mail') }}>
        <Ionicons name="chevron-back" size={24} color="red" />
        <Text style={styles.backText}>Volver</Text>
      </TouchableOpacity>

      <TextField
        label="Código de recuperación"
        placeholder="Ingrese el código aquí"
        value={securityCode}
        onChangeText={setSecurityCode}
        secureTextEntry={!isCodeVisible}
        rightIcon={
          <Ionicons
            name={isCodeVisible ? "eye-off" : "eye"}
            size={20}
            color="gray"
            onPress={() => setIsCodeVisible(!isCodeVisible)}
          />
        }
      />

      <Text style={styles.instructionText}>
        Acceda a au correo electrónico{"\n"}para obtener su código de recuperación
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
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginLeft: 280,
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
