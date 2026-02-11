import { Center, Paper, SimpleGrid, Text, UnstyledButton } from "@mantine/core";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type LetterKeyboardProps = {
  guessedLetters: string[];
  onLetterClick?: (letter: string) => void;
};

export function LetterKeyboard({ guessedLetters, onLetterClick }: LetterKeyboardProps) {
  return (
    <SimpleGrid cols={{ base: 7, sm: 9, md: 13 }} spacing="xs">
      {LETTERS.map((letter) => {
        const isUsed = guessedLetters.includes(letter.toLowerCase());
        return (
        <UnstyledButton key={letter} onClick={() => onLetterClick?.(letter)} disabled={isUsed}>
          <Paper withBorder radius="xs" h={32} w={32} opacity={isUsed ? 0.4 : 1}>
            <Center h="100%">
              <Text size="xs" fw={600}>
                {letter}
              </Text>
            </Center>
          </Paper>
        </UnstyledButton>
        );
      })}
    </SimpleGrid>
  );
}
