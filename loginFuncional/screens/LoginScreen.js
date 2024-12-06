import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import Header from '../components/Header';
import InputField from '../components/InputField';
import ClickeableText from '../components/ClickeableText';
import ErrorModal from '../components/ErrorModal';
import HeaderContainer from '../components/HeaderContainer';
import BodyContainer from '../components/BodyContainer';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, responseMessage, clearError } from '../features/auth/authSlice';
import { COLORS } from '../constants/constants';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('popo@gmail.com');
  const [password, setPassword] = useState('Dhl12345!');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();
  const { response, error, jwtToken, loading } = useSelector((state) => state.auth);
  const handleLogin = () => {
    const loginData = { email, password };
    dispatch(loginUser(loginData));
  };

  const handleCloseModal = () => {
    dispatch(clearError());
  };

  // Efecto para redirigir si el inicio de sesión es exitoso
  useEffect(() => {
    if (jwtToken) {
      navigation.navigate('Home');
    }
  }, [jwtToken, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <HeaderContainer>
        <Header title="Bienvenido a" title2="Envíos DHL Conecta" />
      </HeaderContainer>
      <BodyContainer>
        <InputField
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureTextEntry}
          setSecureTextEntry={setSecureTextEntry}
        />
        <ClickeableText
          navigation={navigation}
          onPress={() => navigation.navigate('Validate_Mail')}
          clickeableText="¿Olvidó la contraseña?"
          styleType="link"
          singleLink
        />
        <Button title="Ingresar" onPress={handleLogin} />

        <ClickeableText
          navigation={navigation}
          onPress={() => navigation.navigate('Register')}
          title="¿No tienes Usuario?"
          clickeableText="Regístrate ahora"
          styleType="link"
        />

        <ErrorModal
          visible={!!error} // Mostrar el modal si hay un error
          title="¡Hubo un problema!"
          subtitle="No hemos podido iniciar sesión."
          message={typeof error === 'string' ? error : 'No se ha podido iniciar sesión.'}
          onClose={handleCloseModal}
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
    color: COLORS.white,
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});
