import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { COLORS, FONT_SIZES } from '../constants/constants';
import ClickeableText from '../components/ClickeableText';
import HeaderContainer from '../components/HeaderContainer';
import BodyContainer from '../components/BodyContainer';
import { useSelector } from 'react-redux';


const SecurityCodeScreen = () => {

  const storedCode = useSelector((state) => state.account.code);
  const [securityCode, setSecurityCode] = useState('');
  const navigation = useNavigation();



  // Validación del código de seguridad
  const validateSecurityCode = (code) => /^\d{6}$/.test(code);

  // Sincroniza el código almacenado con el estado local
  useEffect(() => {
    if (storedCode) {
      setSecurityCode(storedCode);
    }
  }, [storedCode]);

  const handleContinue = () => {
    // Validar si el campo está vacío
    if (!securityCode.trim()) {
      return Alert.alert('Error', 'Por favor, ingrese el código de seguridad.');
    }

    // Validar que el código sea numérico y tenga 6 dígitos
    if (!validateSecurityCode(securityCode)) {
      return Alert.alert(
        'Código inválido',
        'El código debe contener exactamente 6 dígitos numéricos.'
      );
    }

    // if (securityCode !== storedCode) {
    //  return Alert.alert('Error', 'El código ingresado no es correcto.');
    // }

    navigation.navigate('Reset_Password');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <HeaderContainer>
        <Header title="Ingrese código" title2={"de seguridad"} />
      </HeaderContainer>

      <BodyContainer>
        <BackButton onPress={() => navigation.navigate('Validate_Mail')} />

        <Text style={styles.label}>Código de recuperación</Text>

        <InputField
          placeholder="Ingrese el código aquí"
          value={securityCode}
          onChangeText={setSecurityCode}
          keyboardType="numeric"
        />

        <Text style={styles.instructionText}>
          Accede a tu correo electrónico{"\n"}para obtener el  código de recuperación
        </Text>

        <Button
          title="Continuar"
          onPress={handleContinue}
        />
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
  instructionText: {
    color: COLORS.red,
    textAlign: 'center',
    fontSize: FONT_SIZES.medium,
    marginTop: 10,
    marginBottom: 20,
  },
  container2: {
    //flex: 1,
    backgroundColor: '#fff',
    marginBottom: 100,
  },
});

export default SecurityCodeScreen;
