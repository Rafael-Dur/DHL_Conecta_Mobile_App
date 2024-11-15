import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';


const SecurityCodeScreen = () => {
  const [securityCode, setSecurityCode] = useState('');
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('Reset_Password');
  };

  return (
    <View style={styles.container}>
      <Header title="Ingrese código " title2={"de seguridad"} />

      <BackButton onPress={() => { navigation.navigate('Validate_Mail') }} />

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
    </View >
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

  instructionText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,

  },
});

export default SecurityCodeScreen;
