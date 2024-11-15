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
    //alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  scrollContainer: {
    //justifyContent: 'center',
    alignItems: 'center',
    //paddingBottom: 20,
    paddingTop: 70,
    paddingLeft: 70,
    paddingRight: 70,
    width: '100%',
    //marginLeft: 10,
    //marginRight: 10,
  },


});
