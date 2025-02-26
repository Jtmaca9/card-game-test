import React, { useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import GameBoard from "./components/GameBoard";
import Hand from "./components/Hand";

// Sample card data
const initialCards = [
  { id: "1", title: "Attack", color: "#e63946" },
  { id: "2", title: "Defend", color: "#457b9d" },
  { id: "3", title: "Heal", color: "#2a9d8f" },
];

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <View style={styles.gameContainer}>
          <GameBoard />
          <View style={styles.handContainer}>
            <Hand initialCards={initialCards} />
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
  handContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});
