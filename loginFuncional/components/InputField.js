// components/InputField.js
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function InputField({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  iconName,
  setSecureTextEntry,
}) {
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
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    width: '100%',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    maxHeight: 40,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  iconContainer: {
    padding: 5,
  },

});
