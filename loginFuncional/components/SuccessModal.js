import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES } from '../constants/constants';


const SuccessModal = ({ visible, onClose,title,subtitle, message, showButton = true }) => (
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

        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#4caf50" />
        </View>
        
        <Text style={styles.successTitle}>{title}</Text>
        <Text style={styles.successSubTitle}>{subtitle}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.messageAditional}>{message}</Text>
        
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
  successTitle: {
    fontFamily: 'Delivery',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  successSubTitle: {
    fontFamily: 'Delivery2',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.red,
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
  messageAditional: {
    fontFamily: 'Delivery',
    fontSize: 30,
    color: '#333',
    textAlign: 'center',
    marginBomargnittom: 20,
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

export default SuccessModal;