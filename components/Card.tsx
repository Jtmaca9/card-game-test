import React from "react";
import { StyleSheet, Text as RNText, View } from "react-native";
import { Canvas, RoundedRect, Circle } from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";

interface CardProps {
  id: string;
  title: string;
  color: string;
  onCardPlayed: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ id, title, color, onCardPlayed }) => {
  // Animation values
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const isBeingDragged = useSharedValue(false);
  const dragProgress = useSharedValue(0);

  // Handle card being played
  const handleCardPlayed = () => {
    onCardPlayed(id);
  };

  // Gesture handling
  const dragGesture = Gesture.Pan()
    .onBegin(() => {
      isBeingDragged.value = true;
      scale.value = withSpring(1.05);
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;

      // Calculate drag progress for visual feedback (0 to 1)
      // Negative because we're dragging up
      dragProgress.value = Math.min(Math.max(-event.translationY / 100, 0), 1);
    })
    .onEnd((event) => {
      isBeingDragged.value = false;
      scale.value = withSpring(1);
      dragProgress.value = withSpring(0);

      // If card is dragged up significantly, consider it played
      if (translateY.value < -100) {
        // Play the card
        runOnJS(handleCardPlayed)();
      } else {
        // Return to original position
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  // Animated glow effect based on drag progress
  const glowStyle = useAnimatedStyle(() => {
    return {
      opacity: dragProgress.value * 0.8,
      transform: [{ scale: 1 + dragProgress.value * 0.2 }],
    };
  });

  // Animated border color
  const borderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      dragProgress.value,
      [0, 1],
      ["transparent", "#ffffff"]
    );

    return {
      borderColor,
      borderWidth: dragProgress.value * 2,
    };
  });

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View style={[styles.cardContainer, animatedStyle, borderStyle]}>
        {/* Glow effect when dragging */}
        <Animated.View style={[styles.glowEffect, glowStyle]} />

        <Canvas style={styles.canvas}>
          {/* Card background */}
          <RoundedRect
            x={0}
            y={0}
            width={100}
            height={150}
            r={10}
            color={color}
          />

          {/* Card decoration */}
          <Circle cx={50} cy={50} r={30} color="rgba(255, 255, 255, 0.2)" />
        </Canvas>

        {/* Card title */}
        <RNText style={styles.cardTitle}>{title}</RNText>

        {/* Card cost indicator */}
        <View style={styles.costIndicator}>
          <RNText style={styles.costText}>
            {Math.floor(Math.random() * 3) + 1}
          </RNText>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 100,
    height: 150,
    margin: 5,
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  canvas: {
    flex: 1,
  },
  cardTitle: {
    position: "absolute",
    top: 90,
    left: 0,
    right: 0,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  costIndicator: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  costText: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 14,
  },
  glowEffect: {
    position: "absolute",
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    zIndex: -1,
  },
});

export default Card;
