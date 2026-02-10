import { Group, Text } from "@mantine/core";

type WordSlotsProps = {
  length?: number;
};

export function WordSlots({ length = 7 }: WordSlotsProps) {
  const slots = Array.from({ length }, (_, index) => index);

  return (
    <Group gap={10} justify="flex-start">
      {slots.map((slot) => (
        <Text
          key={slot}
          size="lg"
          fw={600}
          lts={"0.2em"}
          style={{ borderBottom: "2px solid currentColor" }}
        >
          &nbsp;
        </Text>
      ))}
    </Group>
  );
}
