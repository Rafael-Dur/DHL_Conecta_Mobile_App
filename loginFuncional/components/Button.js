import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/constants';

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
          backgroundColor: COLORS.white,
          borderColor: COLORS.red,
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
          color: COLORS.red,
          fontSize: 16,
          fontWeight: 'bold',

        },
      });
    default:
      return StyleSheet.create({
        button: {
          backgroundColor: COLORS.red,
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
          color: COLORS.white,
          fontSize: 16,
          fontWeight: 'bold',
        },
      });
  }
};

export default Button;