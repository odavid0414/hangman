import { Box, Button, Container, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useSearchParams } from "react-router";
import { HangmanPanel } from "../components/HangmanPanel";
import { LetterKeyboard } from "../components/LetterKeyboard";
import { WordSlots } from "../components/WordSlots";

function Play() {
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get("difficulty");

  return (
    <Box component="main" mih="100vh">
      <Container size={980} w="100%" px="md" py={32}>
        <Stack gap={24}>
          <Stack gap={6}>
            <Title order={1} size="h2" fw={600}>
              Hangman Game
            </Title>
            <Text size="sm" c="dimmed">
              {difficulty ? `Difficulty: ${difficulty}` : "Guess the word before the drawing completes."}
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Stack gap={18}>
              <WordSlots length={7} />
              <LetterKeyboard />
              <Text size="sm" c="dimmed">
                Remaining possibility of failure: <strong>6</strong>
              </Text>
              <Group gap="sm">
                <Button variant="outline" color="cyan">
                  END GAME
                </Button>
                <Button color="cyan">START NEW GAME</Button>
              </Group>
            </Stack>

            <HangmanPanel size={240} stage={4} />
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

export default Play;
