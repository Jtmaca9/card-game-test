import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Card from "./Card";

interface CardData {
  id: string;
  title: string;
  color: string;
}

interface HandProps {
  initialCards: CardData[];
}

const MAX_HAND_SIZE = 3;

const Hand: React.FC<HandProps> = ({ initialCards }) => {
  const [cards, setCards] = useState<CardData[]>(initialCards);

  // Update cards when initialCards changes
  useEffect(() => {
    // Ensure we don't exceed the maximum hand size
    const limitedCards = initialCards.slice(0, MAX_HAND_SIZE);
    setCards(limitedCards);
  }, [initialCards]);

  const handleCardPlayed = (id: string) => {
    // Remove the played card from the hand
    setCards((currentCards) => currentCards.filter((card) => card.id !== id));
  };

  return (
    <View style={styles.container}>
      {cards.length > 0 ? (
        cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            color={card.color}
            onCardPlayed={handleCardPlayed}
          />
        ))
      ) : (
        // Empty placeholder to maintain height when no cards
        <View style={styles.emptyHandPlaceholder}>
          <Text style={styles.emptyText}>No Cards</Text>
        </View>
      )}

      {/* Card count indicator */}
      <View style={styles.cardCountContainer}>
        <Text style={styles.cardCountText}>
          {cards.length}/{MAX_HAND_SIZE}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
    minHeight: 170, // Ensures minimum height even when empty
    position: "relative",
  },
  emptyHandPlaceholder: {
    height: 150,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 16,
    fontStyle: "italic",
  },
  cardCountContainer: {
    position: "absolute",
    top: 0,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  cardCountText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Hand;
