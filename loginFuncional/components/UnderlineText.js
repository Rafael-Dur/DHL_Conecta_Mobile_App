// components/UnderlineText.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UnderlineText = ({ title, navigateTo }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
            <Text style={styles.UnderlineText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    UnderlineText: {
        color: '#0000FF',
        marginTop: 20,
        textDecorationLine: 'underline',
    },
});

export default UnderlineText;
