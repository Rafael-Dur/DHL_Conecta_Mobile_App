import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/constants';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';

const ContactModal = ({ visible, onClose }) => {
  const navigation = useNavigation();

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    navigation.goBack();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
            <Ionicons name="close" size={24} color="gray" />
          </TouchableOpacity>

          <View style={styles.modalContent}>
            <Text style={styles.title}>Contáctanos</Text>
            <Text style={styles.subtitle}>Estos son los principales medios de contacto:</Text>

            <View style={styles.contactItem}>
              <Ionicons name="mail" size={24} color={COLORS.red} />
              <Text style={styles.contactText}>uy.enviosdhiconecta@dhl.com</Text>
            </View>

            <View style={styles.contactItem}>
              <Ionicons name="logo-whatsapp" size={24} color={COLORS.red} />
              <Text style={styles.contactText}>+598 97 123 456</Text>
            </View>

            <Text style={styles.note}>
              Estaremos atentos a tus consultas, ten en cuenta la diferencia horaria del país en que te encuentres con Uruguay.
            </Text>

            <Button 
              title="Volver" 
              onPress={handleClose}
              styleType="primary"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalContent: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontFamily: 'Delivery',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  subtitle: {
    fontFamily: 'Delivery2',
    fontSize: 16,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 30,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  contactText: {
    fontFamily: 'Delivery2',
    fontSize: 16,
    marginLeft: 10,
    color: COLORS.black,
  },
  note: {
    fontFamily: 'Delivery2',
    fontSize: 14,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
});

export default ContactModal;