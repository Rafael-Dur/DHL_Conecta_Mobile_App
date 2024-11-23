// components/BackButton.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT_SIZES } from '../constants/constants';

const BackButton = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="chevron-back" size={24} color={COLORS.red} />
                <Text style={styles.backText}>Volver</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {

        //marginBottom: 30,
        alignSelf: 'center',
        width: '100%',
        maxWidth: 350,
    },
    backButton: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30,

    },

    backText: {

        flexDirection: 'row',
        alignItems: 'flex-end',
        color: COLORS.black,
        fontFamily: 'Delivery2',
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
    },
});

export default BackButton;
