import { Center, Paper, SimpleGrid, Text, UnstyledButton } from "@mantine/core";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function LetterKeyboard() {
  return (
    <SimpleGrid cols={{ base: 7, sm: 9, md: 13 }} spacing="xs">
      {LETTERS.map((letter) => (
        <UnstyledButton key={letter}>
          <Paper withBorder radius="xs" h={32} w={32}>
            <Center h="100%">
              <Text size="xs" fw={600}>
                {letter}
              </Text>
            </Center>
          </Paper>
        </UnstyledButton>
      ))}
    </SimpleGrid>
  );
}
