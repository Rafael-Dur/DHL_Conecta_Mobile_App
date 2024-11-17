// components/BackButton.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/constants';

const BackButton = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={14} color={COLORS.red} />
            <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex :1,
        alignItems: 'center',
        marginVertical: 50, 
        width: '100%',
      },
    backButton: {
        alignItems: 'flex-end',
        backgroundColor: COLORS.white,
        width: '100%',
        //marginBottom: 15,
        maxHeight: 40,
        maxWidth: 350,
      },
    backText: {
        
        flexDirection: 'row',
        alignItems: 'flex-end',
        color: COLORS.red,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default BackButton;
