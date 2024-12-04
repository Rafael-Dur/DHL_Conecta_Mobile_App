import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createShipment, updateShipmentField } from "../features/Shipments/ShipmentSlice";
import { View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import InternalHeader from "../components/InternalHeader";
import BodyContainer from "../components/BodyContainer";

const ShipmentPage = () => {
  const dispatch = useDispatch();
  const { loading, success, error, DHLConfirmation, sender } = useSelector((state) => state.shipments);

  // Estado local para el input
  const [senderName, setSenderName] = useState(sender.name);

  // Manejo de cambios en el input
  const handleSenderNameChange = (text) => {
    setSenderName(text); // Actualiza el valor del input en el estado local
    dispatch(updateShipmentField({ key: 'sender', value: { ...sender, name: text } })); // Actualiza el estado global
  
  };

  const handleCreateShipment = () => {
    dispatch(createShipment()); // Llama a la acción de Redux para crear el envío
  };

  return (

      <View>
        <InternalHeader showBackButton = {true}/> 
              <BodyContainer>

      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Crear Envío</Text>
      
      {/* Input para actualizar el nombre del remitente */}
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

      {/* Botón para crear el envío */}
      <Button
        title={loading ? "Enviando..." : "Crear Envío"}
        onPress={handleCreateShipment}
        disabled={loading}
      />

      {/* Indicador de éxito */}
      {success && (
        <Text style={{ color: "green", marginTop: 10 }}>
          Envío creado exitosamente. _ {DHLConfirmation}
        </Text>
      )}

      {/* Mensaje de error */}
      {error && (
        <Text style={{ color: "red", marginTop: 10 }}>
          Error: {error}
        </Text>
      )}

      {/* Mostrar un cargando mientras se procesa */}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}
     </BodyContainer>
    </View>
  );
};

export default ShipmentPage;
