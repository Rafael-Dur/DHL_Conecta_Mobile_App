import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { COLORS } from '../constants/constants';

const ArticlesModal = ({ isVisible, items, totalQuantity, totalValue, onClose, onRemoveItem }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Artículos Declarados</Text>
                    {items.map((item, index) => (
                        <View key={index} style={styles.itemCard}>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemName}>{item.description}</Text>
                                <Text style={styles.itemCategory}>{item.name}</Text>
                        
                            </View>
                            <View style={styles.itemDetails}>
                                <Text style={styles.itemPrice}>USD {item.value * item.quantity}</Text>
                                <Text style={styles.itemQuantity}>{item.quantity} x USD {item.value}</Text>
                            </View>
                            <Button title="X" styleType="small" onPress={() => onRemoveItem(index)} />
                        </View>
                    ))}
                    <View style={styles.modalFooter}>
                        <Text style={styles.footerText}>Artículos: {totalQuantity}</Text>
                        <Text style={styles.footerText}>Total: USD {totalValue.toFixed(2)}</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button title="Cerrar" onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        height: '95%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 15,

    },
    itemInfo: {
        maxWidth: 150,
        marginRight: 20,
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    itemCategory: {
        color: 'gray',
    },
    itemDetails: {
        alignItems: 'flex-end',
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemQuantity: {
        fontSize: 14,
        color: 'gray',
    },
    removeButton: {
        marginLeft: 10,
        backgroundColor: 'red',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        alignItems: 'flex-end',
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    footerText: {
        fontWeight: 'bold',
    },
    buttonWrapper: {
        alignItems: 'center',
        width: '100%',
    }
});

export default ArticlesModal;
