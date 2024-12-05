import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import BodyContainer from '../components/BodyContainer';
import HeaderContainer from '../components/HeaderContainer';
import { COLORS, FONT_SIZES } from '../constants/constants';
import QuantitySelector from '../components/QuantitySelector';
import ArticlesModal from '../components/ArticlesModal';
import ClickeableText from '../components/ClickeableText';
import ButtonGroup from '../components/ButtonGroup';
import InternalHeader from '../components/InternalHeader';
import { useNavigation } from '@react-navigation/native';


const ShipmentForm4 = () => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();

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

    const newItem = {
      description,
      category: selectedCategory,
      value: parseFloat(value),
      quantity,
    };

    setItems([...items, newItem]);
    setTotalQuantity(totalQuantity + quantity);
    setTotalValue(totalValue + newItem.value * quantity);

    // Reset fields
    setDescription('');
    setSelectedCategory('');
    setValue('');
    setQuantity(1);

    Alert.alert('Artículo agregado', 'El artículo fue añadido al envío.');
  };

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    const updatedTotalQuantity = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    const updatedTotalValue = updatedItems.reduce((sum, item) => sum + item.value * item.quantity, 0);

    setItems(updatedItems);
    setTotalQuantity(updatedTotalQuantity);
    setTotalValue(updatedTotalValue);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InternalHeader></InternalHeader>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>Completa los datos</Text>
        <Text style={styles.infoText}>Declara cada artículo: </Text>

        <View style={styles.card}>

          <Text style={styles.label}>Descripción </Text>
          <InputField
            placeholder="Label/Placeholder"
            value={description}
            onChangeText={setDescription}
          />
          <Text style={styles.additionalInfo}>Información adicional</Text>


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


          <View style={styles.addButtonContainer}>
            <Text style={styles.addButtonText}>Agregar</Text>
            <View>
              <Button title="+" styleType="small" onPress={handleAddItem} />
            </View>
          </View>

        </View>


        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Artículos: {totalQuantity} | Valor total: USD {totalValue.toFixed(2)}
          </Text>

          <ClickeableText
            onPress={toggleModal}
            clickeableText="Ver artículos"
            styleType="link"
            singleLink
          />
        </View>


        {/* Botones de navegación */}

        <ButtonGroup
          leftButtonTitle="Atrás"
          onLeftPress={() => navigation.navigate('ShipmentForm3')}
          leftStyleType="outlined"
          rightButtonTitle="Siguiente"
          onRightPress={() => Alert.alert('Siguiente presionado')}
        />


        <ArticlesModal
          isVisible={isModalVisible}
          items={items}
          totalQuantity={totalQuantity}
          totalValue={totalValue}
          onClose={toggleModal}
          onRemoveItem={removeItem}
        />

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    //paddingHorizontal: 20,
    //paddingTop: 80, //cambiar esto cuando esté el banner
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
    marginTop: 20,
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: FONT_SIZES.large,
    width: '100%',
    maxWidth: 350,
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
    marginBottom: 10,
    maxWidth: 350,
  },
  infoText: {
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: FONT_SIZES.medium,
    width: '100%',
    maxWidth: 350,
  },
  card: {
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.black,
  },
  additionalInfo: {
    color: COLORS.grey,
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
    marginLeft: 10,
    color: COLORS.black,
    marginTop: 15,
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
    justifyContent: 'center',
    width: '80%',
    maxWidth: 150,
  },
});

export default ShipmentForm4;
