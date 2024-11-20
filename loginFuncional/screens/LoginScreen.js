import React, { useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import Header from '../components/Header';
import InputField from '../components/InputField';
import ClickeableText from '../components/ClickeableText';
import ErrorModal from '../components/ErrorModal';
import HeaderContainer from '../components/HeadContainer';
import BodyContainer from '../components/BodyContainer'

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const handleCloseModal = () => {
    setIsErrorModalVisible(false);
    navigation.navigate('Register');
  };

  const handleLogin = () => {
    if (email && password) {
      navigation.navigate('Home');
    } else {
      setIsErrorModalVisible(true); // Mostrar modal de error si los campos están vacíos
    }
  };

  return (
    <View style={styles.container}>
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

        <TouchableOpacity onPress={() => setIsErrorModalVisible(true)}>
          <Text style={styles.errorButtonText}>Error Modal</Text>
        </TouchableOpacity>
        <ErrorModal
          visible={isErrorModalVisible}
          leftButtonText='Intentar luego'
          rightButtonText='Reintentar'
          title="¡Hubo un problema!"
          message="No se pudo registrar la cuenta de usuario :("
          showButton
          onLeftPress={() => setIsErrorModalVisible(false)}
          onRightPress={handleCloseModal}
        />
      </BodyContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  errorButtonText: {
    color: '#FF0000',
    marginTop: 20,
    fontWeight: 'bold',
  },
});
