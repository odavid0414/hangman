import { Group, Text } from "@mantine/core";

type WordSlotsProps = {
  word: string;
  guessedLetters: string[];
};

export function WordSlots({ word, guessedLetters }: WordSlotsProps) {
  const letters = word.split("");

  return (
    <Group gap={10} justify="flex-start">
      {letters.map((letter, index) => {
        const isRevealed = guessedLetters.includes(letter.toLowerCase());
        return (
        <Text
          key={`${letter}-${index}`}
          size="lg"
          fw={600}
          lts={"0.2em"}
          style={{ borderBottom: "2px solid currentColor" }}
        >
          {isRevealed ? letter.toUpperCase() : "\u00A0"}
        </Text>
        );
      })}
    </Group>
  );
}
