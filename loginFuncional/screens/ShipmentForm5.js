import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES } from '../constants/constants';
import InternalHeader from '../components/InternalHeader';
import ButtonGroup from '../components/ButtonGroup';
import Checkbox from '../components/Checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import ProgressBar from '../components/ProgressBar';

const ShipmentForm5 = ({ navigation }) => {
    const shipments = useSelector((state) => state.shipments);

    const [checkboxStates, setCheckboxStates] = useState({
        from: false,
        to: false,
        package: false,
        items: false,
        insurance: false,
    });

    const totalShippingCost = 125;
    const insuranceCost = 15;
    const totalCost = checkboxStates.insurance
        ? totalShippingCost + insuranceCost
        : totalShippingCost;

    const handleCheckboxChange = (key) => {
        setCheckboxStates((prevState) => ({
            ...prevState,
            [key]: !prevState[key],
        }));
    };

    const canProceed = Object.keys(checkboxStates)
        .filter((key) => key !== 'insurance')
        .every((key) => checkboxStates[key]);

    const sender = shipments.sender;
    const receiver = shipments.receiver;
    const shipmentBox = shipments.shipmentBox;
    const shipmentItems = shipments.shipmentItems;
    const { shipmentPackageType } = useSelector((state) => state.shipments);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <InternalHeader showBackButton={true} />
                <View style={styles.bodyContainer}>
                    <Text style={styles.title}>Revisa y confirma antes del pago</Text>

                    {shipmentPackageType === 1 ? (
                        <ProgressBar currentStep={5} totalSteps={6} />
                    ) : (
                        <ProgressBar currentStep={4} totalSteps={5} />
                    )}

                    <View style={styles.cardContainer}>
                        {/* Sección "De" */}
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.edit}>
                                    <Text style={styles.sectionTitle}>De</Text>
                                    <Text>{sender.name}</Text>
                                    <Text>{sender.address}</Text>
                                    <Text>{`${sender.city}, ${sender.country}`}</Text>
                                    <Text>{sender.phoneNumber}</Text>
                                </View>

                                <TouchableOpacity onPress={() => navigation.navigate('ShipmentForm1')}>
                                    <MaterialIcons name="edit" size={24} color={COLORS.red} />
                                </TouchableOpacity>

                                <Checkbox
                                    value={checkboxStates.from}
                                    onChange={() => handleCheckboxChange('from')}
                                />
                            </View>
                        </View>

                        {/* Sección "Para" */}
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.edit}>
                                    <Text style={styles.sectionTitle}>Para</Text>
                                    <Text>{receiver.name}</Text>
                                    <Text>{receiver.address}</Text>
                                    <Text>{`${receiver.city}, ${receiver.country}`}</Text>
                                    <Text>{receiver.phoneNumber}</Text>
                                </View>

                                <TouchableOpacity onPress={() => navigation.navigate('ShipmentForm2')}>
                                    <MaterialIcons name="edit" size={24} color={COLORS.red} />
                                </TouchableOpacity>

                                <Checkbox
                                    value={checkboxStates.to}
                                    onChange={() => handleCheckboxChange('to')}
                                />
                            </View>
                        </View>

                        {/* Sección "Paquete" */}
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.edit}>
                                    <Text style={styles.sectionTitle}>Paquete</Text>
                                    <Text>{`Peso: ${shipmentBox.weight} ${shipmentBox.weightUnit === 1 ? 'kg' : 'lb'}`}</Text>
                                    <Text>{`Dimensiones: ${shipmentBox.length} x ${shipmentBox.width} x ${shipmentBox.height} ${shipmentBox.shipmentPackageUnit === 1 ? 'cm' : 'in'}`}</Text>
                                </View>

                                <TouchableOpacity onPress={() => navigation.navigate('ShipmentForm3')}>
                                    <MaterialIcons name="edit" size={24} color={COLORS.red} />
                                </TouchableOpacity>

                                <Checkbox
                                    value={checkboxStates.package}
                                    onChange={() => handleCheckboxChange('package')}
                                />
                            </View>
                        </View>

                        {/* Sección "Artículos" */}
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.edit}>
                                    <Text style={styles.sectionTitle}>Artículos</Text>
                                    <Text>{`Items: ${shipmentItems.length}`}</Text>
                                    <Text>{`Valor total: USD ${shipmentItems.reduce((acc, item) => acc + item.value, 0)}`}</Text>
                                </View>

                                <TouchableOpacity onPress={() => navigation.navigate('ShipmentForm4')}>
                                    <MaterialIcons name="edit" size={24} color={COLORS.red} />
                                </TouchableOpacity>

                                <Checkbox
                                    value={checkboxStates.items}
                                    onChange={() => handleCheckboxChange('items')}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Sección de seguro */}
                    <View style={styles.insuranceSection}>
                        <Text style={styles.sectionTitle}>¿Quieres asegurar este envío?</Text>
                        <View style={styles.insuranceRow}>
                            <View>
                                <Text style={styles.ensuranceText}>Envío: USD {totalShippingCost}</Text>
                                <Text style={styles.ensuranceText}>+ Seguro: USD {insuranceCost}</Text>
                            </View>
                            <Checkbox
                                value={checkboxStates.insurance}
                                onChange={() => handleCheckboxChange('insurance')}
                            />
                        </View>
                        <Text style={styles.totalText}>Total a pagar: USD {totalCost}</Text>
                    </View>

                    <ButtonGroup
                        leftButtonTitle="Atrás"
                        onLeftPress={() => navigation.goBack()}
                        leftStyleType="outlined"
                        rightButtonTitle="Siguiente"
                        onRightPress={() => {
                            if (canProceed) {
                                navigation.navigate('PaymentMethodScreen');
                            } else {
                                alert('Debes seleccionar todas las casillas.');
                            }
                        }}
                        rightDisabled={!canProceed}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.gray,
    },
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        paddingBottom: 20, // Añadir un poco de espacio para el final
    },
    bodyContainer: {
        width: '95%',
        backgroundColor: COLORS.gray,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: "Delivery",
        fontSize: FONT_SIZES.xlarge,
        color: COLORS.black,
        marginTop: 10,
        marginBottom: 10,
    },
    cardContainer: {
        width: '100%',
        marginBottom: 20,
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        width: '100%',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    edit: {
        minWidth: '80%',
    },
    sectionTitle: {
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    insuranceSection: {
        width: '100%',
    },
    insuranceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ensuranceText: {
        fontSize: FONT_SIZES.medium,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    totalText: {
        fontSize: FONT_SIZES.xlarge,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default ShipmentForm5;
