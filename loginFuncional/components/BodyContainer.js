import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function BodyContainer({ children }) {
  return <View style={styles.bodyContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'center',
     alignItems: 'center'
  },
});
