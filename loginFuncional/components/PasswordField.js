// components/TextField.js
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const PasswordField = ({ label, placeholder, value, onChangeText, secureTextEntry, rightIcon }) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#f9f9f9',
      width: '80%',
      marginLeft: 20,
      marginRight: 20,
      paddingHorizontal: "auto",
      marginBottom: 15,
      maxHeight: 40,
      maxWidth: 350,
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

export default PasswordField;
