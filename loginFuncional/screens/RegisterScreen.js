import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';
import ClickeableText from '../components/ClickeableText';
import HeaderContainer from '../components/HeaderContainer';
import BodyContainer from '../components/BodyContainer';
import { COLORS } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/accountSlice';
import SuccessModal from '../components/SuccessModal'; // Asegúrate de tener este componente
import ErrorModal from '../components/ErrorModal'; // Asegúrate de tener este componente

export default function RegisterScreen({ navigation }) {
  const [responseMessage, setResponseMessage] = React.useState('');
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = React.useState(false);
  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector((state) => state.account);

  const handleSuccessfulRegister = (registerData) => {
    dispatch(registerUser(registerData))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          // Si el registro es exitoso, abrir el Success Modal
          setResponseMessage(action.payload?.message || '¡Registro exitoso!');
          setIsSuccessModalVisible(true);
        } else {
          // Si el registro falla, abrir el Error Modal
          const errorMsg = action.payload?.message || 'Error en el registro.';
          setResponseMessage(errorMsg);
          setIsErrorModalVisible(true);
        }
      });
  };

  const handleCloseModal = () => {
    setIsErrorModalVisible(false);
    setIsSuccessModalVisible(false);
    navigation.navigate('Login')
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

        {loading && <Text style={styles.loadingText}>Cargando...</Text>}

        {/* Mostrar el mensaje de respuesta */} 

        <SuccessModal 
          visible={isSuccessModalVisible}
          title="¡Registro exitoso!"
          subtitle={responseMessage}
          message="Recibirás un correo ni bien te aprueben el acceso."
          onClose={handleCloseModal}
        />
        
        <ErrorModal
          visible={isErrorModalVisible}
          leftButtonText='Intentar luego'
          rightButtonText='Reintentar'
          title="¡Hubo un problema!"
          message={responseMessage}
          subtitle="No se pudo registrar la cuenta de usuario :("
          showButton
          onLeftPress={handleCloseModal}
          onRightPress={() => setIsErrorModalVisible(false)}
        />
      </BodyContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  loadingText: {
    color: COLORS.gray,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});
