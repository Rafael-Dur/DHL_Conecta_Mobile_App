import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import TextField from '../components/TextField';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';


const ValidateMailScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('Security_Code');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image source={require('../assets/LogoDHL.png')} style={styles.logo} />
        <Text style={styles.title}>Ingrese su correo electrónico</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => { navigation.navigate('Login') }}>
          <Ionicons name="chevron-back" size={24} color="red" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>

        <InputField
          label="Correo electrónico"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Button
          title="Continuar"
          onPress={handleContinue}
          style={styles.continueButton}
        />
      </ScrollView>
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
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 70,
    width: 'auto',
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
    marginBottom: 30,
    textAlign: 'center',
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
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: '#666',
  },
  input: {
    fontSize: 16,
    paddingVertical: 5,
  },
  continueButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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

export default ValidateMailScreen;
