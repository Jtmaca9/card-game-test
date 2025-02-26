import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GameBoard from "./components/GameBoard";
import Hand from "./components/Hand";
import ControlPanel from "./components/ControlPanel";
import { CardData, generateRandomCard } from "./utils/cardGenerator";

// Sample card data
const initialCards = [
  { id: "1", title: "Attack", color: "#e63946" },
  { id: "2", title: "Defend", color: "#457b9d" },
  { id: "3", title: "Heal", color: "#2a9d8f" },
];

// Maximum number of cards allowed in hand
const MAX_HAND_SIZE = 3;

export default function App() {
  const [cards, setCards] = useState<CardData[]>(initialCards);

  // Function to draw a new random card
  const handleDrawCard = () => {
    // Only add a card if we have less than the maximum hand size
    if (cards.length < MAX_HAND_SIZE) {
      const newCard = generateRandomCard();
      setCards((currentCards) => [...currentCards, newCard]);
    }
  };

  // Function to reset the hand to initial cards
  const handleResetHand = () => {
    setCards([...initialCards]);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <View style={styles.gameContainer}>
          <GameBoard />
          <View style={styles.controlsContainer}>
            <ControlPanel
              onDrawCard={handleDrawCard}
              onResetHand={handleResetHand}
              drawDisabled={cards.length >= MAX_HAND_SIZE}
            />
          </View>
          <View style={styles.handContainer}>
            <Hand initialCards={cards} />
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  gameContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  controlsContainer: {
    position: "absolute",
    bottom: 210, // Increased to ensure no overlap with play area
    left: 0,
    right: 0,
  },
  handContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 190, // Fixed height for the hand container
    paddingVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
