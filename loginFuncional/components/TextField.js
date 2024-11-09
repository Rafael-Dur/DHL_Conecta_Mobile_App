import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TextField = ({ placeholder, value, onChangeText, secureTextEntry, setSecureTextEntry }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
      {secureTextEntry !== undefined && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setSecureTextEntry(!secureTextEntry)}
        >
          <Ionicons name={secureTextEntry ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: 'Delivery2',
    height: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  iconContainer: {
    padding: 5,
  },
});

export default TextField;