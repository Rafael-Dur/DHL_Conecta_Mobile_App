import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';
import SuccessModal from '../components/SuccessModal';
import ClickeableText from '../components/ClickeableText';

export default function RegisterScreen({ navigation }) {
  const [isSuccessVisible, setSuccessVisible] = React.useState(false);

  const handleSuccessfulRegister = () => {
    setSuccessVisible(true);
  };

  const handleCloseModal = () => {
    setSuccessVisible(false);
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title="¡Regístrate!" subtitle="Crea una cuenta para continuar" />

        {/* Renderizar RegisterForm y pasar la función handleSuccessfulRegister */}
        <RegisterForm onRegister={handleSuccessfulRegister} />

        <ClickeableText
          navigation={navigation}
          onPress={() => navigation.navigate('Login')}
          title="¿Ya tienes una cuenta?"
          clickeableText="Inicia sesión"
          styleType="link"
        />

        {/* Mostrar el modal de éxito */}
        <SuccessModal
          visible={isSuccessVisible}
          onClose={handleCloseModal}
          title="¡Registro exitoso!"
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
    //justifyContent: 'center',
    alignItems: 'center',
    //paddingBottom: 20,
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
