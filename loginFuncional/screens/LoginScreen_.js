import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../features/auth/authSlice';
import Button from '../components/Button';
import InputField from '../components/InputField';
import ErrorModal from '../components/ErrorModal';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    if (email && password) {
      dispatch(login({ email, password }));
    }
  };

  const handleCloseModal = () => {
    dispatch(clearError());
  };

  return (
    <View style={styles.container}>
      <InputField
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <InputField
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Ingresar" onPress={handleLogin} loading={loading} />
      {error && (
        <ErrorModal
          visible={!!error}
          title="Error"
          message={error.message || 'Error en el inicio de sesión'}
          onLeftPress={handleCloseModal}
          leftButtonText="Cerrar"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
