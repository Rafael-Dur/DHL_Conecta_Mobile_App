import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShipment, updateShipmentField, fetchProductCategories } from "../features/Shipments/ShipmentSlice";
import { View, Text, TextInput, Button, ActivityIndicator, Picker } from "react-native";

const ShipmentPage = () => {
  const dispatch = useDispatch();
  const { loading, success, error, DHLConfirmation, sender, productCategories } = useSelector((state) => state.shipments);

  const [senderName, setSenderName] = useState(sender.name);
  const [selectedCategory, setSelectedCategory] = useState(""); // For the selected category

  // Fetch product categories on component mount
  useEffect(() => {
    dispatch(fetchProductCategories());
  }, [dispatch]);

  const handleSenderNameChange = (text) => {
    setSenderName(text);
    dispatch(updateShipmentField({ key: 'sender', value: { ...sender, name: text } }));
  };

  const handleCreateShipment = () => {
    const shipmentData = {
      shipmentPackageType: 1,
      shippingMethod: 1,
      sender: {
        name: senderName,
        address: "Caldas 1234",
        country: "Uruguay",
        postalCode: "11900",
        neighborhood: "Belvedere",
        city: "Montevideo",
        phoneNumber: "+59899073333",
      },
      receiver: {
        name: "Marcelo Yuane",
        address: "Agraciada 1234",
        country: "Chile",
        postalCode: "11900",
        neighborhood: "La Teja",
        city: "Montevideo",
        phoneNumber: "+598999999",
      },
      shipmentBox: {
        boxType: 1,
        length: 10,
        width: 10,
        height: 10,
        shipmentPackageUnit: 1,
        weight: 10,
        weightUnit: 1,
      },
      shipmentItems: [
        {
          description: "Te sabor beso negro",
          shipmentProductTypeId: "c6066e87-b893-4b30-a285-98c7985f69fb",
          quantity: 1,
          value: 10,
        },
      ],
      bank: 1,
      category: selectedCategory,
    };

    dispatch(createShipment(shipmentData));
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

      {/* Dropdown for product categories */}
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
