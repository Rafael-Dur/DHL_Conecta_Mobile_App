import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/constants";

const ProgressBar = ({ currentStep }) => {
  return (
    <View style={styles.progressBar}>
      {[1, 2, 3, 4, 5].map((step, index, steps) => (
        <React.Fragment key={index}>
          {/* Paso circular */}
          <View
            style={[
              styles.stepCircle,
              currentStep >= step
                ? styles.currentStep
                : styles.upcomingStep,
            ]}
          >
            <Text
              style={[
                styles.stepText,
                currentStep >= step && styles.currentStepText,
              ]}
            >
              {step}
            </Text>
          </View>

          {/* Línea entre pasos */}
          {index < steps.length - 1 && (
            <View
              style={[
                styles.stepLine,
                currentStep > step && styles.currentLine,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  currentStep: {
    borderColor: COLORS.greenBright2,
    backgroundColor: COLORS.greenBright2,
  },
  upcomingStep: {
    borderColor: "#d3d3d3",
    backgroundColor: "#f5f5f5",
  },
  stepText: {
    color: "#000",
    fontWeight: "600",
  },
  currentStepText: {
    color: "#fff",
  },
  stepLine: {
    flex: 1, // Línea ajusta su tamaño al espacio restante
    height: 2,
    backgroundColor: "#d3d3d3",
  },
  currentLine: {
    backgroundColor: COLORS.greenBright2,
  },
});

export default ProgressBar;
