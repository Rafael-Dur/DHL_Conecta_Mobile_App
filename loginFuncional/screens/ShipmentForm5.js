import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES } from '../constants/constants';
import InternalHeader from '../components/InternalHeader';
import BodyContainer from '../components/BodyContainer'; // Importa BodyContainer
import ButtonGroup from '../components/ButtonGroup';
import { useNavigation } from '@react-navigation/native';
import Checkbox from '../components/Checkbox'; // Importa el nuevo componente Checkbox
import { SafeAreaView } from 'react-native-safe-area-context';

const ShipmentForm5 = () => {
    const navigation = useNavigation();

    const [checkboxStates, setCheckboxStates] = useState({
        from: false,
        to: false,
        package: false,
        items: false,
        insurance: false, // Última opción para seguro
    });

    const totalShippingCost = 125; // Costo inicial del envío
    const insuranceCost = 15; // Costo del seguro
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
        .filter((key) => key !== 'insurance') // Excluir seguro de la validación obligatoria
        .every((key) => checkboxStates[key]); // Verifica que todos los demás estén marcados

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <InternalHeader showBackButton={true} />
                <View style={styles.bodyContainer}>
                    <Text style={styles.title}>Revisa y confirma antes del pago</Text>
                    <View style={styles.cardContainer}>
                        {/* Sección "De" */}
                        <View style={styles.card}>
                            <View style={styles.cardContent}>
                                <View style={styles.edit}>
                                    <Text style={styles.sectionTitle}>De</Text>
                                    <Text>Juan Perez</Text>
                                    <Text>Av de las Americas 7777 BIS</Text>
                                    <Text>MADRID, ES</Text>
                                    <Text>+5981234567</Text>
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
                                    <Text>Roberto Perez</Text>
                                    <Text>18 de Julio 12345</Text>
                                    <Text>MONTEVIDEO, UY</Text>
                                    <Text>+5981237676</Text>
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
                                    <Text>Carry On (20 Kg)</Text>
                                    <Text>1 pieza (41.7 x 35.9 x 37.0 cm)</Text>
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
                                    <Text>Items: 4</Text>
                                    <Text>Valor total: USD 75</Text>
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
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodyContainer: {
        flex: 1,
        width: '95%',
        backgroundColor: COLORS.gray,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: "Delivery", // Fuente personalizada principal
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
        padding: 5,
        marginBottom: 15,
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
        width: '100%',
    },
    cardContent: {
        flexDirection: 'row',
        //justifyContent: 'space-between',
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
        //marginTop: 10,
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
