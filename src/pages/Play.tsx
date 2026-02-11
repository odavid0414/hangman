import { Box, Button, Container, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HangmanPanel } from "../components/HangmanPanel";
import { LetterKeyboard } from "../components/LetterKeyboard";
import { WordSlots } from "../components/WordSlots";
import { useGetWordsQuery } from "../store/words";
import { endGame, guessLetter, startGame } from "../store/gameSlice";
import type { RootState } from "../store/store";

function Play() {
  const [searchParams] = useSearchParams();
  const difficulty = searchParams.get("difficulty")?.toLowerCase() ?? null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: words = [], isLoading } = useGetWordsQuery();
  const activeGame = useSelector((state: RootState) => state.game.activeGame);
  const [isEnding, setIsEnding] = useState(false);

  const wordList = useMemo(() => {
    const allWords = words.map((item) => item.value);
    if (!difficulty) return allWords;

    const ranges: Record<string, [number, number]> = {
      easy: [6, 8],
      medium: [9, 11],
      hard: [12, 14],
    };
    const range = ranges[difficulty];
    if (!range) return allWords;

    return allWords.filter((word) => word.length >= range[0] && word.length <= range[1]);
  }, [difficulty, words]);

  useEffect(() => {
    if (isEnding || isLoading || wordList.length === 0) return;

    const activeWordValid =
      activeGame && wordList.includes(activeGame.word) && activeGame.difficulty === difficulty;

    if (activeWordValid) return;

    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    dispatch(startGame({ word: randomWord, difficulty }));
  }, [activeGame, dispatch, difficulty, isEnding, isLoading, wordList]);

  const handleLetterClick = (letter: string) => {
    if (isWin || isLose) return;
    dispatch(guessLetter(letter));
  };

  const handleStartNewGame = () => {
    if (wordList.length === 0) return;
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    dispatch(startGame({ word: randomWord, difficulty }));
  };

  const handleEndGame = () => {
    setIsEnding(true);
    dispatch(endGame());
    navigate("/", { replace: true });
  };

  const isWin =
    activeGame &&
    activeGame.word
      .split("")
      .every((letter) => activeGame.guessedLetters.includes(letter.toLowerCase()));
  const isLose = activeGame && activeGame.remainingFailures === 0;

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
              {activeGame ? (
                <WordSlots word={activeGame.word} guessedLetters={activeGame.guessedLetters} />
              ) : (
                <Text size="sm" c="dimmed">
                  {isLoading ? "Loading words..." : "No words available."}
                </Text>
              )}
              <LetterKeyboard
                guessedLetters={activeGame?.guessedLetters ?? []}
                onLetterClick={isWin || isLose ? undefined : handleLetterClick}
              />
              <Text size="sm" c="dimmed">
                Remaining possibility of failure:{" "}
                <strong>{activeGame?.remainingFailures ?? 0}</strong>
              </Text>
              {isLose ? (
                <Text size="sm" fw={700} c="red.6">
                  You lost.
                </Text>
              ) : null}
              {isWin ? (
                <Text size="sm" fw={700} c="cyan.4">
                  You won!
                </Text>
              ) : null}
              <Group gap="sm">
                <Button color="cyan" onClick={handleStartNewGame}>
                  START NEW GAME
                </Button>
                <Button variant="outline" color="cyan" onClick={handleEndGame}>
                  END GAME
                </Button>
              </Group>
            </Stack>

            <HangmanPanel size={240} stage={(activeGame?.misses ?? 0) + 4} />
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
}

export default Play;
