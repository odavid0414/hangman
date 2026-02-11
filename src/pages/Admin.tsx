import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link } from "react-router";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import { useAddWordMutation, useGetWordsQuery } from "../store/words";
import { WordList } from "../components/WordList";
import { auth } from "../services/firebase";

function Admin() {
  const [word, setWord] = useState("");
  const { data = [], isLoading } = useGetWordsQuery();
  const [addWord, addState] = useAddWordMutation();
  const navigate = useNavigate();

  const words = useMemo(
    () => [...data].sort((a, b) => a.value.localeCompare(b.value)),
    [data]
  );

  const errorMessage =
    addState.isError &&
    addState.error &&
    typeof addState.error === "object" &&
    "data" in addState.error
      ? String((addState.error as { data?: string }).data ?? "Failed to add word.")
      : undefined;

  const handleSave = async () => {
    if (!word.trim()) return;
    const res = await addWord(word.trim());
    if ("data" in res) setWord("");
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  return (
    <Box component="main" mih="100vh" py={32}>
      <Container size={980} w="100%" px="md">
        <Stack gap={24}>
          <Group justify="space-between">
            <Title order={1} size="h2" fw={600}>
              Admin
            </Title>
            <Button variant="light" color="gray" onClick={handleLogout}>
              Logout
            </Button>
          </Group>

          <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
            <Stack gap={16}>
            <Text size="sm" c="dimmed">
              Type the word you want to add to the list
            </Text>
              <TextInput
                placeholder="New word"
                value={word}
                onChange={(event) => setWord(event.currentTarget.value)}
              />
              <Button color="cyan" onClick={handleSave} loading={addState.isLoading}>
                SAVE
              </Button>
              <Button component={Link} to="/play" variant="outline" color="cyan">
                BACK TO THE GAME
              </Button>
              {errorMessage ? (
                <Text size="sm" c="red.6">
                  {errorMessage}
                </Text>
              ) : null}
            </Stack>

            {isLoading ? (
              <Text size="sm" c="dimmed">
                Loading words...
              </Text>
            ) : (
              <WordList words={words} />
            )}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

export default Admin;
