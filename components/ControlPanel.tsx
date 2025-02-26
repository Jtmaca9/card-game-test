import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

interface ControlPanelProps {
  onDrawCard: () => void;
  onResetHand?: () => void;
  drawDisabled?: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  onDrawCard,
  onResetHand,
  drawDisabled = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.drawButton,
          drawDisabled && styles.disabledButton,
        ]}
        onPress={onDrawCard}
        activeOpacity={0.7}
        disabled={drawDisabled}
      >
        <Text
          style={[styles.buttonText, drawDisabled && styles.disabledButtonText]}
        >
          {drawDisabled ? "Hand Full" : "Draw Card"}
        </Text>
      </TouchableOpacity>

      {onResetHand && (
        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={onResetHand}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 15,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    minWidth: 120,
    alignItems: "center",
  },
  drawButton: {
    backgroundColor: "#2a9d8f",
  },
  resetButton: {
    backgroundColor: "#e63946",
  },
  disabledButton: {
    backgroundColor: "#555",
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  disabledButtonText: {
    color: "#ccc",
  },
});

export default ControlPanel;
