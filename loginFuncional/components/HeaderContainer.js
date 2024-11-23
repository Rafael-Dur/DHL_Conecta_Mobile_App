import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants/constants';

export default function HeaderContainer({ children }) {
  return <View style={styles.headerContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    width: '80%',
    backgroundColor: COLORS.white,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,

  },
});
