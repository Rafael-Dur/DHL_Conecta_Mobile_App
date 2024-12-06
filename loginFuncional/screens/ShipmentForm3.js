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
import { BoxType } from '../constants/enums';
import { useDispatch, useSelector } from 'react-redux';
import { updateShipmentField ,shipmentBox } from "../features/Shipments/ShipmentSlice";
import ProgressBar from '../components/ProgressBar';
//import { shipmentBox } from '../features/Shipments/ShipmentSlice';


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
    const [selectedButton, setSelectedButton] = useState(null);
    const dispatch = useDispatch();





    const handlePress = (buttonId) => {
        setSelectedButton(buttonId);
    };

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

    // Actualizar shipmentBox en el store
    const handleStore = () => {
        dispatch(
            updateShipmentField({
                key: "shipmentBox",
                value: {
                    boxType: BoxType.Box, // Por ejemplo, para tipo de caja
                    length: parseFloat(length || 3),
                    width: parseFloat(width || 3),
                    height: parseFloat(height || 3),
                    shipmentPackageUnit: dimensionUnit === "cm" ? 1 : 2, // 1 = cm, 2 = in
                    weight: parseFloat(weight || 3),
                    weightUnit: weightUnit === "kg" ? 1 : 2, // 1 = kg, 2 = lb
                },
            })
        );
    };
    const handleNextButton = () => {
        handleStore();
        
    console.log("DAtos de paquete:", shipmentBox);
        navigation.navigate("ShipmentForm4");
    };

    return (
        <View style={styles.container}>
            <InternalHeader />
            <Text style={styles.title}>¿Cómo lo envías?</Text>
            <Text style={styles.subtitle}>Ingresa las características del embalaje</Text>
            <BodyContainer>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[
                            styles.card,
                            selectedButton === 1 && styles.selectedButton,
                        ]}
                        onPress={() => handlePress(1)}
                    >
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
                    onRightPress={() => handleNextButton()}
                />
            </BodyContainer>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.gray,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: "Delivery", // Fuente personalizada principal
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 20,
        color: COLORS.black,
        fontSize: FONT_SIZES.large,
        width: '100%',
        maxWidth: 350,
    },
    subtitle: {
        fontFamily: "Delivery2", // Fuente personalizada secundaria
        marginBottom: 30,
        marginTop: 20,
        color: COLORS.black,
        fontSize: FONT_SIZES.medium,
        width: '100%',
        maxWidth: 350,
    },
    selectedButton: {
        borderColor: "#C00",
        borderWidth: 2,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
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
        fontFamily: "Delivery", // Fuente personalizada para títulos
        fontSize: 16,
        color: "#C00",
        marginBottom: 5,
    },
    boxButton: {
        backgroundColor: COLORS.gray,
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    boxText: {
        fontFamily: "Delivery", // Fuente personalizada para botones
        fontSize: FONT_SIZES.medium,
    },
    sectionLabel: {
        fontFamily: "Delivery", // Fuente personalizada para etiquetas
        fontSize: FONT_SIZES.medium,
        marginBottom: 25,
    },
    infoIcon: {
        fontFamily: "Delivery2", // Fuente secundaria para íconos
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
        fontFamily: "Delivery2", // Fuente personalizada en el dropdown
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
        fontFamily: "Delivery2", // Fuente secundaria para información adicional
        color: COLORS.grey,
        fontSize: 12,
        marginBottom: 20,
    },
    costText: {
        fontFamily: "Delivery", // Fuente personalizada para texto de costos
        fontSize: FONT_SIZES.medium,
        textAlign: 'center',
        marginTop: 20,
    },
    costAmount: {
        fontFamily: "Delivery", // Fuente personalizada para montos
        fontSize: 30,
        textAlign: 'center',
        color: COLORS.black,
    },
});


export default ShipmentForm3;