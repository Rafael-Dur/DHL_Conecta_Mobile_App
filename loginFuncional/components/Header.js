// Header.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = ({ title, subtitle , title2 }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={require('../assets/LogoDHL.png')} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title2}>{title2}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    marginBottom: 20,
    maxHeight: "auto",
    maxWidth: "auto",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});

export default Header;