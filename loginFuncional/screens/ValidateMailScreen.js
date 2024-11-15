import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';


const ValidateMailScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('Security_Code');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header title="Ingrese su correo" title2={"electrónico"} />

        <BackButton onPress={() => { navigation.navigate('Login') }} />

        <InputField
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Button
          title="Continuar"
          onPress={handleContinue}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  scrollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    paddingTop: 70,
    paddingLeft: 70,
    paddingRight: 70,
    width: '100%',
    //marginLeft: 10,
    //marginRight: 10,
  },

});

export default ValidateMailScreen;
