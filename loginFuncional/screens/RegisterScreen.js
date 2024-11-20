import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';
import SuccessModal from '../components/SuccessModal';
import ClickeableText from '../components/ClickeableText';
import HeaderContainer from '../components/HeadContainer';
import BodyContainer from '../components/BodyContainer'
import { COLORS } from '../constants/constants';

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
    <ScrollView contentContainerStyle={styles.scrollContainer}>

      <HeaderContainer>
        <Header title="¡Regístrate!" subtitle="Crea una cuenta para continuar" />
      </HeaderContainer>
      <BodyContainer>
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
          subtitle="Tu registro se realizó correctamente"
          message="Esto es una prueba larga , larga , larga , larga Esto es una prueba larga , larga , larga , larga"
          showButton={true}
        />
      </BodyContainer>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },

});
