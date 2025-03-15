import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '../constants/constants';

const MenuItem = ({ icon, title, onPress, selected }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <MaterialIcons name={icon} size={24} color={COLORS.black} style={styles.menuIcon} />
    <Text style={styles.menuItemText}>{title}</Text>
    {selected && (
      <MaterialIcons name="check" size={24} color={COLORS.red} style={styles.checkIcon} />
    )}
  </TouchableOpacity>
);

const DropdownMenu = ({ visible, onClose, selectedOption = 'Ayuda', style, navigation }) => {
  if (!visible) return null;

  const handleMenuItemPress = (screen) => {
    onClose();
    navigation.navigate(screen);
  };

  return (
    <View style={[styles.container, style]}>
      <MenuItem 
        icon="person" 
        title="Cuenta" 
        onPress={() => handleMenuItemPress('AccountScreen')} 
        selected={selectedOption === 'Cuenta'}
      />
      <MenuItem 
        icon="history" 
        title="Historial" 
        onPress={() => handleMenuItemPress('History')} 
        selected={selectedOption === 'Historial'}
      />
      <MenuItem 
        icon="help" 
        title="Ayuda" 
        onPress={() => handleMenuItemPress('Help')} 
        selected={selectedOption === 'Ayuda'}
      />
      <MenuItem 
        icon="logout" 
        title="Cerrar sesión" 
        onPress={() => handleMenuItemPress('Login')} 
        selected={selectedOption === 'Cerrar sesión'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '100%',
    right: 0,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 200,
    marginBottom: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontFamily: 'Delivery2',
    fontSize: 16,
    color: COLORS.black,
  },
  checkIcon: {
    marginLeft: 'auto',
  },
});

export default DropdownMenu; 