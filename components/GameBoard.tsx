import React from "react";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";
import {
  Canvas,
  RoundedRect,
  Circle,
  Line,
  vec,
} from "@shopify/react-native-skia";

const GameBoard: React.FC = () => {
  const { width, height } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Canvas style={styles.canvas}>
        {/* Background */}
        <RoundedRect
          x={0}
          y={0}
          width={width}
          height={height}
          r={0}
          color="#1a3c40"
        />

        {/* Game board grid lines - moved up */}
        <Line
          p1={vec(width * 0.2, height * 0.25)}
          p2={vec(width * 0.8, height * 0.25)}
          color="rgba(255, 255, 255, 0.2)"
          strokeWidth={2}
        />

        <Line
          p1={vec(width * 0.2, height * 0.4)}
          p2={vec(width * 0.8, height * 0.4)}
          color="rgba(255, 255, 255, 0.2)"
          strokeWidth={2}
        />

        {/* Play area indicator - moved up */}
        <Circle
          cx={width / 2}
          cy={height * 0.3}
          r={width * 0.25}
          color="rgba(255, 255, 255, 0.05)"
        />

        {/* Decorative elements - moved up */}
        <Circle
          cx={width * 0.2}
          cy={height * 0.15}
          r={20}
          color="rgba(42, 157, 143, 0.3)"
        />

        <Circle
          cx={width * 0.8}
          cy={height * 0.15}
          r={20}
          color="rgba(230, 57, 70, 0.3)"
        />
      </Canvas>

      <Text style={styles.instructionText}>Drag a card up to play it</Text>

      <View style={styles.playAreaIndicator}>
        <Text style={styles.playAreaText}>Play Area</Text>
      </View>
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
    top: "55%",
    alignSelf: "center",
    color: "white",
    fontSize: 18,
    opacity: 0.7,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  playAreaIndicator: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
  },
  playAreaText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 14,
    fontStyle: "italic",
  },
});

export default GameBoard;
