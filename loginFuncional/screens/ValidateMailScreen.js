import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import HeaderContainer from '../components/HeaderContainer';
import BodyContainer from '../components/BodyContainer';
import { COLORS, FONT_SIZES } from '../constants/constants';
import ClickeableText from '../components/ClickeableText';


const ValidateMailScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  // Validación del correo electrónico
  const validateEmail = (email) => /^[\w.-]+@(gmail|hotmail|yahoo)\.com$/.test(email);

  const handleContinue = () => {
    if (!email.trim()) {
      return Alert.alert('Error', 'El correo es obligatorio.');
    }

    if (!validateEmail(email)) {
      return Alert.alert(
        'Correo inválido',
        'El correo debe ser válido y pertenecer a dominios como gmail, hotmail o yahoo.'
      );
    }

    navigation.navigate('Security_Code');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderContainer>
        <Header title="Ingrese su correo" title2="electrónico"/>
      </HeaderContainer>
      <BodyContainer>


        <BackButton onPress={() => navigation.navigate('Login')} />

        {/* Etiqueta para el Input */}
        <Text style={styles.label}>Ingrese su correo</Text>

        <InputField
          placeholder="Ingrese su correo electrónico"
          value={email} 
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Button title="Continuar" onPress={handleContinue} />
      </BodyContainer>

      <View style={styles.container2}></View>

      <ClickeableText
          navigation={navigation}
          onPress={() => navigation.navigate(/* Pagina de soporte */)}
          title="¿Problemas?"
          clickeableText="Contáctanos"
          styleType="link"
        />

      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    alignSelf: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: FONT_SIZES.medium,
    width: '100%',
    maxWidth: 350,
  },
  container2: {
    //flex: 1,
    backgroundColor: '#fff',
    marginBottom: 150,
  }
});

export default ValidateMailScreen;
