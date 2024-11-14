import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Button from '../components/Button';
import Header from '../components/Header';
import InputField from '../components/InputField';
import ClickeableText from '../components/ClickeableText';
import ErrorModal from '../components/ErrorModal';


export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const handleLogin = () => {
    setIsErrorModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header title="Bienvenido a" title2={"Envíos DHL Conecta"} />
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
        title=""
        clickeableText="¿Olvidó la contraseña?"
        styleType="link"
        singleLink
      />
      <Button title="Ingresar" onPress={() => { /* handle login */ }} />
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
        onLeftPress={() => setIsErrorModalVisible(false)} 
        onRightPress={() => setIsErrorModalVisible(false)}
        title="¡Hubo un problema!"
        message="No se pudo registrar la cuenta de usuario :("
        showButton={true}
      />
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
  },
  registerText: {
    color: '#0000FF',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});