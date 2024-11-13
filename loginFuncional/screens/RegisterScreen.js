import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';
import SuccessModal from '../components/SuccessModal'; // Importa el modal de éxito

export default function RegisterScreen({ navigation }) {
  // Función para manejar el registro exitoso desde RegisterForm
  const [isSuccessVisible, setSuccessVisible] = React.useState(false);
  const handleSuccessfulRegister = () => {
    Alert.alert('Registro exitoso', '¡Bienvenido!', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
        // Si todo está bien, mostramos el modal de éxito
        setSuccessVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title="¡Regístrate!" subtitle="Crea una cuenta para continuar" />
        {/* Renderizar RegisterForm y pasar la función handleSuccessfulRegister */}
        <RegisterForm onRegister={handleSuccessfulRegister} />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </TouchableOpacity>

        <SuccessModal
          visible={isSuccessVisible}
          onClose={() => setSuccessVisible(false)}
          title={"¡Registro exitoso!"}
          message="Tu registro se realizó correctamente"
          showButton={true}

        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 70,
  },
  Button: {
    marginBottom: 20,
    backgroundColor: '#007bff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    color: '#0000FF',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
