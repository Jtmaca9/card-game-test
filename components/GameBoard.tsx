import React from "react";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";
import { Canvas, RoundedRect } from "@shopify/react-native-skia";

const GameBoard: React.FC = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          r={0}
          color="#1a3c40"
        />
      </Canvas>
      <Text style={styles.instructionText}>Drag a card up to play it</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  canvas: {
    flex: 1,
  },
  instructionText: {
    position: "absolute",
    top: "50%",
    alignSelf: "center",
    color: "white",
    fontSize: 18,
    opacity: 0.7,
  },
});

export default GameBoard;
