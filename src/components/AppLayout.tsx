import { AppShell, Button, Group, Title } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { type ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell header={{ height: 56 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={2} size="h4" c="gray.7" fw={600}>
            Hangman
          </Title>
          <Button variant="light" onClick={() => toggleColorScheme()}>
            {colorScheme === "dark" ? "Light mode" : "Dark mode"}
          </Button>
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
