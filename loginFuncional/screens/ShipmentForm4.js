import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Button from '../components/Button';
import InputField from '../components/InputField';
import BodyContainer from '../components/BodyContainer';
import InternalHeader from '../components/InternalHeader';
import { COLORS, FONT_SIZES } from '../constants/constants';
import QuantitySelector from '../components/QuantitySelector';
import ArticlesModal from '../components/ArticlesModal';
import ClickeableText from '../components/ClickeableText';
import ButtonGroup from '../components/ButtonGroup';
import ProgressBar from '../components/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { updateShipmentField, fetchProductCategories } from "../features/Shipments/ShipmentSlice";

const ShipmentForm4 = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { productCategories } = useSelector((state) => state.shipments);
  const { shipmentBox, shipmentPackageType } = useSelector((state) => state.shipments);

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);

  const handleNext = () => {
    dispatch(updateShipmentField({ key: "shipmentItems", value: items }));
    navigation.navigate('ShipmentForm5');
  };

  const handleAddItem = () => {
    if (!description.trim() || !selectedCategory || !value.trim() || quantity <= 0) {
      return Alert.alert('Error', 'Por favor, complete todos los campos antes de agregar.');
    }
    // Buscar el nombre de la categoría seleccionada
    const category = productCategories.find((cat) => cat.id === selectedCategory);
    const categoryName = category ? category.name : 'Categoría desconocida';


    const newItem = {
      description,
      shipmentProductTypeId: selectedCategory,
      value: parseFloat(value),
      quantity,
      name: categoryName, // Capturar el nombre de la categoría
    };




    setItems([...items, newItem]);
    setTotalQuantity(totalQuantity + quantity);
    setTotalValue(totalValue + newItem.value * quantity);
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <InternalHeader showBackButton={true} />
          <BodyContainer isGrayBackground>
            <Text style={styles.title}>Completa los datos</Text>

            {shipmentPackageType === 1 ? (
              <ProgressBar currentStep={4} totalSteps={6} />
            ) : (
              <ProgressBar currentStep={4} totalSteps={5} />
            )}

            <Text style={styles.infoText}>Declara cada artículo:</Text>
            <View style={styles.card}>
              <Text style={styles.label}>Descripción </Text>
              <InputField
                placeholder="Descripción"
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
                  {productCategories.map((category) => (
                    <Picker.Item
                      label={`${category.name} - ${category.description}`}
                      value={category.id}
                      key={category.id}
                    />
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
                <Button title="+" styleType="small" onPress={handleAddItem} />
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
            <ButtonGroup
              leftButtonTitle="Atrás"
              onLeftPress={() => navigation.navigate('ShipmentForm3')}
              leftStyleType="outlined"
              rightButtonTitle="Siguiente"
              onRightPress={handleNext}
            />
            <ArticlesModal
              isVisible={isModalVisible}
              items={items}
              totalQuantity={totalQuantity}
              totalValue={totalValue}
              onClose={toggleModal}
              onRemoveItem={removeItem}
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
    backgroundColor: COLORS.gray,
  },
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  bodyContainer: {
    flex: 1,
    width: '90%',
    backgroundColor: COLORS.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: "Delivery", // Fuente personalizada principal
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 20,
    color: COLORS.black,
    fontSize: FONT_SIZES.xlarge,
    width: '100%',
    maxWidth: 350,
  },
  pickerContainer: {
    fontFamily: "Delivery2", // Fuente personalizada secundaria
    width: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 5,
    marginBottom: 10,
    maxWidth: 350,
  },
  infoText: {
    fontFamily: "Delivery2", // Fuente secundaria
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
    color: COLORS.black,
    fontSize: FONT_SIZES.medium,
    width: '100%',
    maxWidth: 350,
  },
  card: {
    fontFamily: "Delivery", // Fuente personalizada para el contenido de tarjetas
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontFamily: "Delivery", // Fuente personalizada para etiquetas
    marginBottom: 5,
    color: COLORS.black,
  },
  additionalInfo: {
    fontFamily: "Delivery2", // Fuente personalizada secundaria
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
  },
  addButtonText: {
    fontFamily: "Delivery", // Fuente personalizada principal
    fontSize: FONT_SIZES.medium,
    marginLeft: 10,
    color: COLORS.black,
    marginTop: 15,
  },
  footer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  footerText: {
    fontFamily: "Delivery", // Fuente personalizada principal
    fontSize: FONT_SIZES.medium,
  },
  viewArticles: {
    fontFamily: "Delivery2", // Fuente secundaria para enlaces
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
