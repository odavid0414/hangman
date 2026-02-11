import { Button } from "@mantine/core";

type DifficultyButtonProps = {
  label: string;
  active?: boolean;
  onSelect?: () => void;
};

export function DifficultyButton({ label, active, onSelect }: DifficultyButtonProps) {
  return (
    <Button
      fullWidth
      radius="sm"
      size="md"
      variant={active ? "filled" : "outline"}
      color={active ? "cyan" : "gray"}
      onClick={onSelect}
      fw={600}
    >
      {label}
    </Button>
  );
}
