import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { COLORS, FONT_SIZES } from '../constants/constants';

const QuantitySelector = ({ value = 1, onChange }) => {
    const [quantity, setQuantity] = useState(value);

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onChange && onChange(newQuantity);
    };

    const handleDecrease = () => {
        const newQuantity = Math.max(1, quantity - 1);
        setQuantity(newQuantity);
        onChange && onChange(newQuantity);
    };

    return (
        <View style={styles.container}>
            <Button
                title="-"
                onPress={handleDecrease}
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
            />
            <Text style={styles.quantityText}>{quantity}</Text>
            <Button
                title="+"
                onPress={handleIncrease}
                buttonStyle={styles.button}
                titleStyle={styles.buttonText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: COLORS.white, // Fondo blanco del botón
        alignItems: 'center',
        justifyContent: 'center', // Centra el contenido vertical y horizontalmente
        padding: 0, // Sin relleno para evitar desalineación
        borderWidth: 1, // Agrega un borde al botón
        borderColor: COLORS.black, // El color del borde es negro
    },
    buttonText: {
        fontSize: 16, // Tamaño de la fuente reducido para ajustarse al botón pequeño
        fontWeight: 'bold',
        color: COLORS.black, // Color del texto negro
        lineHeight: 18, // Asegura que el texto se alinee al centro del botón
        textAlign: 'center',
    },
    quantityText: {
        fontSize: 20,
        fontWeight: 'bold',
        minWidth: 20,
        textAlign: 'center',
        marginHorizontal: 5,
    },
});

export default QuantitySelector;
