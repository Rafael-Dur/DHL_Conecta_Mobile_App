import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';
import ClickeableText from '../components/ClickeableText';
import HeaderContainer from '../components/HeadContainer';
import BodyContainer from '../components/BodyContainer';
import { COLORS } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/auth/accountSlice';

export default function RegisterScreen({ navigation }) {
  const [responseMessage, setResponseMessage] = React.useState('');
  const dispatch = useDispatch();
  const { loading, error, success, message } = useSelector((state) => state.account);

  const handleSuccessfulRegister = (registerData) => {
    dispatch(registerUser(registerData))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          setResponseMessage(action.payload?.message || '¡Registro exitoso!');
        } else {
          const errorMsg = action.payload?.message || 'Error en el registro.';
          setResponseMessage(errorMsg);
        }
      });
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
        {responseMessage && (
          <View style={styles.responseContainer}>
            <Text style={styles.responseText}>{responseMessage}</Text>
          </View>
     )}
     {error && (
       <View style={styles.responseContainer}>
         <Text>Error:</Text>
         <Text>{typeof error === 'string' ? error : JSON.stringify(error, null, 2)}</Text>
       </View>
     )}
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
  responseContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 5,
    backgroundColor: COLORS.lightGray,
  },
  responseText: {
    color: COLORS.green,
    fontSize: 16,
    textAlign: 'center',
  },
  errorText: {
    color: COLORS.red,
    fontSize: 16,
    textAlign: 'center',
  },
});
