// Card types and their associated colors
const cardTypes = [
  { type: "Attack", color: "#e63946" },
  { type: "Defend", color: "#457b9d" },
  { type: "Heal", color: "#2a9d8f" },
  { type: "Draw", color: "#f4a261" },
  { type: "Boost", color: "#9d4edd" },
  { type: "Stun", color: "#f15bb5" },
  { type: "Shield", color: "#3a86ff" },
];

// Generate a unique ID
let idCounter = 100; // Start from a high number to avoid conflicts with initial cards

export interface CardData {
  id: string;
  title: string;
  color: string;
}

/**
 * Generate a random card
 * @returns A random card object
 */
export const generateRandomCard = (): CardData => {
  const randomIndex = Math.floor(Math.random() * cardTypes.length);
  const cardType = cardTypes[randomIndex];

  return {
    id: (++idCounter).toString(),
    title: cardType.type,
    color: cardType.color,
  };
};

/**
 * Generate multiple random cards
 * @param count Number of cards to generate
 * @returns Array of random card objects
 */
export const generateRandomCards = (count: number): CardData[] => {
  const cards: CardData[] = [];
  for (let i = 0; i < count; i++) {
    cards.push(generateRandomCard());
  }
  return cards;
};
