import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import BodyContainer from '../components/BodyContainer';
import HeaderContainer from '../components/HeaderContainer';
import { COLORS, FONT_SIZES } from '../constants/constants';
import QuantitySelector from '../components/QuantitySelector';

const ShipmentForm4 = () => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState(1);

  const categories = [
    { label: 'Electrónica', value: 'electronica' },
    { label: 'Ropa', value: 'ropa' },
    { label: 'Libros', value: 'libros' },
    { label: 'Alimentos', value: 'alimentos' },
  ];

  const handleAddItem = () => {
    if (!description.trim() || !selectedCategory || !value.trim() || quantity <= 0) {
      return Alert.alert('Error', 'Por favor, complete todos los campos antes de agregar.');
    }
    Alert.alert(
      'Artículo agregado',
      `Descripción: ${description}, Categoría: ${selectedCategory}, Valor: ${value}, Cantidad: ${quantity}`
    );
    setDescription('');
    setSelectedCategory('');
    setValue('');
    setQuantity(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>Completa los datos </Text>
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
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              <Picker.Item label="Seleccione una categoría" value="" />
              {categories.map((category) => (
                <Picker.Item label={category.label} value={category.value} key={category.value} />
              ))}
            </Picker>
          </View>
          <Text style={styles.additionalInfo}>Información adicional</Text>

          {/* Valor y Cantidad */}
          <View style={styles.row}>
            <View style={styles.columnLeft}>
              <Text style={styles.label}>Valor (USD)</Text>
              <InputField
                placeholder="Ingrese el valor"
                value={value}
                onChangeText={setValue}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.label}>Cantidad</Text>
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </View>
          </View>

          {/* Agregar botón */}
          <View style={styles.addButtonContainer}>
            <Text style={styles.addButtonText}>Agregar</Text>
            <View style={styles.addButtonWrapper}>
              <Button title="+" onPress={handleAddItem} />
            </View>
          </View>

        </View>

        {/* Resumen */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Artículos: 4 | Valor total: USD 75</Text>
          <Text style={styles.viewArticles}>Ver artículos</Text>
        </View>

        {/* Botones de navegación */}
        <View style={styles.navigationButtons}>
          <Button title="Atrás" onPress={() => Alert.alert('Atrás presionado')} />
          <Button title="Siguiente" onPress={() => Alert.alert('Siguiente presionado')} />
        </View>
      </View>
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
  bodyContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: COLORS.white,
    //paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    alignSelf: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: FONT_SIZES.large,
    width: '100%',
    maxWidth: 350,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    maxWidth: 350,
  },
  infoText: {
    alignSelf: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: FONT_SIZES.medium,
    width: '100%',
    maxWidth: 350,
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
    marginBottom: 20,
    width: '100%',
  },
  columnLeft: {
    flex: 1,
    marginRight: 10,
  },
  columnRight: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'flex-end',
  },
  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alinea todo el contenido a la derecha
    alignItems: 'center',
    //marginVertical: 10,
    marginRight: 10,
  },
  addButtonText: {
    fontSize: FONT_SIZES.medium,
    fontWeight: 'bold',
    //marginRight: 10,
    color: COLORS.black,
  },
  addButtonWrappers: {
    maxWidth: 40, // Tamaño del botón
    maxHeight: 40,
  },

  footer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  footerText: {
    fontWeight: 'bold',
    fontSize: FONT_SIZES.medium,
  },
  viewArticles: {
    color: COLORS.blue,
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
