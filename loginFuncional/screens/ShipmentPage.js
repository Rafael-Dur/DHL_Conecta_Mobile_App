import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createShipment,
  updateShipmentField,
  fetchProductCategories,
} from "../features/Shipments/ShipmentSlice";
import { View, Text, TextInput, Button, ActivityIndicator, Picker } from "react-native";

const ShipmentPage = () => {
  const dispatch = useDispatch();
  const { loading, success, error, DHLConfirmation, sender, productCategories } = useSelector(
    (state) => state.shipments
  );

  const [senderName, setSenderName] = useState(sender.name);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [shipmentItems, setShipmentItems] = useState([]);
  const [itemDescription, setItemDescription] = useState("");
  const [itemQuantity, setItemQuantity] = useState(1);
  const [itemValue, setItemValue] = useState(0);
  const [itemProductTypeId, setItemProductTypeId] = useState("");

  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);

  // Actualiza el estado global al cambiar el nombre del remitente
  const handleSenderNameChange = (text) => {
    setSenderName(text);
    dispatch(updateShipmentField({ key: "sender", value: { ...sender, name: text } }));
  };

  // Agrega un nuevo artículo y actualiza el estado global
  const handleAddItem = () => {
    
    console.log("selectedCategory - DESCRIPCION",  selectedCategory?.description );
    console.log("selectedCategory - NAME",  selectedCategory?.name );

    const selectedCategoryObject = productCategories.find(
        (category) => category.id === selectedCategory
      );
    
    const newItem = {
     
      description: selectedCategoryObject?.name +" | "+ selectedCategoryObject?.description,
      shipmentProductTypeId: selectedCategory || "default-id",
      quantity: parseInt(itemQuantity, 10),
      value: parseFloat(itemValue),
    };

    const updatedItems = [...shipmentItems, newItem];
    setShipmentItems(updatedItems);

    console.log("updatedItems", updatedItems);
    dispatch(updateShipmentField({ key: "shipmentItems", value: updatedItems }));

    setItemDescription("");
    setItemQuantity(1);
    setItemValue(1);
    setItemProductTypeId("");
  };


  // Elimina un artículo de la lista
  const handleRemoveItem = (index) => {
    const updatedItems = shipmentItems.filter((_, i) => i !== index);
        
    setShipmentItems(updatedItems);
    dispatch(updateShipmentField({ key: "shipmentItems", value: updatedItems }));
  };

  const handleCreateShipment = () => {
    dispatch(createShipment());
  };


  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Crear Envío</Text>

      <View style={{ marginVertical: 10 }}>
        <Text>Nombre del Remitente:</Text>
        <TextInput
          value={senderName}
          onChangeText={handleSenderNameChange}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginTop: 5,
            borderRadius: 5,
          }}
        />
      </View>

      <View style={{ marginVertical: 10 }}>
        <Text>Categoría de Producto:</Text>
        <Picker
          selectedValue={selectedCategory}          
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: "#ccc",
            marginTop: 5,
          }}
        >
          <Picker.Item label="Selecciona una categoría" value="" />
          {productCategories.map((category) => (
            <Picker.Item
              key={category.id}
              label={`${category.name} - ${category.description}`}
              value={category.id}
            />
          ))}
        </Picker>
      </View>

      <Text style={{ fontSize: 18, marginVertical: 10 }}>Artículos del Envío</Text>

      <View style={{ marginVertical: 10 }}>
        <Text>Descripción del Artículo:</Text>
        <TextInput
          value= {selectedCategory}
          onChangeText={setItemDescription}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginTop: 5,
            borderRadius: 5,
          }}
        />
        <Text>Cantidad:</Text>
        <TextInput
          value={itemQuantity.toString()}
          onChangeText={(text) => setItemQuantity(text)}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginTop: 5,
            borderRadius: 5,
          }}
        />
        <Text>Valor:</Text>
        <TextInput
          value={itemValue.toString()}
          onChangeText={(text) => setItemValue(text)}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            marginTop: 5,
            borderRadius: 5,
          }}
        />
        <Button title="Agregar Artículo" onPress={handleAddItem} />
      </View>

      {shipmentItems.map((item, index) => (
        <View key={index} style={{ marginVertical: 5 }}>
          <Text>
            {index + 1}. {item.description} - Cantidad: {item.quantity} - Valor: {item.value}
          </Text>
          <Button title="Eliminar" onPress={() => handleRemoveItem(index)} />
        </View>
      ))}

      <Button
        title={loading ? "Enviando..." : "Crear Envío"}
        onPress={handleCreateShipment}
        disabled={loading}
      />

      {success && (
        <Text style={{ color: "green", marginTop: 10 }}>
          Envío creado exitosamente. _ {DHLConfirmation}
        </Text>
      )}

      {error && (
        <Text style={{ color: "red", marginTop: 10 }}>
          Error: {error}
        </Text>
      )}

      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
    </View>
  );
};

export default ShipmentPage;
