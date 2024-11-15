import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';
import UnderlineText from '../components/UnderlineText';


export default function RegisterScreen({ navigation }) {
  // Función para manejar el registro exitoso desde RegisterForm
  const handleSuccessfulRegister = () => {
    Alert.alert('Registro exitoso', '¡Bienvenido!', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title="¡Regístrate!" subtitle="Crea una cuenta para continuar" />
        {/* Renderizar RegisterForm y pasar la función handleSuccessfulRegister */}
        <RegisterForm onRegister={handleSuccessfulRegister} />

        <UnderlineText title="¿Ya tienes una cuenta? Inicia sesión" navigateTo='Login' />

      </ScrollView>
    </View>
  );
}

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


});
