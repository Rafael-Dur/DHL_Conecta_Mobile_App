import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import BodyContainer from '../components/BodyContainer';
import HeaderContainer from '../components/HeaderContainer';

const ShipmentForm4 = () => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [articles, setArticles] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const addItem = () => {
    if (!description || !category || !value || quantity <= 0) {
      return Alert.alert('Error', 'Por favor completa todos los campos antes de agregar.');
    }

    const newItem = { description, category, value: parseFloat(value), quantity };
    setArticles([...articles, newItem]);
    setTotalValue(totalValue + newItem.value * newItem.quantity);
    setDescription('');
    setCategory('');
    setValue('');
    setQuantity(1);
  };

  return (
    <View style={styles.container}>

        <BodyContainer>
        <Text style={styles.infoText}>Declara cada artículo: </Text>

        <View style={styles.card}>
          {/* Descripción */}
          <Text style={styles.label}>Descripción </Text>
          <InputField
            placeholder="Label/Placeholder"
            value={description}
            onChangeText={setDescription}
          />
          <Text style={styles.additionalInfo}>Información adicional</Text>

          {/* Categoría */}
          <Text style={styles.label}>Selecciona una categoría </Text>
          <InputField
            placeholder="Label"
            value={category}
            onChangeText={setCategory}
          />
          <Text style={styles.additionalInfo}>Información adicional</Text>

          {/* Valor y Cantidad */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Valor (USD) ❗</Text>
              <InputField
                placeholder="User input"
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
              />
            </View>
            
          </View>

          {/* Agregar botón */}
          <Button title="Agregar +" onPress={addItem} />
        </View>

        {/* Resumen */}
        <View style={styles.summary}>
          <Text>
            Artículos: <Text style={styles.summaryValue}>{articles.length}</Text>
          </Text>
          <Text>
            Valor Total: <Text style={styles.summaryValue}>USD {totalValue}</Text>
          </Text>
          <Text style={styles.linkText}>Ver artículos</Text>
        </View>

        {/* Botones de navegación */}
        <View style={styles.navigationButtons}>
          <Button title="Atrás" onPress={() => Alert.alert('Atrás presionado')} />
          <Button title="Siguiente" onPress={() => Alert.alert('Siguiente presionado')} />
        </View>
      </BodyContainer>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
      },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  stepCompleted: {
    color: 'green',
    marginRight: 5,
  },
  currentStep: {
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  stepPending: {
    color: 'gray',
    marginLeft: 5,
  },
  infoText: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  additionalInfo: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  summary: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  summaryValue: {
    fontWeight: 'bold',
    color: 'black',
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ShipmentForm4;
