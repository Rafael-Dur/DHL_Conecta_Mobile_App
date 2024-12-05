import React, { useState, useEffect } from 'react';
import { ScrollView, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import InputField from '../components/InputField';
import BodyContainer from '../components/BodyContainer';
import { COLORS, FONT_SIZES } from '../constants/constants';
import DropDownPicker from 'react-native-dropdown-picker';
import InternalHeader from "../components/InternalHeader";
import ClickeableText from '../components/ClickeableText';
import ButtonGroup from '../components/ButtonGroup';
import { useNavigation } from '@react-navigation/native';

const ShipmentForm3 = () => {
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [dimensionUnit, setDimensionUnit] = useState("cm");
    const [weightUnit, setWeightUnit] = useState("kg");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isWeightDropdownOpen, setIsWeightDropdownOpen] = useState(false);
    const [cost, setCost] = useState(0);
    const navigation = useNavigation();
    const packageIcon = require("../assets/package-icon.png");

    // Función para calcular el costo del envío
    const calculateShippingCost = () => {
        let lengthInCm = parseFloat(length || 0);
        let widthInCm = parseFloat(width || 0);
        let heightInCm = parseFloat(height || 0);
        let weightInKg = parseFloat(weight || 0);

        // Convertir dimensiones a cm si están en pulgadas
        if (dimensionUnit === "in") {
            lengthInCm *= 2.54;
            widthInCm *= 2.54;
            heightInCm *= 2.54;
        }

        // Convertir peso a kg si está en libras
        if (weightUnit === "lb") {
            weightInKg *= 0.453592;
        }

        // Calcular peso volumétrico en kg
        const volumetricWeight = (lengthInCm * widthInCm * heightInCm) / 5000;

        // Determinar el peso aplicable y calcular el costo
        const applicableWeight = Math.max(volumetricWeight, weightInKg);
        const calculatedCost = applicableWeight * 6.25; // Tarifa por kg (ajustar según necesidad)
        setCost(calculatedCost.toFixed(2)); // Actualizar el costo con 2 decimales
    };

    // Recalcular el costo cada vez que cambien las dimensiones, el peso o las unidades
    useEffect(() => {
        calculateShippingCost();
    }, [length, width, height, weight, dimensionUnit, weightUnit]);

    return (
        <View style={styles.container}>
            <InternalHeader />
            <Text style={styles.title}>¿Cómo lo envías?</Text>
            <Text style={styles.subtitle}>Ingresa las características del embalaje</Text>
            <BodyContainer>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.card}>
                        <Image source={packageIcon} style={styles.cardIcon} />
                        <Text style={styles.cardTitle}>Caja</Text>
                    </TouchableOpacity>
                    <ClickeableText clickeableText="¿No tienes caja?" styleType="link" />
                </View>

                <Text style={styles.sectionLabel}>Ingresa las medidas:</Text>
                <View style={styles.row}>
                    <InputField
                        placeholder="Largo"
                        value={length}
                        onChangeText={setLength}
                        keyboardType="numeric"
                        styleType="small"
                    />
                    <InputField
                        placeholder="Ancho"
                        value={width}
                        onChangeText={setWidth}
                        keyboardType="numeric"
                        styleType="small"
                    />
                    <InputField
                        placeholder="Alto"
                        value={height}
                        onChangeText={setHeight}
                        keyboardType="numeric"
                        styleType="small"
                    />
                    <View style={styles.dropdownWrapper}>
                        <DropDownPicker
                            open={isDropdownOpen}
                            value={dimensionUnit}
                            items={[
                                { label: 'cm', value: 'cm' },
                                { label: 'in', value: 'in' },
                            ]}
                            setOpen={setIsDropdownOpen}
                            setValue={setDimensionUnit}
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                        />
                    </View>
                </View>

                <Text style={styles.sectionLabel}>¿Cuánto pesa?</Text>
                <View style={styles.row}>
                    <InputField
                        placeholder="Peso"
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType="numeric"
                        styleType="small"
                    />
                    <View style={styles.dropdownWrapper}>
                        <DropDownPicker
                            open={isWeightDropdownOpen}
                            value={weightUnit}
                            items={[
                                { label: 'kg', value: 'kg' },
                                { label: 'lb', value: 'lb' },
                            ]}
                            setOpen={setIsWeightDropdownOpen}
                            setValue={setWeightUnit}
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                        />
                    </View>
                </View>

                <Text style={styles.costText}>
                    Costo de envío por: {weight || 0} {weightUnit}
                </Text>
                <Text style={styles.costAmount}>USD {cost}</Text>

                <ButtonGroup
                    leftButtonTitle="Atrás"
                    onLeftPress={() => navigation.goBack()}
                    leftStyleType="outlined"
                    rightButtonTitle="Siguiente"
                    onRightPress={() => navigation.navigate('ShipmentForm4')}
                />
            </BodyContainer>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 20,
        fontWeight: 'bold',
        color: COLORS.black,
        fontSize: FONT_SIZES.large,
        width: '100%',
        maxWidth: 350,
    },
    subtitle: {
        //alignSelf: 'flex-end',
        marginBottom: 30,
        marginTop: 20,
        color: COLORS.black,
        fontSize: FONT_SIZES.medium,
        width: '100%',
        maxWidth: 350,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        //maxWidth: 350,
    },
    card: {
        backgroundColor: "#fff",
        padding: "5%",
        borderRadius: 10,
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    cardIcon: {
        width: 120,
        height: 120,
        marginBottom: 10,
        resizeMode: "contain",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#C00",
        marginBottom: 5,
    },

    boxButton: {
        backgroundColor: COLORS.lightGray,
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    boxText: {
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
    },
    sectionLabel: {
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    infoIcon: {
        fontSize: FONT_SIZES.small,
        color: COLORS.grey,
    },

    dropdownWrapper: {
        marginBottom: 15,
        backgroundColor: COLORS.white,
        maxWidth: 100, // Tamaño del contenedor del dropdown
        maxHeight: 50,
        zIndex: 10, // Asegura que el dropdown no quede oculto detrás de otros componentes
    },
    dropdown: {
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        maxWidth: 100, // Tamaño del contenedor del dropdown
    },
    additionalInfo: {
        color: COLORS.grey,
        fontSize: 12,
        marginBottom: 20,
    },
    costText: {
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    costAmount: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS.black,
    },
});

export default ShipmentForm3;
