import React, { useState, useEffect } from 'react';
import { FlatList, ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
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
import { updateShipmentField, shipmentBox } from "../features/Shipments/ShipmentSlice";
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window'); // Dimensiones de la pantalla

const ShipmentForm3 = () => {
    const [length, setLength] = useState('');
    const [widthVal, setWidth] = useState('');
    const [heightVal, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [applicableWeight, setApplicableWeight] = useState('');
    const [dimensionUnit, setDimensionUnit] = useState("cm");
    const [weightUnit, setWeightUnit] = useState("kg");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isWeightDropdownOpen, setIsWeightDropdownOpen] = useState(false);
    const [documentType, setDocumentType] = useState("documentos");
    const [isDocumentTypeDropdownOpen, setIsDocumentTypeDropdownOpen] = useState(false);
    const [cost, setCost] = useState(0);
    const navigation = useNavigation();
    const packageIcon = require("../assets/package-icon.png");
    const envelopeIcon = require("../assets/document-icon.png");
    const { shipmentBox, shipmentPackageType } = useSelector((state) => state.shipments);
    const [selectedButton, setSelectedButton] = useState(null);
    const dispatch = useDispatch();

    const handlePress = (buttonId) => {
        setSelectedButton(buttonId);
    };

    const calculateShippingCost = () => {
        let lengthInCm = parseFloat(length || 0);
        let widthInCm = parseFloat(widthVal || 0);
        let heightInCm = parseFloat(heightVal || 0);
        let weightInKg = parseFloat(weight || 0);

        if (dimensionUnit === "in") {
            lengthInCm *= 2.54;
            widthInCm *= 2.54;
            heightInCm *= 2.54;
        }

        if (weightUnit === "lb") {
            weightInKg *= 0.453592;
        }

        const volumetricWeight = (lengthInCm * widthInCm * heightInCm) / 5000;

        setApplicableWeight(Math.max(volumetricWeight, weightInKg));
        const calculatedCost = applicableWeight * 6.25;
        setCost(calculatedCost.toFixed(2));
    };

    useEffect(() => {
        calculateShippingCost();
    }, [length, widthVal, heightVal, weight, dimensionUnit, weightUnit]);

    const handleStore = () => {
        dispatch(
            updateShipmentField({
                key: "shipmentBox",
                value: {
                    boxType: BoxType.Box,
                    length: parseFloat(length || 3),
                    width: parseFloat(widthVal || 3),
                    height: parseFloat(heightVal || 3),
                    shipmentPackageUnit: dimensionUnit === "cm" ? 1 : 2,
                    weight: parseFloat(weight || 3),
                    weightUnit: weightUnit === "kg" ? 1 : 2,
                },
            })
        );
    };

    const handleNextButton = () => {
        handleStore();
        console.log("Datos de paquete:", shipmentBox);
        shipmentPackageType === 2 ? navigation.navigate("ShipmentForm5") : navigation.navigate("ShipmentForm4");
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <InternalHeader showBackButton={true} style={styles.header} />
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}>¿Cómo lo envías?</Text>
                    <Text style={styles.subtitle}>Ingresa las características del embalaje</Text>
                    <BodyContainer isGrayBackground={true}>
                        <View style={styles.row}>
                            <TouchableOpacity
                                style={[
                                    styles.card,
                                    selectedButton === 1 && styles.selectedButton,
                                ]}
                                onPress={() => handlePress(1)}
                            >
                                <Image
                                    source={shipmentPackageType === 2 ? envelopeIcon : packageIcon}
                                    style={styles.cardIcon}
                                />
                                <Text style={styles.cardTitle}>
                                    {shipmentPackageType === 2 ? "Sobre" : "Caja"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {shipmentPackageType === 2 && (
                            <View style={styles.row}>
                                <Text style={styles.sectionLabel}>Tipo de documento:</Text>
                                <DropDownPicker
                                    open={isDocumentTypeDropdownOpen}
                                    value={documentType}
                                    items={[
                                        { label: 'Documentos', value: 'documentos' },
                                        { label: 'Pasaportes', value: 'pasaportes' },
                                    ]}
                                    setOpen={setIsDocumentTypeDropdownOpen}
                                    setValue={setDocumentType}
                                    style={styles.dropdown}
                                    dropDownContainerStyle={styles.dropdownContainer}
                                />
                            </View>
                        )}

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
                                value={widthVal}
                                onChangeText={setWidth}
                                keyboardType="numeric"
                                styleType="small"
                            />
                            <InputField
                                placeholder="Alto"
                                value={heightVal}
                                onChangeText={setHeight}
                                keyboardType="numeric"
                                styleType="small"
                            />
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

                        <Text style={styles.sectionLabel}>¿Cuánto pesa?</Text>
                        <View style={styles.row}>
                            <InputField
                                placeholder="Peso"
                                value={weight}
                                onChangeText={setWeight}
                                keyboardType="numeric"
                                styleType="small"
                            />
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

                        <Text style={styles.costText}>
                            Costo de envío por: {applicableWeight || 0} {weightUnit}
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
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.gray,
    },
    scrollContainer: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.02,
    },
    header: {
        width: "100%", // Ocupa todo el ancho de la pantalla
    },
    title: {
        fontSize: FONT_SIZES.large,
        textAlign: "center",
        marginBottom: 10,
        color: COLORS.primary,
    },
    subtitle: {
        fontSize: FONT_SIZES.medium,
        textAlign: "center",
        marginBottom: 15,
        color: COLORS.text,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    card: {
        flex: 1,
        alignItems: "center",
        padding: height * 0.02,
        backgroundColor: COLORS.lightGray,
        borderRadius: 10,
        margin: 5,
    },
    selectedButton: {
        borderColor: COLORS.primary,
        borderWidth: 2,
    },
    dropdown: {
        flex: 1,
        maxWidth: 70,
        maxHeight: 50,
    },
    costText: {
        textAlign: "center",
        fontSize: FONT_SIZES.medium,
        color: COLORS.text,
    },
    costAmount: {
        textAlign: "center",
        fontSize: FONT_SIZES.large,
        fontWeight: "bold",
        color: COLORS.primary,
        marginVertical: 5,
    },
});

export default ShipmentForm3;
