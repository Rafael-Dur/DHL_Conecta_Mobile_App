import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/constants';


const Checkbox = ({ value, onChange }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.checkbox, value && styles.checked]}
                onPress={() => onChange(!value)}
            >
                {value && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: COLORS.black,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checked: {
        backgroundColor: COLORS.red,
    },
    checkmark: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
});

export default Checkbox;
