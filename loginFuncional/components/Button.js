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
          paddingHorizontal: 10,
          borderRadius: 7,
          marginTop: 20,
          width: '100%',
          maxHeight: 40,
          maxWidth: 800,
          alignItems: 'center',
          justifyContent: 'center',
          outlineColor: COLORS.red,
          marginRight: 25,
          marginLeft: 25,

        },
        buttonText: {
          color: COLORS.red,
          fontSize: 14,
          fontWeight: 'bold',
        },
      });
    case 'small':
      return StyleSheet.create({
        button: {
          backgroundColor: COLORS.red,
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 7,
          marginTop: 20,
          width: '100%',
          maxHeight: 40,
          maxWidth: 40,
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginLeft: 25,

        },
        buttonText: {
          color: COLORS.white,
          fontSize: 16,
          fontWeight: 'bold',
          alignContent: 'center',
        },
      });
    default:
      return StyleSheet.create({
        button: {
          backgroundColor: COLORS.red,
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 7,
          marginTop: 20,
          width: '100%',
          maxHeight: 40,
          maxWidth: 350,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 25,
          marginLeft: 25,
        },
        buttonText: {
          color: COLORS.white,
          fontSize: 16,
          fontWeight: 'bold',
          alignContent: 'center',
        },
      });
  }
};

export default Button;