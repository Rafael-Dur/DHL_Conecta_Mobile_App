import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES } from '../constants/constants';
import Button from './Button';
import BodyContainer from './BodyContainer';



const SuccessModal = ({ visible, onClose, title, subtitle, message, showButton = true }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        {/* Botón de cierre en la esquina superior derecha */}
        <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
          <Ionicons name="close" size={24} color="gray" />
        </TouchableOpacity>

        <View style={styles.modalInternal}>

          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#4caf50" />
          </View>

          <Text style={styles.successTitle}>{title}</Text>
          <Text style={styles.successSubTitle}>{subtitle}</Text>
          <Text style={styles.message}>{message}</Text>

          {showButton && (
            <Button title="Cerrar" onPress={onClose} ></Button>
          )}
        </View>
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
  modalInternal: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'

  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  iconContainer: {
    marginBottom: 40,

  },
  successTitle: {
    fontFamily: 'Delivery',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    flexWrap: 'wrap',
    maxWidth: '80%',
  },
  successSubTitle: {
    fontFamily: 'Delivery2',
    fontSize: 30,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    width: '80%',
  },
  message: {
    fontFamily: 'Delivery2',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.red,
    maxWidth: '80%',
    flexWrap: 'wrap',

  },
});

export default SuccessModal;
