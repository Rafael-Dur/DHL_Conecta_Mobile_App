import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de instalar este paquete
import { COLORS } from "../constants/constants";
import { useNavigation } from '@react-navigation/native';

const Header = ({ showBackButton }) => {
    const navigation = useNavigation();
  return (
    <LinearGradient
      colors={["#FFF0B2", "#FFDE59", "#FFCC00", "#FFCC00"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color={COLORS.red} />
        </TouchableOpacity>
      )}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/LogoDHL.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    left: 16,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  logoContainer: {
    position: "absolute",
    right: 45,
    top: "50%",
    transform: [{ translateY: -20 }],
  },
  logo: {
    width: 80,
    height: 40,
  },
});

export default Header;
