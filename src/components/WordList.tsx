import { SimpleGrid, Text } from "@mantine/core";
import type { WordItem } from "../store/words";

type WordListProps = {
  words: WordItem[];
};

export function WordList({ words }: WordListProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="xl" verticalSpacing="xs" w="100%">
      {words.map((word) => (
        <Text key={word.id} size="sm" c="dimmed">
          {word.value}
        </Text>
      ))}
    </SimpleGrid>
  );
}
