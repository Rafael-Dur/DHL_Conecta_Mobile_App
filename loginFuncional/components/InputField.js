// components/InputField.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/constants';

export default function InputField({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  iconName,
  setSecureTextEntry,
  styleType,
}) {
  const styles = styleType === 'small' ? smallStyles : defaultStyles;

  return (
    <View style={styles.inputContainer}>
      {iconName && <Ionicons name={iconName} size={24} color="gray" />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
      {setSecureTextEntry && (
        <Ionicons
          name={secureTextEntry ? 'eye-off' : 'eye'}
          size={24}
          color="gray"
          onPress={() => setSecureTextEntry(!secureTextEntry)}
          marginRight={10}

        />
      )}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    width: '100%',
    //marginLeft: 20,
    //marginRight: 20,
    marginBottom: 15,
    maxHeight: 40,
    maxWidth: 350,
  },
  input: {
    flex: 1,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
  },
  iconContainer: {
    padding: 5,
  },

});

const smallStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    width: '100%',
    //marginLeft: 20,
    //marginRight: 20,
    marginBottom: 15,
    maxHeight: 50,
    maxWidth: 70,
  },
  input: {
    flex: 1,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
  },
  iconContainer: {
    padding: 5,
  },

});


