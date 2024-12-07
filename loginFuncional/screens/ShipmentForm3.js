import React, { useState, useEffect } from 'react';
import {
    ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView,
    Platform,
} from 'react-native';
import InputField from '../components/InputField';
import BodyContainer from '../components/BodyContainer';
import { COLORS, FONT_SIZES } from '../constants/constants';
import DropDownPicker from 'react-native-dropdown-picker';
import InternalHeader from "../components/InternalHeader";
import ClickeableText from '../components/ClickeableText';
import ButtonGroup from '../components/ButtonGroup';
//import { useNavigation } from '@react-navigation/native';
import { BoxType } from '../constants/enums';
import { useDispatch, useSelector } from 'react-redux';
import { updateShipmentField, shipmentBox } from "../features/Shipments/ShipmentSlice";
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../components/ProgressBar';

const { width, height } = Dimensions.get('window'); // Dimensiones de la pantalla

const ShipmentForm3 = ({ navigation }) => {
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
    // const navigation = useNavigation();
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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <InternalHeader showBackButton={true} style={styles.header} />
                    <BodyContainer isGrayBackground={true}>
                        <Text style={styles.title}>¿Cómo lo envías?</Text>

                        {shipmentPackageType === 1 ? (
                            <ProgressBar currentStep={3} totalSteps={6} />
                        ) : (
                            <ProgressBar currentStep={3} totalSteps={5} />
                        )}

                        <Text style={styles.subtitle}>Ingresa las características del embalaje</Text>

                        <View style={styles.row2}>
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
                            {shipmentPackageType === 1 ? (<ClickeableText clickeableText="¿No tienes caja?" styleType="link" />) : null}
                        </View>

                        {shipmentPackageType === 2 && (
                            <View style={styles.row3}>
                                <Text style={styles.sectionLabel}>Tipo de documento:   </Text>
                                <DropDownPicker
                                    open={isDocumentTypeDropdownOpen}
                                    value={documentType}
                                    items={[
                                        { label: 'Documentos', value: 'documentos' },
                                        { label: 'Pasaportes', value: 'pasaportes' },
                                    ]}
                                    setOpen={setIsDocumentTypeDropdownOpen}
                                    setValue={setDocumentType}
                                    style={styles.dropdown2}
                                    dropDownContainerStyle={styles.dropdownContainer2}
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
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#FFFFFF",

    },
    keyboardAvoidingView: {
        flex: 1,

    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: COLORS.gray,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    title: {
        fontFamily: "Delivery", // Fuente personalizada principal
        fontSize: 24,
        textAlign: "center",
        marginVertical: 10,
        width: '100%',
        maxWidth: 350,
    },
    subtitle: {
        fontFamily: "Delivery2", // Fuente personalizada secundaria
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
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
        width: '31%',
        //maxWidth: 350,
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '100%',
        //maxWidth: 350,
    },
    row3: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: '53%',
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
        maxWidth: 80,
        marginBottom: 15,
    },
    dropdownContainer: {
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        maxWidth: 80, // Tamaño del contenedor del dropdown
    },
    dropdown2: {
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        justifyContent: "center",
        paddingHorizontal: 10,
        maxWidth: 150,
        marginBottom: 15,
    },
    dropdownContainer2: {
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: 5,
        backgroundColor: COLORS.white,
        maxWidth: 150, // Tamaño del contenedor del dropdown
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
