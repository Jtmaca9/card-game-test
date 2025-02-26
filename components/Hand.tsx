import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Card from "./Card";

interface CardData {
  id: string;
  title: string;
  color: string;
}

interface HandProps {
  initialCards: CardData[];
}

const Hand: React.FC<HandProps> = ({ initialCards }) => {
  const [cards, setCards] = useState<CardData[]>(initialCards);

  const handleCardPlayed = (id: string) => {
    // Remove the played card from the hand
    setCards((currentCards) => currentCards.filter((card) => card.id !== id));
  };

  return (
    <View style={styles.container}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          title={card.title}
          color={card.color}
          onCardPlayed={handleCardPlayed}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default Hand;
