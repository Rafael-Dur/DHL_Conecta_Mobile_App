import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import ClickeableText from '../components/ClickeableText';
import HeaderContainer from '../components/HeaderContainer';
import BodyContainer from '../components/BodyContainer';
import { useSelector } from 'react-redux';
import { COLORS, FONT_SIZES } from '../constants/constants';

const SecurityCodeScreen = () => {
  const storedCode = useSelector((state) => state.account.code); // Código almacenado en Redux
  const [securityCode, setSecurityCode] = useState('');
  const navigation = useNavigation();

  // Sincroniza el código almacenado con el estado local
  useEffect(() => {
    if (storedCode) {
      setSecurityCode(storedCode);
    }
  }, [storedCode]);

  // Validación del código de seguridad
  const validateSecurityCode = (code) => /^\d{6}$/.test(code);

  const handleContinue = () => {
    if (!securityCode.trim()) {
      return Alert.alert('Error', 'Por favor, ingrese el código de seguridad.');
    }

    if (!validateSecurityCode(securityCode)) {
      return Alert.alert(
        'Código inválido',
        'El código debe contener exactamente 6 dígitos numéricos.'
      );
    }

    if (securityCode !== storedCode) {
      return Alert.alert('Error', 'El código ingresado no es correcto.');
    }

    navigation.navigate('Reset_Password');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <HeaderContainer>
        <Header title="Ingrese código" title2="de seguridad" />
      </HeaderContainer>

      <BodyContainer>
        <BackButton onPress={() => navigation.goBack()} />
        <InputField
          placeholder="Ingrese el código aquí"
          value={securityCode}
          onChangeText={setSecurityCode}
          keyboardType="numeric"
        />

        <Text style={styles.instructionText}>
          Accede a tu correo electrónico{"\n"}para obtener el código de recuperación.
        </Text>

        <Button title="Continuar" onPress={handleContinue} />

        <ClickeableText
          navigation={navigation}
          onPress={() => navigation.navigate('Support')}
          title="¿Problemas?"
          clickeableText="Contáctanos"
          styleType="link"
        />
      </BodyContainer>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    flex: 1,
  },
  instructionText: {
    color: COLORS.red,
    textAlign: 'center',
    fontSize: FONT_SIZES.medium,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default SecurityCodeScreen;
