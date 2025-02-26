import React from "react";
import { StyleSheet, Text as RNText } from "react-native";
import { Canvas, RoundedRect } from "@shopify/react-native-skia";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
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
    })
    .onEnd((event) => {
      isBeingDragged.value = false;
      scale.value = withSpring(1);

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

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View style={[styles.cardContainer, animatedStyle]}>
        <Canvas style={styles.canvas}>
          <RoundedRect
            x={0}
            y={0}
            width={100}
            height={150}
            r={10}
            color={color}
          />
        </Canvas>
        <RNText style={styles.cardTitle}>{title}</RNText>
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
  },
  canvas: {
    flex: 1,
  },
  cardTitle: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Card;
