// components/BackButton.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT_SIZES } from '../constants/constants';

const BackButton = () => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={COLORS.red} />
            <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    backButton: {
        backgroundColor: COLORS.white,
        maxHeight: 40,
        maxWidth: 350,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 30,
        //paddingRight: 45,
        alignSelf: 'flex-end',
    },

    backText: {

        flexDirection: 'row',
        alignItems: 'flex-end',
        //color: COLORS.red,
        //fontSize: 14,
        //fontWeight: 'bold',
        fontFamily: 'Delivery2',
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
    },
});

export default BackButton;
