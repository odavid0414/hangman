import { Box, Center, Container, Stack, Text, Title } from "@mantine/core";
import { useSearchParams } from "react-router";
import { HangmanSvg } from "../components/HangmanSvg";

function Play() {
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get("difficulty");

  return (
    <Box component="main" mih="100vh">
      <Container size={680} w="100%" px="md" py={40}>
        <Stack gap={24} align="center">
          <Title order={1} size="h2" c="gray.7" fw={600}>
            Hangman
          </Title>
          <Text size="sm" c="gray.6">
            {difficulty
              ? `Difficulty: ${difficulty}`
              : "Guess the word before the drawing completes."}
          </Text>
          <Center>
            <HangmanSvg size={240} />
          </Center>
        </Stack>
      </Container>
    </Box>
  );
}

export default Play;
