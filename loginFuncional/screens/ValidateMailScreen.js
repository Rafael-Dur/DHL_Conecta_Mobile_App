import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import HeaderContainer from '../components/HeaderContainer';
import BodyContainer from '../components/BodyContainer';
import SuccessModal from '../components/SuccessModal';
import { COLORS, FONT_SIZES } from '../constants/constants';
import ClickeableText from '../components/ClickeableText';
import { requestOtp } from '../features/auth/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorModal from '../components/ErrorModal';
import { ActivityIndicator } from 'react-native-paper';


const ValidateMailScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [responseMessage, setResponseMessage] = React.useState('');
  const [isSuccessModalVisible, setIsSuccessModalVisible] = React.useState(false);
  const { code, message, success, errorMsg ,loading } = useSelector((state) => state.account);
  const [isErrorModalVisible, setIsErrorModalVisible] = React.useState(false);

//  React.useEffect(() => {
  //  if (success && code) {
    //  console.log('Código recibido:', code);
     // navigation.navigate('Security_Code');
   // }
 // }, [success, code, navigation]);

  // Validación del correo electrónico
  const validateEmail = (email) => /^[\w.-]+@(gmail|hotmail|yahoo)\.com$/.test(email);

  const handleCloseModal = () => {
    setIsErrorModalVisible(false);
    setIsSuccessModalVisible(false);
  };
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
    const validateData = {
      email: email,
    };
    dispatch(requestOtp(validateData))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled' && success) {
          setResponseMessage(code || 'Codigo enviado!');
          success && console.log('Email: ', email, 'Code: ', code, message);
          //      setIsSuccessModalVisible(true);
        } else {
          const errorMsg = action.payload?.message || 'Error';
          setResponseMessage(responseMessage);
          setIsErrorModalVisible(true);
        }
      });



    navigation.navigate('Security_Code');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderContainer>
        <Header title="Ingrese su correo" title2="electrónico" />
      </HeaderContainer>
      <BodyContainer>


        <BackButton onPress={() => navigation.navigate('Login')} />

        {/* Etiqueta para el Input */}
        <Text style={styles.label}>Ingrese su correo</Text>

        <InputField
          placeholder="Correo electrónico"
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
      {/* Modales */}
      <SuccessModal
        visible={isSuccessModalVisible}
        title="¡Éxito!"
        subtitle={responseMessage}
        onClose={handleCloseModal}
      />
      <ErrorModal
        visible={isErrorModalVisible}
        title="¡Hubo un error!"
        subtitle="No se pudo actualizar la contraseña."
        message={errorMsg}
        onClose={handleCloseModal}
      />
      <View style={styles.container}>
        {/* Resto del contenido */}
        {loading && <ActivityIndicator size="large" color={COLORS.red} />}
      </View>
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
