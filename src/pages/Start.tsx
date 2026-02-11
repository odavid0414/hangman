import { useMemo, useState } from "react";
import { Box, Button, Center, Container, Stack, Text, Title } from "@mantine/core";
import { Link, Navigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { DifficultyButton } from "../components/DifficultyButton";

type Difficulty = {
  id: "easy" | "medium" | "hard";
  label: string;
  hint: string;
  href: string;
};

const difficultyOptions: Difficulty[] = [
  { id: "easy", label: "Easy", hint: "6-8", href: "/play?difficulty=easy" },
  { id: "medium", label: "Medium", hint: "9-11", href: "/play?difficulty=medium" },
  { id: "hard", label: "Hard", hint: "12-14", href: "/play?difficulty=hard" },
];

function Start() {
  const [selectedId, setSelectedId] = useState<Difficulty["id"]>("easy");
  const activeGame = useSelector((state: RootState) => state.game.activeGame);

  const selected = useMemo(
    () => difficultyOptions.find((option) => option.id === selectedId) ?? difficultyOptions[0],
    [selectedId]
  );

  if (activeGame) {
    return <Navigate to={`/play?difficulty=${activeGame.difficulty ?? "easy"}`} replace />;
  }

  return (
    <Box component="main" mih="100vh" display="flex" style={{ alignItems: "center" }}>
      <Container size={420} w="100%" px="md">
        <Stack gap={28} align="center">
          <Stack gap={6} align="center">
            <Title order={1} size="h2" c="gray.7" fw={600}>
              Hangman Game
            </Title>
            <Text size="sm" c="gray.6">
              Choose a difficulty level
            </Text>
          </Stack>

          <Stack gap={10} w="100%">
            {difficultyOptions.map((option) => (
              <DifficultyButton
                key={option.id}
                label={`${option.label} (${option.hint})`}
                active={option.id === selectedId}
                onSelect={() => setSelectedId(option.id)}
              />
            ))}
          </Stack>

          <Center>
            <Button
              component={Link}
              to={selected.href}
              size="md"
              px={36}
              radius="md"
              color="cyan"
            >
              LET&apos;S PLAY
            </Button>
          </Center>
        </Stack>
      </Container>
    </Box>
  );
}

export default Start;
