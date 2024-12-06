import React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';

const ButtonGroup = ({ leftButtonTitle, rightButtonTitle, onLeftPress, onRightPress, leftStyleType, rightStyleType }) => {
  return (
    <View style={styles.buttonGroup}>
      {/* Renderiza el botón izquierdo solo si tiene un título */}
      {leftButtonTitle ? (
        <Button 
          title={leftButtonTitle} 
          onPress={onLeftPress} 
          styleType={leftStyleType} 
        />
      ) : null}
      {/* Renderiza el botón derecho solo si tiene un título */}
      {rightButtonTitle ? (
        <Button 
          title={rightButtonTitle} 
          onPress={onRightPress} 
          styleType={rightStyleType} 
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    maxWidth: 150,
    marginTop: 20,
  },
});

export default ButtonGroup;
