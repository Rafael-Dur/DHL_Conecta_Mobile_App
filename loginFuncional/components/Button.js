import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ onPress, title, styleType }) => {
  const styles = getStyles(styleType);

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (styleType) => {
  switch (styleType) {
    case 'outlined':
      return StyleSheet.create({
        button: {
          backgroundColor: '#FFFFFF',
          borderColor: '#FF0000',
          borderWidth: 1,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginTop: 20,
          width: '80%',
          maxHeight: 40,
          maxWidth: 350,
        },
        buttonText: {
          color: '#FF0000',
          fontSize: 16,
          fontWeight: 'bold',

        },
      });
    default:
      return StyleSheet.create({
        button: {
          backgroundColor: '#FF0000',
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 5,
          marginTop: 20,
          width: '80%', 
          maxHeight: 40,
          maxWidth: 350,
          alignItems: 'center',
          justifyContent: 'center',
        },
        buttonText: {
          color: '#FFFFFF',
          fontSize: 16,
          fontWeight: 'bold',
        },
      });
  }
};

export default Button;