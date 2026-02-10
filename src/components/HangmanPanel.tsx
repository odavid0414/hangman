import { Box, Center } from "@mantine/core";
import { HangmanSvg } from "./HangmanSvg";
import type { HangmanSvgProps } from "../interfaces/hangmanSvg";

export function HangmanPanel({ size = 220, stage }: HangmanSvgProps) {
  return (
    <Box
      w="100%"
      style={{
        border: "1px solid var(--mantine-color-default-border)",
        borderRadius: "12px",
        minHeight: 220,
      }}
    >
      <Center p="md">
        <HangmanSvg size={size} stage={stage} />
      </Center>
    </Box>
  );
}
