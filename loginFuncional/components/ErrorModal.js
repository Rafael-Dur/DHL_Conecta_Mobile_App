import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/constants';
import ButtonGroup from './ButtonGroup';

const ErrorModal = ({
  visible,
  onClose,
  title,
  message,
  leftButtonText,
  rightButtonText,
  onLeftPress,
  onRightPress,
  showButton,
}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        {/* Botón de cierre en la esquina superior derecha */}
        
        {!showButton ? <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
          <Ionicons name="close" size={24} color="gray" />
        </TouchableOpacity> : null}


        <View style={styles.iconContainer}>
          <Ionicons name="warning-sharp" size={80} color={COLORS.yellow} />
        </View>

        <Text style={styles.errorTitle}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        {showButton && (
          <ButtonGroup
            leftButtonTitle={leftButtonText}
            onLeftPress={onLeftPress}
            leftStyleType="outlined"
            rightButtonTitle={rightButtonText}
            onRightPress={onRightPress}
          />)}
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    height: '95%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconContainer: {
    marginBottom: 20,

  },
  errorTitle: {
    fontFamily: 'Delivery',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontFamily: 'Delivery2',
    fontSize: 30,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    width: '80%',
    maxWidth: 800,


  },
});

export default ErrorModal;
