import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title="Ingrese código de" title2={"seguridad"} />


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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 70,
    paddingLeft: 70,
    paddingRight: 70,
    width: '100%',
    //marginLeft: 10,
    //marginRight: 10,
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
