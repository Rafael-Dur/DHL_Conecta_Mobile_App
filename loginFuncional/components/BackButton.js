// components/BackButton.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="red" />
            <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        //marginLeft: 260,
        alignSelf: 'flex-end',
    },
    backText: {
        color: 'red',
        fontSize: 16,
        marginLeft: 5,
    },
});

export default BackButton;
