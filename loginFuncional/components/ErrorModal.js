import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ErrorModal = ({ visible, onClose,title, message, showButton = true }) => (
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

        {/* Icono de tick verde */}
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#4caf50" />
        </View>
        
        {/* Mensaje personalizado */}
        <Text style={styles.errorTitle}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        
        {/* Botón opcional, basado en la prop `showButton` */}
        {showButton && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        )}
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
    
  },
  closeButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    maxHeight: 40,
    maxWidth: 350,
    alignItems: 'center',
  },
  buttonText: {    
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Delivery',
  },
});

export default ErrorModal;
